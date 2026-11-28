import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { chromium } from "playwright";
import { preview } from "vite";

const cases = JSON.parse(await readFile(new URL("../docs/model/acceptance.json", import.meta.url), "utf8"));
assert.equal(cases.version, "site-acceptance/v1");

// Reviewer-owned checks. These do not come from the projector or React.
const bodyLandmarks = new Map([
  ["/blog/ai-recon-rabbit-holes", "One guess became the basis for the next"],
  ["/blog/getting-started", "Scripting the boring parts"],
]);
const unpublishedTitle = "My first bounty";
assert.equal(cases.index.path, "/blog", "public blog index must keep its URL");
for (const path of bodyLandmarks.keys()) {
  assert.ok(cases.articles.some((entry) => entry.path === path), `published baseline lost ${path}`);
}
assert.ok(cases.drafts.some((draft) => draft.title === unpublishedTitle), "unpublished baseline lost draft");

// Browse the production client build without the Worker plugin. This gate
// verifies the React SPA, not Cloudflare routing or API behaviour.
const server = await preview({
  configFile: false,
  appType: "spa",
  build: { outDir: "dist/client" },
  preview: { host: "127.0.0.1", port: 4173, strictPort: true },
});
const url = (path) => new URL(path, "http://127.0.0.1:4173").href;
let browser;
try {
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE || undefined });
  const page = await browser.newPage();
  page.setDefaultTimeout(5000);
  await page.route("**/*", (route) =>
    new URL(route.request().url()).origin === new URL(url("/")).origin ? route.continue() : route.abort());
  const appErrors = [];
  page.on("pageerror", (error) => appErrors.push(error.message));

  async function assertScreen(expected) {
    await page.getByRole("heading", { level: 1, name: expected.heading, exact: true }).waitFor();
    await page.waitForFunction(({ title, description }) =>
      document.title === title && document.querySelector('meta[name="description"]')?.content === description,
    expected, { timeout: 5000 });
    assert.equal(page.url(), url(expected.path));
  }

  await page.goto(url(cases.index.path));
  await assertScreen(cases.index);
  const main = page.getByRole("main");
  const blogLinks = main.locator(`a[href^="${cases.index.path}/"]`);
  assert.deepEqual(await blogLinks.evaluateAll((links) => links.map((link) => link.getAttribute("href"))),
    cases.articles.map(({ path }) => path), "blog index must link to the published routes in model order");
  for (const article of cases.articles) {
    const link = main.getByRole("link", { name: new RegExp(escapeRegExp(article.heading)) });
    assert.equal(await link.getAttribute("href"), article.path);
    assert.equal(await link.locator("time").getAttribute("datetime"), article.date);
  }
  for (const draft of cases.drafts) {
    const title = main.getByText(draft.title, { exact: true });
    assert.equal(await title.count(), 1);
    assert.equal(await title.evaluate((element) => element.closest("a,[role=link]") !== null), false);
  }

  for (const article of cases.articles) {
    await page.goto(url(cases.index.path));
    await assertScreen(cases.index);
    await main.locator(`a[href="${article.path}"]`).click();
    await assertScreen(article);
    await page.goto(url(article.path));
    await assertScreen(article);
    assert.equal(await main.locator("time").first().getAttribute("datetime"), article.date);
    if (bodyLandmarks.has(article.path)) {
      await main.getByRole("heading", { name: bodyLandmarks.get(article.path), exact: true }).waitFor();
    }
    const back = main.getByRole("link", { name: "back to blog", exact: true });
    assert.equal(await back.getAttribute("href"), cases.index.path);
    await back.click();
    await assertScreen(cases.index);
  }
  assert.deepEqual(appErrors, [], "browser page errors");
  console.log(`Site acceptance passed: blog index, ${cases.articles.length} article routes, ${cases.drafts.length} unlinked draft(s).`);
} finally {
  try {
    await browser?.close();
  } finally {
    await new Promise((resolve, reject) => server.httpServer.close((error) => error ? reject(error) : resolve()));
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
