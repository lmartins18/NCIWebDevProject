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
// Form validation.
function validateInput(field) {
  const input = document.getElementById(field);

  if (input.value.trim() !== "") {
    input.classList.remove("error");
    input.classList.add("valid");
  } else {
    input.classList.remove("valid");
    input.classList.add("error");
  }
}
function validateCheckbox(field) {
  const input = document.getElementById(field);
  if (input.checked) {
    input.classList.remove("error");
    input.classList.add("valid");
  } else {
    input.classList.remove("valid");
    input.classList.add("error");
  }
}
function validatePassword(fieldOne, fieldTwo) {
  // Inputs
  const passwordInput = document.getElementById(fieldOne);
  const confirmPasswordInput = document.getElementById(fieldTwo);
  // Passwords
  const passwordText = passwordInput.value;
  const confirmPasswordText = confirmPasswordInput.value;

  // Check if passwords match
  const passwordsMatch = passwordText === confirmPasswordText;
  // Check if password is at least 8 characters long
  const isLengthValid = passwordText.length >= 8;
  // Check if password contains at least one special character
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const hasSpecialCharacter = specialCharacterRegex.test(passwordText);

  validateInput(fieldOne);
  validateInput(fieldTwo);

  if (!isLengthValid || !hasSpecialCharacter) {
    passwordInput.classList.remove("valid");
    passwordInput.classList.add("error");
  }
  if (!passwordsMatch) {
    passwordInput.classList.remove("valid");
    passwordInput.classList.add("error");
    confirmPasswordInput.classList.remove("valid");
    confirmPasswordInput.classList.add("error");
  }

  return { passwordsMatch, isLengthValid, hasSpecialCharacter };
}
function passwordErrors({
  passwordsMatch,
  isLengthValid,
  hasSpecialCharacter,
}) {
  var ulElement = document.createElement("ul");

  if (!passwordsMatch) {
    var liElement = document.createElement("li");
    liElement.textContent = "Passwords must match.";
    ulElement.appendChild(liElement);
  }
  if (!isLengthValid) {
    var liElement = document.createElement("li");
    liElement.textContent = "Password must be at least 8 characters long.";
    ulElement.appendChild(liElement);
  }
  if (!hasSpecialCharacter) {
    var liElement = document.createElement("li");
    liElement.textContent =
      "Password must contain at least one special character.";
    ulElement.appendChild(liElement);
  }

  return ulElement;
}
function validatePhoneNumber(field) {
  const input = document.getElementById(field);
  const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  const validPhoneNumber = phoneNumberRegex.test(input.value);
  
  if (validPhoneNumber) {
    input.classList.remove("error");
    input.classList.add("valid");
  } else {
    input.classList.remove("valid");
    input.classList.add("error");
  }
}


function validateForm() {
  // First prevent form submition.
  event.preventDefault();
  // Validate all inputs except password.
  validateInput("firstName");
  validateInput("lastName");
  validateInput("email");
  validateInput("dob");
  validateInput("membership");
  validatePhoneNumber("phoneNumber");
  validateCheckbox("terms");

  // Now validate password strength.
  const passwordValidation = validatePassword("password", "confirmPassword");
  const passwordErrorMessageList = passwordErrors(passwordValidation);

  let invalidInputs = document.querySelectorAll(".error");
  let formMessage = document.getElementById("formMessage");
  let passwordMessage = document.getElementById("passwordErrorList");
  let emptyFieldsList = document.getElementById("emptyFieldsList");
  emptyFieldsList.innerHTML = "";

  // Valid form.
  if (invalidInputs.length == 0) {
    formMessage.innerHTML =
      '<span class="valid-message">Form submitted successfully!</span>';
    // Here
    return;
  }
  // Reset error.
  formMessage.innerHTML = "";
  passwordMessage.innerHTML = "";
  // Validate password.
  if (passwordErrorMessageList.children.length > 0) {
    passwordMessage.innerHTML = passwordErrorMessageList.innerHTML;
  }

  formMessage.innerHTML +=
    '<br/> <span class="error-message">Please fill in all required fields correctly.</span>';

  invalidInputs.forEach(function (field) {
    let listItem = document.createElement("li");
    listItem.innerHTML = field.previousElementSibling.textContent.replace(
      ":",
      ""
    );
    listItem.onclick = function () {
      field.focus();
    };
    emptyFieldsList.appendChild(listItem);
  });
}
