/*******************************************************************************
 * 
 * Element object declarations start here.
 * 
 ******************************************************************************/

const form = document.querySelector("form");

const email = document.querySelector(".email");
const userEmail = document.querySelector("#userEmail");

const phoneNumber = document.querySelector(".phone-number");
const userPhoneNumber = document.querySelector("#userPhoneNumber");

const password = document.querySelector(".password");
const userPassword = document.querySelector("#userPassword");

const confirmPassword = document.querySelector(".confirm-password");
const userConfirmPassword = document.querySelector("#confirmPassword");

const submitBtn = document.querySelector("button");

/*******************************************************************************
 * 
 * Variable declarations start here.
 * 
 ******************************************************************************/

const emailReg =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phoneNumberReg = /^\d{3}[\-]\d{3}[\-]\d{4}$/;

/*******************************************************************************
 * 
 * Function declarations start here.
 * 
 ******************************************************************************/

/**
 * Displays an error message if the user's input is invalid.
 * @param {object} input - Element object of input class.
 * @param {object} inputFormat - Element object of input's format.
 * @param {string} inputType - Name of input type.
 */
 function displayError(input, inputFormat, inputType) {
    const errorMessage = document.createElement("p");
    errorMessage.className = "error";
    errorMessage.textContent =
        inputType === "password" ? "Please make your password longer"
            : inputType === "confirm password" ? "* Passwords do not match"
            : `Please enter a valid ${inputType}`;
    errorMessage.style.fontSize = "0.7rem";
    errorMessage.style.color = "#de6133";
    input.appendChild(errorMessage);
    if (inputType !== "confirm password") {
        input.insertBefore(errorMessage, inputFormat);
    }
}

/**
 * Changes the border color to red and adds an error message if the
 * user's input is invalid.
 * @param {object} input - Element object of input class.
 * @param {object} inputFormat - Element object of input's format.
 * @param {string} inputType - Name of input type.
 * @param {object} userInput - Element object of user's text input.
 */
function displayInvalid(input, inputFormat, inputType, userInput) {
    userInput.style.border = "1px solid #de6133";
    if (inputType === "confirm password" && input.childElementCount < 3) {
        userPassword.style.border = "1px solid #de6133";
        displayError(input, inputFormat, inputType);
    }
    if (inputType !== "confirm password" && input.childElementCount < 4) {
        displayError(input, inputFormat, inputType);
    }
}

/**
 * Changes the border color to default and removes the error message
 * if the user's input is valid.
 * @param {object} inputFormat - Element object of input's format.
 * @param {object} userInput - Element object of user's text input.
 */
function displayValid(inputFormat, userInput) {
    if (userInput === document.activeElement) {
        userInput.style.border = "1px solid #67ac89";
    }
    if (inputFormat.previousElementSibling.matches(".error")) {
        inputFormat.previousElementSibling.remove();
    } else if (
        userInput === userConfirmPassword &&
        confirmPassword.lastElementChild.matches(".error")
    ) {
        userPassword.style.border = "1px solid #646464";
        inputFormat.remove();
    }
}

/**
 * Checks if inputs are invalid or not.
 * @param {object} input - Element object of input class.
 * @param {object} inputFormat - Element object of input's format.
 * @param {string} inputType - Name of input type.
 * @param {object} userInput - Element object of user's text input.
 * @param {*} condition - Condition to check input against.
 */
 function checkInput(input, inputFormat, inputType, userInput, condition) {
    if (inputType === "email address" || inputType === "phone number") {
        if (userInput.value && !condition.test(userInput.value)) {
            displayInvalid(input, inputFormat, inputType, userInput);
        } else displayValid(inputFormat, userInput);
    }
    if (inputType === "password") {
        if (userInput.value && condition) {
            displayInvalid(input, inputFormat, inputType, userInput);
        } else displayValid(inputFormat, userInput);
    }
    if (inputType === "confirm password") {
        if (!condition) {
            displayInvalid(input, inputFormat, inputType, userInput);
        } else displayValid(inputFormat, userInput);
    }
}

/*******************************************************************************
 * 
 * Event listeners start here.
 * 
 ******************************************************************************/

userEmail.addEventListener("keyup", e => {
    checkInput(
        email,
        email.lastElementChild,
        "email address",
        userEmail,
        emailReg
    );
});

userEmail.addEventListener("focus", e => {
    userEmail.style.border = "1px solid #67ac89";
});

userEmail.addEventListener("focusout", e => {
    if (email.lastElementChild.previousElementSibling.matches(".error")) {
        userEmail.style.border = "1px solid #de6133";
    } else userEmail.style.border = "1px solid #646464";
});

userPhoneNumber.addEventListener("keyup", e => {
    checkInput(
        phoneNumber,
        phoneNumber.lastElementChild,
        "phone number",
        userPhoneNumber,
        phoneNumberReg
    );
});

userPhoneNumber.addEventListener("focus", e => {
    userPhoneNumber.style.border = "1px solid #67ac89";
});

userPhoneNumber.addEventListener("focusout", e => {
    if (phoneNumber.lastElementChild.previousElementSibling.matches(".error")) {
        userPhoneNumber.style.border = "1px solid #de6133";
    } else userPhoneNumber.style.border = "1px solid #646464";
});

userPassword.addEventListener("keyup", e => {
    const isShort = userPassword.value.length < 8 ? true : false;
    checkInput(
        password,
        password.lastElementChild,
        "password",
        userPassword,
        isShort
    );
});

userPassword.addEventListener("focus", e => {
    userPassword.style.border = "1px solid #67ac89";
});

userPassword.addEventListener("focusout", e => {
    if (password.lastElementChild.previousElementSibling.matches(".error")) {
        userPassword.style.border = "1px solid #de6133";
    } else userPassword.style.border = "1px solid #646464";
});

confirmPassword.addEventListener("keyup", e => {
    const isMatch =
        userConfirmPassword.value === userPassword.value ? true : false;
    checkInput(
        confirmPassword,
        confirmPassword.lastElementChild,
        "confirm password",
        userConfirmPassword,
        isMatch
    );
});

userConfirmPassword.addEventListener("focus", e => {
    userConfirmPassword.style.border = "1px solid #67ac89";
});

userConfirmPassword.addEventListener("focusout", e => {
    if (confirmPassword.lastElementChild.matches(".error")) {
        userConfirmPassword.style.border = "1px solid #de6133";
    } else userConfirmPassword.style.border = "1px solid #646464";
});

submitBtn.addEventListener("submit", e => location.reload());