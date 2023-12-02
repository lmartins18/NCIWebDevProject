// Elements
const burgerIcon = document.getElementById("burger-icon"),
  mobileMenuOverlay = document.getElementById("mobile-menu-overlay"),
  closeIcon = document.getElementById("close-icon");

// Function to toggle the visibility of the mobile menu overlay
function toggleMobileMenu() {
  mobileMenuOverlay.classList.toggle("hidden");
}

// Function to close the mobile menu
function closeMobileMenu() {
  mobileMenuOverlay.classList.add("hidden");
}

// Event listener for the burger icon to toggle the mobile menu
burgerIcon && burgerIcon.addEventListener("click", toggleMobileMenu);

// Event listener for the close icon to close the mobile menu
closeIcon && closeIcon.addEventListener("click", closeMobileMenu);
