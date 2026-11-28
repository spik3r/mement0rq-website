const filter = document.querySelector("#endpoint-filter");
const empty = document.querySelector("#endpoint-empty");
const status = document.querySelector("#endpoint-status");
const cards = Array.from(document.querySelectorAll("[data-endpoint]"));

filter.addEventListener("input", () => {
  const query = filter.value.trim().toLowerCase();
  for (const card of cards) {
    card.hidden = !card.textContent.toLowerCase().includes(query);
  }
  empty.hidden = cards.some((card) => !card.hidden);
});

for (const card of cards) {
  const endpoint = card.querySelector(".endpoint");
  card.querySelector("[data-copy-url]").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(endpoint.href);
      status.textContent = "URL copied.";
    } catch {
      status.textContent = "Could not copy the URL. Use the endpoint link to copy the address.";
    }
  });
}
