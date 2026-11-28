import { createHash, timingSafeEqual } from "node:crypto";
import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { parseCollectorHits } from "./collector-hits";
import workbench from "./assets/protobuf-workbench.html?raw";
import { consolePage, endpointsPage, protobufPage, referencePage, toolsPage } from "./oob-page";

type OobEnv = Env & {
  OOB_VIEW_USERNAME?: string;
  OOB_VIEW_PASSWORD?: string;
  OOB_HITS_SNAPSHOT?: string;
  OOB_HITS_FEED_URL?: string;
  OOB_HITS_FEED_TOKEN?: string;
};

type Hit = { timestamp: number; protocol: string };
const protocols = new Set(["HTTP", "HTTPS", "DNS", "SMTP"]);
const oob = new Hono<{ Bindings: OobEnv; Variables: { nonce: string } }>();

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function readHits(snapshot: string | undefined): Hit[] {
  if (!snapshot) return [];
  const records: unknown = JSON.parse(snapshot);
  if (!Array.isArray(records) || records.length > 500) throw new Error("Invalid hit list");
  return records.map((record: unknown) => {
    if (typeof record !== "object" || record === null) throw new Error("Invalid hit");
    const { timestamp, protocol } = record as Record<string, unknown>;
    if (typeof timestamp !== "string" || typeof protocol !== "string") {
      throw new Error("Invalid hit fields");
    }
    const time = Date.parse(timestamp);
    const label = protocol.toUpperCase();
    if (!Number.isFinite(time) || !protocols.has(label)) throw new Error("Invalid hit metadata");
    return { timestamp: time, protocol: label };
  }).sort((a, b) => b.timestamp - a.timestamp);
}

oob.use("*", async (c, next) => {
  c.header("Cache-Control", "private, no-store");
  c.header("X-Robots-Tag", "noindex, nofollow");
  c.header("X-Content-Type-Options", "nosniff");
  const nonce = crypto.randomUUID();
  c.set("nonce", nonce);
  c.header("Content-Security-Policy", `default-src 'none'; script-src 'nonce-${nonce}'; connect-src 'self'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'`);
  const { OOB_VIEW_USERNAME: username, OOB_VIEW_PASSWORD: password } = c.env;
  if (!username || !password) return c.text("OOB viewer is unavailable.", 503);

  return basicAuth({
    realm: "mement0rq OOB hits",
    verifyUser: (inputUsername, inputPassword) => {
      const userMatches = timingSafeEqual(digest(inputUsername), digest(username));
      const passwordMatches = timingSafeEqual(digest(inputPassword), digest(password));
      return userMatches && passwordMatches;
    },
  })(c, next);
});

async function readFeed(url: string, token: string | undefined) {
  const endpoint = new URL(url);
  if (endpoint.protocol !== "https:" || endpoint.username || endpoint.password) {
    throw new Error("Invalid feed URL");
  }
  const response = await fetch(endpoint, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    redirect: "error",
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok || !response.body) throw new Error(`Feed unavailable (${response.status})`);

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return body + decoder.decode();
      size += value.byteLength;
      if (size > 128 * 1024) throw new Error("Feed is too large");
      body += decoder.decode(value, { stream: true });
    }
  } finally {
    await reader.cancel();
  }
}

oob.get("/", (c) => c.html(toolsPage()));
oob.get("/oob", (c) => c.html(consolePage(c.get("nonce"))));
oob.get("/endpoints", (c) => c.html(endpointsPage(c.get("nonce"))));
oob.get("/reference", (c) => c.html(referencePage(c.req.query("topic"), c.req.query("view"))));
oob.get("/protobuf", (c) => {
  c.header("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; frame-src 'self'; frame-ancestors 'none'; base-uri 'none'");
  return c.html(protobufPage());
});
oob.get("/protobuf/workbench", (c) => {
  // The bundled workbench generates protobuf codecs in the browser. Give it an opaque origin.
  c.header("Content-Security-Policy", "sandbox allow-scripts allow-downloads; default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; style-src 'unsafe-inline'; frame-ancestors 'self'; base-uri 'none'; form-action 'none'");
  return c.html(workbench);
});

oob.get("/oob/hits", async (c) => {
  const { OOB_HITS_FEED_URL: url, OOB_HITS_FEED_TOKEN: token, OOB_HITS_SNAPSHOT: snapshot } = c.env;
  try {
    const hits = readHits(url ? await readFeed(url, token) : snapshot);
    return c.json({ source: url ? "Live feed" : "Snapshot", hits });
  } catch {
    return c.json({ error: "Could not load the hit records." }, 503);
  }
});

oob.post("/oob/lookup", async (c) => {
  const reader = c.req.raw.body?.getReader();
  if (!reader) return c.json({ error: "Enter a callback token." }, 400);
  let token = "";
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 128) return c.json({ error: "Invalid callback token." }, 400);
      token += new TextDecoder().decode(value);
    }
  } finally {
    await reader.cancel();
  }
  if (!/^[A-Za-z0-9_-]{8,128}$/.test(token)) return c.json({ error: "Invalid callback token." }, 400);

  try {
    const endpoint = new URL("https://hooks.mement0rq.com/oob/hits");
    endpoint.searchParams.set("token", token);
    const hits = parseCollectorHits(JSON.parse(await readFeed(endpoint.href, undefined)));
    return c.json({ source: "Collector", hits });
  } catch (error) {
    console.error("Collector lookup failed", error instanceof Error ? error.message.replaceAll(token, "[token]") : "unknown error");
    return c.json({ error: "Could not load collector hits." }, 503);
  }
});

export default oob;
