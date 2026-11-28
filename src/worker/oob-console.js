const $ = (selector) => document.querySelector(selector);
const tokenForm = $("#token-form");
const tokenInput = $("#callback-token");
const filter = $("#filter");
const status = $("#status");
const records = $("#records");
const rawJson = $("#raw-json");
const empty = $("#empty");
const protocols = $("#protocols");
const recentTokens = $("#recent-tokens");
const refresh = $("#refresh");
const poll = $("#poll");
const state = { hits: [], token: "", recent: [], protocol: null, raw: false, timer: null, loading: false };

function shownHits() {
  const query = filter.value.trim().toLowerCase();
  return state.hits.filter((hit) =>
    (!state.protocol || hit.protocol === state.protocol) &&
    (!query || JSON.stringify(hit).toLowerCase().includes(query)),
  );
}

function element(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = String(content);
  return node;
}

function renderRecords() {
  const visible = shownHits();
  $("#selected-token").textContent = state.token || "No token selected";
  $("#selected-summary").textContent = state.token ? `${state.hits.length} stored · ${visible.length} shown` : "Load a token to see its requests.";
  for (const id of ["copy-token", "copy-url", "export-json", "copy-headers"]) $(`#${id}`).disabled = !state.token;
  rawJson.textContent = JSON.stringify(visible, null, 2);
  records.replaceChildren();
  for (const hit of visible) {
    const card = element("article", "oob-record");
    const heading = element("div", "oob-record-head");
    const title = element("div");
    title.append(element("span", "oob-method", hit.method || hit.protocol), "  ", element("span", "", (hit.eventType || "callback_hit").replaceAll("_", " ")));
    const time = element("time", "", new Date(hit.timestamp).toISOString());
    time.dateTime = new Date(hit.timestamp).toISOString();
    heading.append(title, time);
    card.append(heading, element("code", "oob-path", hit.path || "—"));
    const grid = element("div", "oob-fields");
    for (const [label, value] of [
      ["Source IP", hit.sourceIp], ["Connection peer", hit.peerIp], ["Content type", hit.contentType],
      ["Body size", hit.bodyLength === undefined ? undefined : `${hit.bodyLength} bytes`],
      ["Body SHA-256", hit.bodySha256], ["Response status", hit.responseStatus],
      ["Request ID", hit.hitId],
    ]) {
      if (value === undefined) continue;
      const field = element("div");
      field.append(element("span", "oob-field-label", label), element("code", "", value));
      grid.append(field);
    }
    if (grid.childNodes.length) card.append(grid);
    const headers = Object.entries(hit.headers || {});
    if (headers.length) {
      const details = element("details");
      details.append(element("summary", "", `Headers (${headers.length})`), element("pre", "", headers.map(([name, value]) => `${name}: ${value}`).join("\n")));
      card.append(details);
    }
    records.append(card);
  }
  empty.hidden = visible.length > 0;
  empty.textContent = state.token ? "No matching requests." : "Load a token to see requests.";
  records.hidden = state.raw;
  rawJson.hidden = !state.raw;
}

function renderProtocols() {
  const counts = new Map();
  for (const hit of state.hits) counts.set(hit.protocol, (counts.get(hit.protocol) || 0) + 1);
  const options = [[null, state.hits.length], ...counts];
  protocols.replaceChildren(...options.map(([name, count]) => {
    const button = element("button", "", `${name || "All protocols"} · ${count}`);
    button.type = "button";
    button.setAttribute("aria-pressed", String(name === state.protocol));
    button.addEventListener("click", () => {
      state.protocol = name;
      renderProtocols();
      renderRecords();
    });
    return button;
  }));
}

function renderRecent() {
  recentTokens.replaceChildren(...state.recent.map((token) => {
    const button = element("button");
    button.type = "button";
    button.setAttribute("aria-pressed", String(token === state.token));
    button.append(element("code", "", token), element("small", "", token === state.token ? `${state.hits.length} hits` : "Select token"));
    button.addEventListener("click", () => {
      if (state.loading) return;
      tokenInput.value = token;
      state.token = token;
      state.hits = [];
      state.protocol = null;
      renderRecords();
      loadHits();
    });
    return button;
  }));
  if (!state.recent.length) recentTokens.append(element("p", "", "Load a token to start."));
}

async function loadHits() {
  if (state.loading) return;
  state.loading = true;
  refresh.disabled = true;
  tokenForm.querySelector("button").disabled = true;
  status.textContent = "Loading requests…";
  try {
    const response = await fetch(state.token ? "/monstera/oob/lookup" : "/monstera/oob/hits", {
      method: state.token ? "POST" : "GET",
      body: state.token || undefined,
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not load requests.");
    state.hits = data.hits;
    if (state.protocol && !state.hits.some((hit) => hit.protocol === state.protocol)) state.protocol = null;
    if (state.token) state.recent = [state.token, ...state.recent.filter((token) => token !== state.token)].slice(0, 8);
    renderRecent();
    renderProtocols();
    renderRecords();
    status.textContent = `${data.source} · ${state.hits.length} hits · updated ${new Date().toLocaleTimeString()}${state.token ? "" : " · enter a token for live collector hits"}`;
  } catch (error) {
    status.textContent = error.message;
  } finally {
    refresh.disabled = false;
    tokenForm.querySelector("button").disabled = false;
    state.loading = false;
  }
}

function copy(text) {
  navigator.clipboard.writeText(text).then(() => { status.textContent = "Copied to clipboard."; }).catch(() => { status.textContent = "Clipboard unavailable."; });
}

tokenForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (state.loading) return;
  state.token = tokenInput.value.trim();
  state.hits = [];
  state.protocol = null;
  renderRecords();
  loadHits();
});
filter.addEventListener("input", renderRecords);
refresh.addEventListener("click", loadHits);
poll.addEventListener("click", () => {
  if (state.timer) clearInterval(state.timer);
  state.timer = state.timer ? null : setInterval(loadHits, 90_000);
  poll.textContent = state.timer ? "Pause polling" : "Enable polling (90s)";
  poll.setAttribute("aria-pressed", String(Boolean(state.timer)));
});
$("#details-tab").addEventListener("click", () => {
  state.raw = false;
  $("#details-tab").setAttribute("aria-pressed", "true");
  $("#raw-tab").setAttribute("aria-pressed", "false");
  renderRecords();
});
$("#raw-tab").addEventListener("click", () => {
  state.raw = true;
  $("#details-tab").setAttribute("aria-pressed", "false");
  $("#raw-tab").setAttribute("aria-pressed", "true");
  renderRecords();
});
$("#copy-token").addEventListener("click", () => copy(state.token));
$("#copy-url").addEventListener("click", () => copy(`https://hooks.mement0rq.com/oob/${encodeURIComponent(state.token)}`));
$("#copy-headers").addEventListener("click", () => copy(shownHits().map((hit) => Object.entries(hit.headers || {}).map(([name, value]) => `${name}: ${value}`).join("\n")).join("\n\n")));
$("#export-json").addEventListener("click", () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(shownHits(), null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `oob-${state.token.slice(0, 12)}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
loadHits();
