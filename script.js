// Assignment Code
var generateBtn = document.querySelector("#generate");

//no spaces are included;
let specialCharacters = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
let passwordCriteria = [];
let passwordLength = 0;
let programQuit = false;
let password = [];
let prompts = ['uppercase letters', 'lowercase letters', 'numeric characters', 'special characters'];

let passwordCriteriaAlert = `Invalid password criteria
Password must include at least one of the following criteria
lowercase letters, uppercase letters, numeric characters, or special characters`;

generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  askForPasswordLength();
  askForPasswordCriteria();
  password = generatePassword();
  let passwordText = document.querySelector("#password");
  passwordText.value = password;
}

function generatePassword() {
  let index = 0;
  let choice = 0;
  let passwordAsArray = [];

  //This function garentees that there is a least 1 value of each requested character
  for (let i = 0; i < passwordCriteria.length; i++) {
    choice = passwordCriteria[i];
    passwordAsArray.push(addCharToPassword(choice));
  }

  //
  for (let i = passwordCriteria.length; i < passwordLength; i++) {
    index = generateNumber(passwordCriteria.length);
    choice = passwordCriteria[index];
    passwordAsArray.push(addCharToPassword(choice));
  }

  return passwordAsArray.join('');
}

function askForPasswordCriteria() {
  while (true) {
    passwordCriteriaPrompts();
    if (programQuit) break;
    else if (passwordCriteria.length > 0) break;
    else {
      passwordCriteria = [];
      alert(passwordCriteriaAlert);
    }
  }
}

function passwordCriteriaPrompts() {
  let questionNum = 0;

  while (questionNum < 4) {
    while (true) {
      let response = prompt(`Include ${prompts[questionNum]} in password? (y for yes, n for no, q to quit)`);
      response.toLowerCase();

      if (response === 'y') {
        passwordCriteria.push(questionNum);
        questionNum++;
        break;
      } else if (response === 'n') {
        questionNum++;
        break;
      } else if (response === 'q') {
        questionNum = 4;
        programQuit = true;
        location.reload();
        break;
      } else {
        alert('Invalid response, try again.')
      }
    }
  }
}

function askForPasswordLength() {
  while (true) {
    passwordLength = prompt('Enter the length of the password (Must be a number between 8 and 128)');
    if (passwordLength >= 8 && passwordLength <= 128) break;
    else alert('Invalid response.  Enter a number between 8 and 128.');
  }
}

function addCharToPassword(number) {
  if (number === 0) return getUppercaseLetter();
  else if (number === 1) return getLowercaseLetter();
  else if (number === 2) return generateNumber(10);
  else if (number === 3) return getSpecialCharacter();
}

function getLowercaseLetter() {
  return getUppercaseLetter().toLowerCase();
}

function getUppercaseLetter() {
  let randomNum = generateNumber(26) + 65;
  return String.fromCharCode(randomNum);
}

function getSpecialCharacter() {
  let randomNum = generateNumber(specialCharacters.length);
  return specialCharacters[randomNum];
}

function generateNumber(max) {
  return Math.floor(Math.random() * max);
}