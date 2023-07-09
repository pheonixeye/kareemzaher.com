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

document.addEventListener("click", (e) => {
  // console.log(e.target.id);
  const menuButton = document.querySelector(".mobile-nav-btn");
  if (
    overlayNav.classList.contains("is-open") &&
    !e.target.isEqualNode(menuButton) &&
    !e.target.isEqualNode(overlayNav) &&
    !menuButton.contains(e.target)
  ) {
    closeNav();
  }
});
