const filter = document.querySelector("#filter");
const poll = document.querySelector("#poll");
const refresh = document.querySelector("#refresh");
const status = document.querySelector("#status");
const protocols = document.querySelector("#protocols");
const table = document.querySelector("#hits");
const rows = table.tBodies[0];
const empty = document.querySelector("#empty");

let hits = [];
let selected = null;
let timer;
let loading = false;

function renderRows() {
  const query = filter.value.trim().toUpperCase();
  const matching = hits.filter(({ protocol, timestamp }) => {
    const time = new Date(timestamp).toISOString();
    return (!selected || selected === protocol) && `${protocol} ${time}`.includes(query);
  });

  rows.replaceChildren();
  for (const { timestamp, protocol } of matching) {
    const time = new Date(timestamp).toISOString();
    const row = rows.insertRow();
    const label = document.createElement("time");
    label.dateTime = time;
    label.textContent = time;
    row.insertCell().append(label);
    row.insertCell().textContent = protocol;
  }
  table.hidden = matching.length === 0;
  empty.hidden = matching.length > 0;
}

function renderProtocols() {
  const counts = new Map();
  for (const { protocol } of hits) counts.set(protocol, (counts.get(protocol) ?? 0) + 1);

  const buttons = new Map();
  const options = [[null, hits.length], ...Array.from(counts).sort()];
  for (const [protocol, count] of options) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${protocol ?? "All protocols"} · ${count}`;
    button.setAttribute("aria-pressed", String(selected === protocol));
    button.addEventListener("click", () => {
      selected = protocol;
      for (const [key, control] of buttons) {
        control.setAttribute("aria-pressed", String(key === selected));
      }
      renderRows();
    });
    buttons.set(protocol, button);
  }
  protocols.replaceChildren(...buttons.values());
}

async function loadHits() {
  if (loading) return;
  loading = true;
  refresh.disabled = true;
  try {
    const response = await fetch("/monstera/oob/hits", { cache: "no-store" });
    if (!response.ok) throw new Error("Hit request failed");
    const data = await response.json();
    hits = data.hits;
    if (selected && !hits.some(({ protocol }) => protocol === selected)) selected = null;
    renderProtocols();
    renderRows();
    status.textContent = `${data.source} · ${hits.length} hits · updated ${new Date().toLocaleTimeString()}`;
  } catch {
    status.textContent = "Could not refresh hits.";
  } finally {
    refresh.disabled = false;
    loading = false;
  }
}

poll.addEventListener("click", () => {
  if (timer === undefined) {
    timer = setInterval(loadHits, 90_000);
    poll.textContent = "Pause polling";
  } else {
    clearInterval(timer);
    timer = undefined;
    poll.textContent = "Enable polling (90s)";
  }
  poll.setAttribute("aria-pressed", String(timer !== undefined));
});
refresh.addEventListener("click", loadHits);
filter.addEventListener("input", renderRows);
loadHits();
