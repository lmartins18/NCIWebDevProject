
// Execute when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Elements
    const userGuessInput = document.getElementById("userGuess");
    const submitGuessButton = document.getElementById("submitGuess");
    const resultMessage = document.getElementById("result");
    
    // Fields
    let randomNumber;
  
    // Add click event
    submitGuessButton.addEventListener("click", checkGuess);
    // Start the guessing game
    initializeGame();
  
    function initializeGame() {
      resultMessage.textContent = "";
      randomNumber = Math.floor(Math.random() * 10) + 1;
    }
  
    function checkGuess() {
      const userGuess = parseInt(userGuessInput?.value);
  
      if (!isNaN(userGuess) && userGuess >= 1 && userGuess <= 10) {
        if (userGuess === randomNumber) {
          resultMessage.textContent =
            "Congratulations! You guessed the correct number!";
          setTimeout(initializeGame, 1500);
        } else {
          resultMessage.textContent = `Sorry, the correct number was ${randomNumber}. Try again!`;
          randomNumber = Math.floor(Math.random() * 10) + 1;
        }
      } else {
        resultMessage.textContent =
          "Please enter a valid number between 1 and 10.";
      }
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
  