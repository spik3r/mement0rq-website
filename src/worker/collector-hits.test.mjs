import assert from "node:assert/strict";
import test from "node:test";
import { parseCollectorHits } from "./collector-hits.ts";

test("admin collector hits preserve headers, body preview, and raw fields", () => {
  const source = {
    timestamp: "2026-11-28T03:15:16.393Z",
    method: "GET",
    path: "/oob/recon-callback-change-me",
    headers_present: ["cookie", "content-type", "user-agent"],
    header_values: { cookie: "secret", "content-type": "application/json", "user-agent": "test-client" },
    body_preview: "private body",
    body_sha256: "sha256:0",
    query: { execution: "test-execution" },
  };
  const [hit] = parseCollectorHits({ hits: [source] });
  assert.deepEqual(hit.headers, source.header_values);
  assert.deepEqual(hit.query, source.query);
  assert.equal(hit.bodyPreview, "private body");
  assert.deepEqual(hit.raw, source);
});

test("public collector hits show header names without invented values", () => {
  const [hit] = parseCollectorHits({ hits: [{
    timestamp: "2026-11-28T03:15:16.393Z",
    method: "GET",
    path: "/oob/test-token",
    headers_present: ["accept", "authorization"],
  }] });
  assert.deepEqual(hit.headers, {
    accept: "[value unavailable from public endpoint]",
    authorization: "[value unavailable from public endpoint]",
  });
  assert.equal("bodyPreview" in hit, false);
});

test("collector responses require the documented shape", () => {
  assert.throws(() => parseCollectorHits({ hits: [{ timestamp: "invalid", method: "GET", path: "/oob/x" }] }));
  assert.throws(() => parseCollectorHits({ hits: Array(501).fill({}) }));
  assert.throws(() => parseCollectorHits({ error: "no KV binding" }));
});
