// Navbar functionality
const burgerIcon = document.getElementById("burger-icon");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
const closeIcon = document.getElementById("close-icon");

if (burgerIcon) {
  burgerIcon.addEventListener("click", toggleMobileMenu);
}

if (closeIcon) {
  closeIcon.addEventListener("click", closeMobileMenu);
}

function toggleMobileMenu() {
  mobileMenuOverlay.classList.toggle("hidden");
}

function closeMobileMenu() {
  mobileMenuOverlay.classList.add("hidden");
}
