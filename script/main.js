// Check if the browser is Safari and remove video if true
if (navigator.vendor === "Apple Computer, Inc.") {
  const video = document.querySelector("#myVideo");
  const videoPoster = document.querySelector("#video-poster");
  
  if (video) video.remove();
  if (videoPoster) videoPoster.classList.remove("hidden");
}

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
