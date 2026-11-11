const filterButtons = [...document.querySelectorAll(".filter-button")];
const projectCards = [...document.querySelectorAll(".project-card")];

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
  });
}
