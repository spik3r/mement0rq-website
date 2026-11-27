import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { project } from "./project-site-model.mjs";

const base = JSON.parse(readFileSync(new URL("../src/react-app/site-model.json", import.meta.url), "utf8"));

test("shared IDs drive both generated views and replies reverse the actual link", () => {
  const views = project(base);
  const sequence = views["sequence-ReadArticle.json"];
  assert.deepEqual(sequence.steps.slice(0, 2).map(({ from, to }) => [from, to]), [
    ["Browser", "Assets"], ["Assets", "Browser"],
  ]);
  assert.equal(sequence.steps.find(({ id }) => id === "OpenArticle").label, `Open ${base.pages.GettingStarted.path}`);
  const refactored = structuredClone(base);
  refactored.components[1].label = "Renamed asset service";
  refactored.pages.GettingStarted.path = "/blog/renamed";
  const changed = project(refactored);
  assert.equal(changed["architecture.json"].nodes[1].label, "Renamed asset service");
  assert.equal(changed["sequence-ReadArticle.json"].participants[1].label, "Renamed asset service");
  assert.equal(changed["sequence-ReadArticle.json"].steps.find(({ id }) => id === "OpenArticle").label, "Open /blog/renamed");
});

test("edge order is immaterial, but authored steps keep their order", () => {
  const changed = structuredClone(base);
  changed.links.reverse();
  assert.deepEqual(project(changed), project(base));
  changed.journeys[0].steps.reverse();
  assert.equal(project(changed)["sequence-ReadArticle.json"].steps[0].id, "Return");
});

test("invalid models stop projection before rendering", () => {
  for (const [edit, message] of [
    [m => { m.pages.Resources.path = "/blog"; }, /duplicate route/],
    [m => { m.pages.Resources.path += "\n"; }, /Invalid or duplicate route/],
    [m => { m.pages.GettingStarted.parent = "Resources"; }, /Invalid parent/],
    [m => { m.articles.find(a => a.status === "draft").page = "Blog"; }, /Draft must not be routable/],
    [m => { m.articles.find(a => a.id === "GettingStarted").date = "2026-13"; }, /Invalid published article/],
    [m => { m.articles = m.articles.filter(a => a.id !== "GettingStarted"); }, /no published article/],
    [m => { m.links[0].to = "Unknown"; }, /Invalid link/],
    [m => { m.journeys[0].steps[0].page = "Unknown"; }, /Invalid journey reference/],
  ]) {
    const model = structuredClone(base);
    edit(model);
    assert.throws(() => project(model), message);
  }
});

test("acceptance projection distinguishes public routes from draft labels", () => {
  const { version, index, articles, drafts } = project(base)["acceptance.json"];
  assert.equal(version, "site-acceptance/v1");
  assert.equal(index.path, "/blog");
  assert.deepEqual(articles.map(({ id, path, date }) => [id, path, date]), [
    ["AiRecon", "/blog/ai-recon-rabbit-holes", "2026-09"],
    ["GettingStarted", "/blog/getting-started", "2026-05"],
  ]);
  assert.deepEqual(drafts, [{ id: "FirstBounty", title: "My first bounty" }]);
});
