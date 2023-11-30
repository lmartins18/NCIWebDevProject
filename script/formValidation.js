function validateInput(field) {
  const input = document.getElementById(field);
  input.classList.toggle("valid", input.value.trim() !== "");
  input.classList.toggle("error", input.value.trim() === "");
}

function validateCheckbox(field) {
  const input = document.getElementById(field);
  input.classList.toggle("valid", input.checked);
  input.classList.toggle("error", !input.checked);
}

function validatePassword(fieldOne, fieldTwo) {
  // Inputs.
  const passwordInput = document.getElementById(fieldOne);
  const confirmPasswordInput = document.getElementById(fieldTwo);
  // Input texts.
  const passwordText = passwordInput.value;
  const confirmPasswordText = confirmPasswordInput.value;
  // Validation
  const passwordsMatch = passwordText === confirmPasswordText;
  const isLengthValid = passwordText.length >= 8;
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(passwordText);
  const hasNumber = /\d/.test(passwordText);
  const isPasswordValid = isLengthValid && hasSpecialCharacter && passwordsMatch && hasNumber;

  // Toggle classes.
  [passwordInput, confirmPasswordInput].forEach((input) => {
    input.classList.toggle("valid", isPasswordValid);
    input.classList.toggle("error", !isPasswordValid);
  });

  return { passwordsMatch, isLengthValid, hasSpecialCharacter, hasNumber };
}

function passwordErrors({ passwordsMatch, isLengthValid, hasSpecialCharacter, hasNumber }) {
  const ulElement = document.createElement("ul");

  if (!passwordsMatch) appendErrorMessage(ulElement, "Passwords must match.");
  if (!isLengthValid) appendErrorMessage(ulElement, "Password must be at least 8 characters long.");
  if (!hasSpecialCharacter) appendErrorMessage(ulElement, "Password must contain at least one special character.");
  if(!hasNumber) appendErrorMessage(ulElement, "Password must contain at least one number.");

  return ulElement;
}

function appendErrorMessage(ulElement, message) {
  const liElement = document.createElement("li");
  liElement.textContent = message;
  ulElement.appendChild(liElement);
}

function validatePhoneNumber(field) {
  const input = document.getElementById(field);
  const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  const validPhoneNumber = phoneNumberRegex.test(input.value);

  input.classList.toggle("valid", validPhoneNumber);
  input.classList.toggle("error", !validPhoneNumber);
}

function validateForm() {
  // Prevent form submition.
  event.preventDefault();
  // Validate fields.
  ["firstName", "lastName", "email", "dob", "membership"].forEach(validateInput);
  validatePhoneNumber("phoneNumber");
  validateCheckbox("terms");
  // Validate password.
  const passwordValidation = validatePassword("password", "confirmPassword");
  const passwordErrorMessageList = passwordErrors(passwordValidation);
  // Prepare lists of errors.
  const invalidInputs = document.querySelectorAll(".error");
  const formMessage = document.getElementById("formMessage");
  const passwordMessage = document.getElementById("passwordErrorList");
  const emptyFieldsList = document.getElementById("emptyFieldsList");
  // Clear old form errors.
  formMessage.innerHTML = "";
  emptyFieldsList.innerHTML = "";
  passwordMessage.innerHTML = "";

  // Return early if valid.
  if (invalidInputs.length === 0) {
    formMessage.innerHTML = '<span class="valid-message">Form submitted successfully!</span>';
    return;
  }
  //  Display password errors.
  if (passwordErrorMessageList.children.length > 0) {
    passwordMessage.innerHTML = passwordErrorMessageList.innerHTML;
  }
  // Display other errors.
  formMessage.innerHTML = '<span class="error-message">Please fill in all required fields correctly.</span>';

  invalidInputs.forEach((field) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = field.previousElementSibling.textContent.replace(":", "");
    listItem.onclick = () => field.focus();
    emptyFieldsList.appendChild(listItem);
  });
}
