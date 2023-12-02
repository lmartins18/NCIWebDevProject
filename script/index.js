// Execute when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Check if the browser is Safari and remove video if true
  if (navigator.vendor === "Apple Computer, Inc.") {
    // Remove video element and hide placeholder if browser is Safari
    const video = document.querySelector("#myVideo");
    const placeHolder = document.querySelector("#header-placeholder");

    if (video) video.remove();
    if (placeHolder) placeHolder.classList.toggle("md:hidden");
  }

  // Gym Word Scramble Game
  const gymWords = ["fitness", "exercise", "strength", "workout", "nutrition"];

  // Elements for the Word Scramble Game
  const scrambledWordElement = document.getElementById("scrambled-word");
  const userGuessInput = document.getElementById("userGuess");
  const submitGuessButton = document.getElementById("submitGuess");
  const resultMessage = document.getElementById("result");

  // Add click event for submitting guesses
  if (submitGuessButton) {
    submitGuessButton.addEventListener("click", checkGuess);
  }
  // Add enter key event for submitting guesses
  if (userGuessInput) {
    userGuessInput.addEventListener("keyup", () => {
      if (event.key === "Enter") checkGuess();
    });
  }

  // Start the word scramble game
  let word;
  initializeGame();

  // Function to initialize the Word Scramble Game
  function initializeGame() {
    // Choose a random word from the gymWords array
    const randomIndex = Math.floor(Math.random() * gymWords.length);
    word = gymWords[randomIndex];
    const scrambledWord = scrambleWord(word);

    // Display the scrambled word and reset result message
    scrambledWordElement.textContent = scrambledWord;
    resultMessage.textContent = "";
  }

  // Function to scramble a word
  function scrambleWord(word) {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  // Function to check the user's guess
  function checkGuess() {
    const userGuess = userGuessInput?.value.toLowerCase();

    // Check if the guessed word is correct
    if (gymWords.includes(userGuess)) {
      resultMessage.textContent =
        "Congratulations! You guessed the correct word!";
    } else {
      resultMessage.textContent = `Sorry, that's not the correct word, the word was: ${word}. Try again!`;
    }

    // Restart the game after a delay
    setTimeout(initializeGame, 1500);
  }

  // News Cards/Modal.
  const modal = document.getElementById("news-modal");
  const modalImage = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const closeModalBtn = document.getElementById("close-modal-button");

  // Function to open modal
  function openModal(imageSrc, title, content) {
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalBody.textContent = content;
    toggleModal();
  }

  // Function to close modal
  function toggleModal() {
    modal.classList.toggle("hidden");
  }

  // Attach click event to "Read More" links.
  const readMoreBtns = document.querySelectorAll(".read-more-btn");
  readMoreBtns.forEach(function (readMoreBtn, index) {
    readMoreBtn.addEventListener("click", function (e) {
      // Assuming the IDs are "news1", "news2", ...
      const articleId = "article" + (index + 1);
      const article = document.getElementById(articleId);
      const imageSrc = article.querySelector("img").src;
      const title = article.querySelector("h2").textContent;
      const content = article.querySelector("h6").textContent;
      openModal(imageSrc, title, content);
    });
  });

  // Attach click event to close button.
  closeModalBtn.addEventListener("click", toggleModal);

  // Close modal when clicking outside the modal content.
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      toggleModal();
    }
  });
});
