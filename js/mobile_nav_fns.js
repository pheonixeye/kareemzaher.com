//mobile navigation
const overlayNav = document.querySelector(".overlay-nav");

function openNav() {
  overlayNav.style.width = "50%";
  overlayNav.classList.toggle("is-open");
}

function closeNav() {
  overlayNav.style.width = "0%";
  overlayNav.classList.toggle("is-open");
}
const menuButton = document.querySelector(".mobile-nav-btn");

document.addEventListener("click", (e) => {
  // console.log(e.target.id);
  if (
    overlayNav.classList.contains("is-open") &&
    !e.target.isEqualNode(menuButton) &&
    !e.target.isEqualNode(overlayNav) &&
    !menuButton.contains(e.target)
  ) {
    closeNav();
  }
});

menuButton.addEventListener('click', (e) => {
  openNav();
});


document.addEventListener('DOMContentLoaded', (e) => {
  const closeMenuButton = document.querySelector(".overlay-nav .close-btn");
  closeMenuButton.addEventListener("click", (e) => {
    closeNav();
  });
});


