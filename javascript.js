/*******************************************************************************
 * 
 * Element object declarations start here.
 * 
 ******************************************************************************/

const email = document.querySelector(".email");
const emailFormat = email.lastElementChild;
const userEmail = document.querySelector("#userEmail");

const phoneNumber = document.querySelector(".phone-number");
const phoneNumberFormat = phoneNumber.lastElementChild;
const userPhoneNumber = document.querySelector("#userPhoneNumber");

const password = document.querySelector(".password");
const passwordFormat = password.lastElementChild;
const userPassword = document.querySelector("#userPassword");

const confirmPassword = document.querySelector("#confirmPassword");

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
 * Displays an error message and changes the input's border color to red
 * if the user's input is invalid.
 * @param {object} input - Element object of input class.
 * @param {object} inputFormat - Element object of input's format.
 * @param {string} inputType - Name of input type.
 */
 function displayError(input, inputFormat, inputType) {
    const errorMessage = document.createElement("p");
    errorMessage.className = "error";
    errorMessage.textContent =
        inputType === "password" ? "Please make your password longer"
            : `Please enter a valid ${inputType}`;
    errorMessage.style.fontSize = "0.7rem";
    errorMessage.style.color = "#de6133";
    input.appendChild(errorMessage);
    input.insertBefore(errorMessage, inputFormat);
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
    if (input.childElementCount < 4) {
        displayError(input, inputFormat, inputType);
    }
}

/**
 * .Changes the border color to default and removes the error message
 * if the user's input is valid.
 * @param {object} inputFormat - Element object of input's format.
 * @param {object} userInput - Element object of user's text input.
 */
function displayValid(inputFormat, userInput) {
    userInput.style.border = "1px solid #646464";
    if (inputFormat.previousElementSibling.matches(".error")) {
        inputFormat.previousElementSibling.remove();
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
    if (typeof(condition) === "object") {
        if (userInput.value && !condition.test(userInput.value)) {
            displayInvalid(input, inputFormat, inputType, userInput);
        } else displayValid(inputFormat, userInput);
    } else {
        if (userInput.value && condition) {
            displayInvalid(input, inputFormat, inputType, userInput);
        } else displayValid(inputFormat, userInput);
    }
}

/*******************************************************************************
 * 
 * Event listeners start here.
 * 
 ******************************************************************************/

userEmail.addEventListener("keyup", e => 
    checkInput(email, emailFormat, "email address", userEmail, emailReg)
);

userPhoneNumber.addEventListener("keyup", e =>
    checkInput(
        phoneNumber,
        phoneNumberFormat,
        "phone number",
        userPhoneNumber,
        phoneNumberReg
    )
);

userPassword.addEventListener("keyup", e => {
    const isShort = userPassword.value.length < 8 ? true : false;
    checkInput(
        password,
        passwordFormat,
        "password",
        userPassword,
        isShort
    )
});

submitBtn.addEventListener("submit", e => location.reload());