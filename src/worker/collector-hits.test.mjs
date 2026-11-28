import assert from "node:assert/strict";
import test from "node:test";
import { parseCollectorHits } from "./collector-hits.ts";

test("collector hits keep only public callback metadata", () => {
  const hits = parseCollectorHits({ hits: [{
    timestamp: "2026-11-28T03:15:16.393Z",
    method: "GET",
    path: "/oob/recon-callback-change-me",
    headers_present: ["cookie"],
    body_sha256: "sha256:0",
  }] });
  assert.deepEqual(hits, [{
    timestamp: Date.parse("2026-11-28T03:15:16.393Z"),
    protocol: "HTTP",
    method: "GET",
    path: "/oob/recon-callback-change-me",
  }]);
});

test("collector responses require the documented shape", () => {
  assert.throws(() => parseCollectorHits({ hits: [{ timestamp: "invalid", method: "GET", path: "/oob/x" }] }));
  assert.throws(() => parseCollectorHits({ hits: Array(501).fill({}) }));
  assert.throws(() => parseCollectorHits({ error: "no KV binding" }));
});
