// Execute when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Check if the browser is Safari and remove video if true
  if (navigator.vendor === "Apple Computer, Inc.") {
    const video = document.querySelector("#myVideo");
    const videoPoster = document.querySelector("#video-poster");

    if (video) video.remove();
    if (videoPoster) videoPoster.classList.remove("md:hidden");
  }

  // Gym Word Scramble Game
  const gymWords = ["fitness", "exercise", "strength", "workout", "nutrition"];

  // Elements
  const scrambledWordElement = document.getElementById("scrambled-word");
  const userGuessInput = document.getElementById("userGuess");
  const submitGuessButton = document.getElementById("submitGuess");
  const resultMessage = document.getElementById("result");

  // Add click event
  if (submitGuessButton) {
    submitGuessButton.addEventListener("click", checkGuess);
  }

  // Start the word scramble game
  initializeGame();

  function initializeGame() {
    const randomIndex = Math.floor(Math.random() * gymWords.length);
    const scrambledWord = scrambleWord(gymWords[randomIndex]);

    scrambledWordElement.textContent = scrambledWord;
    resultMessage.textContent = "";
  }

  function scrambleWord(word) {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  function checkGuess() {
    const userGuess = userGuessInput?.value.toLowerCase();

    if (gymWords.includes(userGuess)) {
      resultMessage.textContent =
        "Congratulations! You guessed the correct word!";
    } else {
      resultMessage.textContent =
        "Sorry, that's not the correct word. Try again!";
    }

    // Restart the game
    setTimeout(initializeGame, 1500);
  }

  // News Cards
  const descriptionText = document.getElementById("description-text");
  const newsCardImages = document.querySelectorAll(".news-card__image");

  if (newsCardImages) {
    newsCardImages.forEach(function (image) {
      image.addEventListener("click", showImageText);
    });
  }

  function showImageText(event) {
    const imageText = event.target.getAttribute("data-text");
    descriptionText.textContent = imageText;
    descriptionText.style.display = "block";
  }
});
