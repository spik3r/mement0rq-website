const filter = document.querySelector("#endpoint-filter");
const empty = document.querySelector("#endpoint-empty");
const status = document.querySelector("#endpoint-status");
const origin = document.querySelector("#endpoint-origin");
const token = document.querySelector("#endpoint-token");
const target = document.querySelector("#endpoint-target");
const cards = Array.from(document.querySelectorAll("[data-endpoint]"));

function render() {
  const query = filter.value.trim().toLowerCase();
  let collector;
  try {
    collector = new URL(origin.value.trim());
    if (collector.protocol !== "https:" || collector.username || collector.password || collector.search || collector.hash) throw new Error();
    status.textContent = "";
  } catch {
    status.textContent = "Enter an HTTPS collector origin without credentials or a query.";
    for (const card of cards) card.querySelector("[data-url]").textContent = "Invalid collector origin";
    return;
  }
  const base = collector.href.replace(/\/$/, "");
  const callbackToken = encodeURIComponent(token.value.trim() || "change-me");
  const destination = encodeURIComponent(target.value.trim());
  for (const card of cards) {
    const path = card.dataset.template.replaceAll("{token}", callbackToken).replaceAll("{target}", destination);
    const url = base + path;
    card.querySelector("[data-url]").textContent = url;
    card.hidden = !`${card.textContent} ${url}`.toLowerCase().includes(query);
  }
  empty.hidden = cards.some((card) => !card.hidden);
}

for (const input of [filter, origin, token, target]) input.addEventListener("input", render);
for (const card of cards) {
  card.querySelector("[data-copy-url]").addEventListener("click", async () => {
    const url = card.querySelector("[data-url]").textContent;
    if (!url.startsWith("https://")) return;
    try {
      await navigator.clipboard.writeText(url);
      status.textContent = "URL copied.";
    } catch {
      status.textContent = "Could not copy the URL. Select the URL text instead.";
    }
  });
}
render();
