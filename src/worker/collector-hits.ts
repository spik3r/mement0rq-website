export type Hit = { timestamp: number; protocol: string; method?: string; path?: string };

// The public collector endpoint returns metadata only. Do not copy headers or bodies into the viewer.
export function parseCollectorHits(value: unknown): Hit[] {
  if (typeof value !== "object" || value === null || !Array.isArray((value as { hits?: unknown }).hits)) {
    throw new Error("Invalid collector response");
  }
  const records = (value as { hits: unknown[] }).hits;
  if (records.length > 500) throw new Error("Too many collector hits");
  return records.map((record) => {
    if (typeof record !== "object" || record === null) throw new Error("Invalid collector hit");
    const { timestamp, method, path } = record as Record<string, unknown>;
    if (typeof timestamp !== "string" || typeof method !== "string" || typeof path !== "string") {
      throw new Error("Invalid collector hit fields");
    }
    const time = Date.parse(timestamp);
    if (!Number.isFinite(time) || !/^[A-Z]{3,7}$/.test(method) || !path.startsWith("/") || path.length > 2048) {
      throw new Error("Invalid collector hit metadata");
    }
    return { timestamp: time, protocol: "HTTP", method, path };
  }).sort((a, b) => b.timestamp - a.timestamp);
}
