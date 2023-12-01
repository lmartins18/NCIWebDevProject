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
  let word;
  initializeGame();

  function initializeGame() {
    const randomIndex = Math.floor(Math.random() * gymWords.length);
    word = gymWords[randomIndex];
    const scrambledWord = scrambleWord(word);

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
        `Sorry, that's not the correct word, the word was: ${word}. Try again!`;
    }

    // Restart the game.
    setTimeout(initializeGame, 1500);
  }

  // News Cards/Modal.
  const modal = document.getElementById('news-modal');
  const modalImage = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeModalBtn = document.getElementById('close-modal-button');

  // Function to open modal
  function openModal(imageSrc, title, content) {
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalBody.textContent = content;
    toggleModal();
  }

  // Function to close modal.
  function toggleModal() {
    modal.classList.toggle('hidden');
  }

  // Attach click event to "Read More" links.
  const readMoreBtns = document.querySelectorAll('.read-more-btn');
  readMoreBtns.forEach(function (readMoreBtn, index) {
    readMoreBtn.addEventListener('click', function (e) {
      const articleId = 'article' + (index + 1); // Assuming the IDs are "news1", "news2", ...
      const article = document.getElementById(articleId);
      const imageSrc = article.querySelector('img').src;
      const title = article.querySelector('h2').textContent;
      const content = article.querySelector('h6').textContent;
      openModal(imageSrc, title, content);
    });
  });

  // Attach click event to close button.
  closeModalBtn.addEventListener('click', toggleModal);

  // Close modal when clicking outside the modal content.
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      toggleModal();
    }
  }); 
});
