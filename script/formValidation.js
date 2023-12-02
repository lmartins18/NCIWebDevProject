// Function to validate input fields (non-checkbox)
function validateInput(field) {
  const input = document.getElementById(field);
  // Add or remove 'valid' and 'error' classes based on input value
  input.classList.toggle("valid", input.value.trim() !== "");
  input.classList.toggle("error", input.value.trim() === "");
}

// Function to validate a checkbox field
function validateCheckbox(field) {
  const input = document.getElementById(field);
  // Add or remove 'valid' and 'error' classes based on checkbox state
  input.classList.toggle("valid", input.checked);
  input.classList.toggle("error", !input.checked);
}

// Function to validate password fields
function validatePassword(fieldOne, fieldTwo) {
  // Get password and confirm password inputs
  const passwordInput = document.getElementById(fieldOne);
  const confirmPasswordInput = document.getElementById(fieldTwo);
  
  // Get text values from inputs
  const passwordText = passwordInput.value;
  const confirmPasswordText = confirmPasswordInput.value;

  // Validation criteria
  const passwordsMatch = passwordText === confirmPasswordText;
  const isLengthValid = passwordText.length >= 8;
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(passwordText);
  const hasNumber = /\d/.test(passwordText);

  // Check if password is valid and toggle classes accordingly
  const isPasswordValid = isLengthValid && hasSpecialCharacter && passwordsMatch && hasNumber;
  [passwordInput, confirmPasswordInput].forEach((input) => {
    input.classList.toggle("valid", isPasswordValid);
    input.classList.toggle("error", !isPasswordValid);
  });

  // Return validation results
  return { passwordsMatch, isLengthValid, hasSpecialCharacter, hasNumber };
}

// Function to display password validation errors
function passwordErrors({
  passwordsMatch,
  isLengthValid,
  hasSpecialCharacter,
  hasNumber,
}) {
  const ulElement = document.createElement("ul");

  // Add error messages based on validation results
  if (!passwordsMatch) appendErrorMessage(ulElement, "Passwords must match.");
  if (!isLengthValid) appendErrorMessage(ulElement, "Password must be at least 8 characters long.");
  if (!hasSpecialCharacter) appendErrorMessage(ulElement, "Password must contain at least one special character.");
  if (!hasNumber) appendErrorMessage(ulElement, "Password must contain at least one number.");

  return ulElement;
}

// Function to append error messages to a list element
function appendErrorMessage(ulElement, message) {
  const liElement = document.createElement("li");
  liElement.textContent = message;
  ulElement.appendChild(liElement);
}

// Function to validate a phone number input
function validatePhoneNumber(field) {
  const input = document.getElementById(field);
  // Phone number regex from: https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript 
  const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  const validPhoneNumber = phoneNumberRegex.test(input.value);

  // Toggle 'valid' and 'error' classes based on phone number validity
  input.classList.toggle("valid", validPhoneNumber);
  input.classList.toggle("error", !validPhoneNumber);
}

// Function to validate the entire form
function validateForm() {
  // Prevent form submission
  event.preventDefault();

  // Validate specific fields
  ["firstName", "lastName", "email", "dob", "membership"].forEach(validateInput);
  validatePhoneNumber("phoneNumber");
  validateCheckbox("terms");

  // Validate password and get error messages
  const passwordValidation = validatePassword("password", "confirmPassword");
  const passwordErrorMessageList = passwordErrors(passwordValidation);

  // Get elements for displaying form errors
  const invalidInputs = document.querySelectorAll(".error");
  const formMessage = document.getElementById("formMessage");
  const passwordMessage = document.getElementById("passwordErrorList");
  const emptyFieldsList = document.getElementById("emptyFieldsList");

  // Clear previous error messages
  formMessage.innerHTML = "";
  emptyFieldsList.innerHTML = "";
  passwordMessage.innerHTML = "";

  // If all fields are valid, display success message and navigate to success screen
  if (invalidInputs.length === 0) {
    formMessage.innerHTML = '<span class="text-green-500 mt-3">Form submitted successfully!</span>';
    setTimeout(() => {
      document.getElementById("registration-form").classList.toggle("hidden");
      document.getElementById("success-screen").classList.toggle("hidden");
    }, 500);
    return;
  }

  // If there are password errors, display them
  if (passwordErrorMessageList.children.length > 0) {
    passwordMessage.innerHTML = passwordErrorMessageList.innerHTML;
  }

  // Display a generic error message for other fields
  formMessage.innerHTML = '<span class="error-message">Please fill in all required fields correctly.</span>';

  // Display a list of fields with errors
  invalidInputs.forEach((field) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = field.previousElementSibling.textContent.replace(":", "");
    listItem.onclick = () => field.focus();
    emptyFieldsList.appendChild(listItem);
  });
}
