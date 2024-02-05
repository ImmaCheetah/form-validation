import { container } from "webpack";
import "./style.css";

function checkZIP() {
  const constraints = {
    ca: [
      "^[ABCEGHJKLMNPRSTVXY]\\d[ABCEGHJKLMNPRSTVWXYZ] \\d[ABCEGHJKLMNPRSTVWXYZ]\\d$",
      "Canada ZIPs must follow the format: A1A 1A1",
    ],
    us: [
      "^\\d{5}(-\\d{4})?$",
      "USA ZIPs must have either 5 digits or 9 digits with a hyphen: e.g. 12345 or 12345-6789",
    ],
    br: ["^\\d{5}-\\d{3}$", "Brazil ZIPs must follow the format: 12345-678"],
    sk: [
      "^\\d{5}(-\\d{4})?$",
      "South Korea ZIPs must have either 5 digits or 9 digits with a hyphen: e.g. 12345 or 12345-6789",
    ],
  };
  const country = document.getElementById("form-country").value;
  const ZIPCode = document.getElementById("form-zip");
  
  const constraint = new RegExp(constraints[country][0], "");
  
  if (constraint.test(ZIPCode.value)) {
        ZIPCode.setCustomValidity("");
        ZIPError.textContent = "";
    } else {
        ZIPError.textContent = (constraints[country][1]);
        ZIPError.className = "error";
    }
}

const form = document.getElementById("main-form");
const email = document.getElementById("form-email");
const country = document.getElementById("form-country")
const ZIPCode = document.getElementById("form-zip");
const pwd = document.getElementById("form-pwd");
const pwdConfirm = document.getElementById("form-pwd-confirm");

const emailError = document.querySelector("#form-email + span.error");
const ZIPError = document.querySelector("#form-zip + span.error");
const pwdError = document.querySelector("#form-pwd + span.error");
const pwdConfirmError = document.querySelector("#form-pwd-confirm + span.error");


function checkPwd() {
    const pwdRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (pwdRegex.test(pwd.value)) {
        pwd.setCustomValidity("");
        pwdError.textContent = "";
    } else if (pwd.validity.valueMissing) {
        pwdError.textContent = "Gotcha, enter something";
    } else {
        pwdError.textContent = "Password must have at least 6 characters, 1 digit and 1 special character";
        pwdError.className = "error";
    }
}

function checkPwdConfirm() {
    if (pwd.value === pwdConfirm.value) {
        pwdConfirm.setCustomValidity("");
        pwdConfirmError.textContent = "";
    } else if (pwdConfirm.validity.valueMissing) {
        pwdConfirmError.textContent = "Gotcha, enter something";
    } else {
        pwdConfirmError.textContent = "Passwords don't match!";
        pwdConfirmError.className = "error";
    }
}

function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "Gotcha, enter something";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = `That's not email format`;
  }
//   emailError.className = "error active";
}

form.addEventListener("submit", (e) => {

    // if (!email.validity.valid) {
    //     showEmailError();
    // } else if (!ZIPCode.validity.valid) {
    //     checkZIP();
    // } else if (!pwd.validity.valid) {
    //     checkPwd();
    // } else if (!pwdConfirm.validity.valid) {
    //     checkPwdConfirm();
    // }
    if (!form.checkValidity()) {
        showEmailError();
        checkZIP();
        checkPwd();
        checkPwdConfirm();
    } else {
        // const message = document.createElement('h1');
        // const container = document.querySelector('.container');
        // message.textContent = 'Good job';

        // container.appendChild(message);
    }
    
    e.preventDefault();

});


country.addEventListener("change", checkZIP);
ZIPCode.addEventListener("input", checkZIP);
pwd.addEventListener('input', checkPwd);
pwdConfirm.addEventListener('input', checkPwdConfirm);

email.addEventListener("input", (e) => {
  if (email.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
    console.log("its valid");
  } else {
    showEmailError();
  }
});


