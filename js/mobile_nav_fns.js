//mobile navigation
const overlayNav = document.querySelector(".overlay-nav");
const menuButton = document.querySelector(".mobile-nav-btn");

function openNav() {
  if (!overlayNav) return;
  overlayNav.style.width = "50%";
  overlayNav.classList.toggle("is-open");
}

function closeNav() {
  if (!overlayNav) return;
  overlayNav.style.width = "0%";
  overlayNav.classList.toggle("is-open");
}

if (menuButton) {
  menuButton.addEventListener("click", () => {
    openNav();
  });
}

document.addEventListener("click", (e) => {
  if (
    overlayNav &&
    overlayNav.classList.contains("is-open") &&
    !e.target.isEqualNode(menuButton) &&
    !e.target.isEqualNode(overlayNav) &&
    !(menuButton && menuButton.contains(e.target))
  ) {
    closeNav();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const closeMenuButton = document.querySelector("#close-nav-btn");
  if (closeMenuButton) {
    closeMenuButton.addEventListener("click", () => {
      closeNav();
    });
  }
});
