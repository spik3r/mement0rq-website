export type CollectorHit = {
  timestamp: number;
  protocol: "HTTP";
  method: string;
  path: string;
  eventType: string;
  hitId?: string;
  headers: Record<string, string>;
  bodyLength?: number;
  bodySha256?: string;
  contentType?: string;
  responseStatus?: number;
  sourceIp?: string;
  peerIp?: string;
  query?: Record<string, string>;
  bodyPreview?: string;
  raw: Record<string, unknown>;
};

function optionalString(value: unknown, limit = 2048): string | undefined {
  return typeof value === "string" && value.length <= limit ? value : undefined;
}

// The public endpoint supplies header names. The admin endpoint supplies full
// request records when its server-side token is configured.
export function parseCollectorHits(value: unknown): CollectorHit[] {
  if (typeof value !== "object" || value === null || !Array.isArray((value as { hits?: unknown }).hits)) {
    throw new Error("Invalid collector response");
  }
  const records = (value as { hits: unknown[] }).hits;
  if (records.length > 500) throw new Error("Too many collector hits");
  return records.map((record) => {
    if (typeof record !== "object" || record === null) throw new Error("Invalid collector hit");
    const hit = record as Record<string, unknown>;
    const { timestamp, method, path } = hit;
    if (typeof timestamp !== "string" || typeof method !== "string" || typeof path !== "string") {
      throw new Error("Invalid collector hit fields");
    }
    const time = Date.parse(timestamp);
    if (!Number.isFinite(time) || !/^[A-Z]{3,7}$/.test(method) || !path.startsWith("/") || path.length > 2048) {
      throw new Error("Invalid collector hit metadata");
    }
    const names = hit.headers_present;
    const values = hit.header_values;
    const headers: Record<string, string> = {};
    if (Array.isArray(names)) {
      if (names.length > 100) throw new Error("Too many headers");
      for (const name of names) {
        if (typeof name !== "string" || !/^[a-z0-9-]{1,100}$/i.test(name)) throw new Error("Invalid header name");
        const key = name.toLowerCase();
        const raw = values && typeof values === "object" ? (values as Record<string, unknown>)[key] : undefined;
        headers[key] = typeof raw === "string" ? raw : "[value unavailable from public endpoint]";
      }
    }
    if (values && typeof values === "object" && !Array.isArray(values)) {
      for (const [name, raw] of Object.entries(values)) {
        if (typeof raw === "string" && /^[a-z0-9-]{1,100}$/i.test(name)) headers[name.toLowerCase()] = raw;
      }
    }
    const query: Record<string, string> = {};
    if (hit.query && typeof hit.query === "object" && !Array.isArray(hit.query)) {
      for (const [name, raw] of Object.entries(hit.query)) {
        if (typeof raw === "string") query[name] = raw;
      }
    }
    const bodyLength = Number.isSafeInteger(hit.body_length) && (hit.body_length as number) >= 0 ? hit.body_length as number : undefined;
    const responseStatus = Number.isInteger(hit.response_status) && (hit.response_status as number) >= 100 && (hit.response_status as number) <= 599 ? hit.response_status as number : undefined;
    const detail = {
      timestamp: time,
      protocol: "HTTP" as const,
      method,
      path,
      eventType: optionalString(hit.event_type, 32) ?? "callback_hit",
      hitId: optionalString(hit.hit_id, 100),
      headers,
      bodyLength,
      bodySha256: optionalString(hit.body_sha256, 100),
      contentType: optionalString(hit.content_type, 200),
      responseStatus,
      sourceIp: optionalString(hit.source_ip, 100),
      peerIp: optionalString(hit.peer_ip, 100),
      query,
      bodyPreview: typeof hit.body_preview === "string" ? hit.body_preview : undefined,
      raw: hit,
    };
    return Object.fromEntries(Object.entries(detail).filter(([, item]) => item !== undefined)) as CollectorHit;
  }).sort((a, b) => b.timestamp - a.timestamp);
}
