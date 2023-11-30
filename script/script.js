// Index page specific.
// Video autoplay not compatible with safari.
// If using Safari, remove video.
if (
  location.pathname === "/index.html" &&
  navigator.vendor == "Apple Computer, Inc."
) {
  document.querySelector("#myVideo").remove();
  document.querySelector("#video-poster").classList.remove("hidden");
}
document.addEventListener("DOMContentLoaded", function () {
  // Guessing Game
  let randomNumber; // Declare lets

  // Get elements
  const userGuessInput = document.getElementById("userGuess");
  const submitGuessButton = document.getElementById("submitGuess");
  const resultMessage = document.getElementById("result");

  // Add click event
  submitGuessButton.addEventListener("click", checkGuess);

  // Start- guessing game
  initializeGame();

  function initializeGame() {
    // Clear the result message
    resultMessage.textContent = "";

    // Generate a  random number
    randomNumber = Math.floor(Math.random() * 10) + 1;
  }

  function checkGuess() {
    // Get the  guess
    const userGuess = parseInt(userGuessInput.value);

    // Check if the guess is valid
    if (!isNaN(userGuess) && userGuess >= 1 && userGuess <= 10) {
      // Check the guess
      if (userGuess === randomNumber) {
        resultMessage.textContent =
          "Congratulations! You guessed the correct number!";
        // Restart the game
        setTimeout(initializeGame, 1500);
      } else {
        resultMessage.textContent = `Sorry, the correct number was ${randomNumber}. Try again!`;

        // Generate
        randomNumber = Math.floor(Math.random() * 10) + 1;
      }
    } else {
      resultMessage.textContent =
        "Please enter a valid number between 1 and 10.";
    }
  }

  // News Cards
  // Get the description
  const descriptionText = document.getElementById("description-text");

  // Get all the news card images
  const newsCardImages = document.querySelectorAll(".news-card__image");

  // Add click event
  newsCardImages.forEach(function (image) {
    image.addEventListener("click", showImageText);
  });

  // Function
  function showImageText(event) {
    // Get the data
    const imageText = event.target.getAttribute("data-text");

    // Display text
    descriptionText.textContent = imageText;
    descriptionText.style.display = "block";
  }
}); 