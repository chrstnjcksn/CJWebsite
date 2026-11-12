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

const aboutCarousel = document.querySelector("[data-about-carousel]");

if (aboutCarousel) {
  const track = aboutCarousel.querySelector("[data-carousel-track]");
  const slides = [...track.children];
  const previousButton = aboutCarousel.querySelector("[data-carousel-previous]");
  const nextButton = aboutCarousel.querySelector("[data-carousel-next]");
  const status = aboutCarousel.querySelector("[data-carousel-status]");
  let activeIndex = 0;

  const updateCarousel = () => {
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    slides[activeIndex].querySelector("img").loading = "eager";

    slides.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", String(index !== activeIndex));
    });

    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === slides.length - 1;

    for (const button of [previousButton, nextButton]) {
      const icon = button.querySelector("img");
      icon.src = button.disabled
        ? icon.dataset.disabledIcon
        : icon.dataset.activeIcon;
    }

    status.textContent = `Slide ${activeIndex + 1} of ${slides.length}`;
  };

  previousButton.addEventListener("click", () => {
    if (activeIndex > 0) {
      activeIndex -= 1;
      updateCarousel();
    }
  });

  nextButton.addEventListener("click", () => {
    if (activeIndex < slides.length - 1) {
      activeIndex += 1;
      updateCarousel();
    }
  });

  aboutCarousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && activeIndex > 0) {
      activeIndex -= 1;
      updateCarousel();
    } else if (event.key === "ArrowRight" && activeIndex < slides.length - 1) {
      activeIndex += 1;
      updateCarousel();
    }
  });

  updateCarousel();
}
