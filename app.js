const filterButtons = [...document.querySelectorAll(".filter-button")];
const projectCards = [...document.querySelectorAll(".project-card")];
const filterPanels = [...document.querySelectorAll("[data-filter-category]")];

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    for (const candidate of filterButtons) {
      const isActive = candidate === button;
      candidate.classList.toggle("is-active", isActive);
      candidate.setAttribute("aria-pressed", String(isActive));
    }

    for (const card of projectCards) {
      const categories = card.dataset.categories.split(/\s+/);
      card.hidden = filter !== "all" && !categories.includes(filter);
    }

    for (const panel of filterPanels) {
      panel.hidden = panel.dataset.filterCategory !== filter;
    }
  });
}
