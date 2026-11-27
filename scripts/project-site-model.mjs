import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const own = (obj, key) => typeof key === "string" && Object.hasOwn(obj, key);
const id = (value) => typeof value === "string" && /^[A-Za-z][A-Za-z0-9_]{0,47}$(?![\s\S])/.test(value);
const text = (value, limit = 120) =>
  typeof value === "string" && value.trim() !== "" && Buffer.byteLength(value) <= limit &&
  !/[\p{Cc}\u2028\u2029\ufffe\uffff]|[\uD800-\uDFFF]/u.test(value);
const check = (pass, message) => { if (!pass) throw new Error(message); };

function index(items, name, min, max) {
  check(Array.isArray(items) && items.length >= min && items.length <= max, `${name}: expected ${min}–${max} entries`);
  const out = new Map();
  for (const item of items) {
    check(id(item?.id) && !out.has(item.id), `${name}: missing or duplicate ID`);
    out.set(item.id, item);
  }
  return out;
}

// The projection is intentionally view-only. Message order and replies are
// authored; the generator resolves IDs and never infers application behaviour.
export function project(model) {
  check(model?.version === "foundry-site-model/v1", "Unsupported site model version");
  const { site, pages, navigation, articles, components, links, journeys } = model;
  check(id(site?.id) && text(site?.name, 70), "Invalid site identity");
  check(pages && typeof pages === "object" && !Array.isArray(pages) && own(pages, "Home") && pages.Home.path === "/", "Missing home page");
  const paths = new Set();
  for (const [key, page] of Object.entries(pages)) {
    check(id(key) && page && typeof page.path === "string" && /^(\/|\/[a-z0-9-]+(?:\/[a-z0-9-]+)*)$(?![\s\S])/.test(page.path) &&
      !paths.has(page.path.toLowerCase()), `Invalid or duplicate route: ${key}`);
    paths.add(page.path.toLowerCase());
    check(text(page.heading) && text(page.title) && text(page.description, 240), `Missing page metadata: ${key}`);
    if (page.parent !== undefined) {
      check(own(pages, page.parent) && page.path.startsWith(`${pages[page.parent].path}/`), `Invalid parent: ${key}`);
    }
  }
  check(Array.isArray(navigation) && navigation.length > 0 && new Set(navigation).size === navigation.length &&
    navigation.every((key) => own(pages, key) && !pages[key].parent && text(pages[key].navLabel, 24)), "Invalid navigation");
  const blogPages = new Set();
  for (const article of index(articles, "articles", 0, 30).values()) {
    if (article.status === "published") {
      check(article.id === article.page && own(pages, article.page) && !blogPages.has(article.page) &&
        pages[article.page].parent === "Blog" && typeof article.date === "string" && /^\d{4}-(0[1-9]|1[0-2])$(?![\s\S])/.test(article.date) &&
        Number.isInteger(article.readMinutes) && article.readMinutes > 0 && article.readMinutes <= 240,
      `Invalid published article: ${article.id}`);
      blogPages.add(article.page);
    } else {
      check(article.status === "draft" && text(article.title) && !own(pages, article.id) &&
        !("page" in article) && !("date" in article) && !("readMinutes" in article), `Draft must not be routable: ${article.id}`);
    }
  }
  for (const [key, page] of Object.entries(pages)) {
    if (page.parent === "Blog") check(blogPages.has(key), `Blog route has no published article: ${key}`);
  }
  const nodes = index(components, "components", 2, 12);
  const edges = index(links, "links", 1, 24);
  for (const node of nodes.values()) {
    check(["actor", "service", "store", "external"].includes(node.kind) && text(node.label, 96), `Invalid component: ${node.id}`);
  }
  for (const link of edges.values()) {
    check(!nodes.has(link.id) && nodes.has(link.from) && nodes.has(link.to) && link.from !== link.to && text(link.label, 96), `Invalid link: ${link.id}`);
  }
  const head = (profileVersion, id, title) => ({ formatVersion: "diagram-json/v1", profileVersion, id, title });
  const output = {
    "architecture.json": {
      ...head("architecture-diagram/v1", site.id, `${site.name}: public site architecture`),
      nodes: components.map(({ id, kind, label }) => ({ id, kind, label })),
      links: [...edges.keys()].sort().map((key) => {
        const { id, from, to, label } = edges.get(key);
        return { id, from, to, label };
      }),
    },
  };
  for (const journey of index(journeys, "journeys", 1, 10).values()) {
    check(text(journey.title), `Invalid title: ${journey.id}`);
    const participants = new Set();
    const steps = [];
    for (const step of index(journey.steps, "steps", 1, 80).values()) {
      check(edges.has(step.link) && ["sync", "reply", "async"].includes(step.style) &&
        (step.page === undefined || own(pages, step.page)) && !nodes.has(step.id), `Invalid journey reference: ${step.id}`);
      const edge = edges.get(step.link);
      const reply = step.style === "reply";
      const from = reply ? edge.to : edge.from;
      const to = reply ? edge.from : edge.to;
      const label = step.page === undefined ? step.label : `${step.label} ${pages[step.page].path}`;
      check(text(step.label) && text(label), `Invalid step label: ${step.id}`);
      participants.add(from);
      participants.add(to);
      steps.push({ id: step.id, kind: "message", from, to, label, style: step.style });
    }
    output[`sequence-${journey.id}.json`] = {
      ...head("sequence-diagram/v1", journey.id, journey.title),
      participants: components.filter(({ id }) => participants.has(id)).map(({ id, label, kind }) =>
        ({ id, label, kind: kind === "actor" ? "actor" : "participant" })),
      steps,
    };
  }
  return output;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mode = process.argv[2];
  check(mode === "--write" || mode === "--check", "Use --write or --check");
  const input = new URL("../src/react-app/site-model.json", import.meta.url);
  const outputs = project(JSON.parse(readFileSync(input, "utf8")));
  const dir = new URL("../docs/model/", import.meta.url);
  for (const file of readdirSync(dir)) {
    if (file.startsWith("sequence-") && file.endsWith(".json")) {
      check(own(outputs, file), `Obsolete view: ${file}; remove it and its rendered bundle`);
    }
  }
  for (const [name, model] of Object.entries(outputs)) {
    const file = new URL(name, dir);
    const expected = JSON.stringify(model, null, 2) + "\n";
    if (mode === "--write") writeFileSync(file, expected);
    else check(readFileSync(file, "utf8") === expected, `Stale view: ${name}; run npm run model:generate`);
  }
}
