/* ----- GLOBAL VARIABLES ----- */
let specialCharacters = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
let passwordCriteria = [];
let passwordLength = 0;
let programQuit = false;
let password = [];
let prompts = ['uppercase letters', 'lowercase letters', 'numeric characters', 'special characters'];
let passwordCriteriaAlert = `Invalid password criteria
Password must include at least one of the following criteria
lowercase letters, uppercase letters, numeric characters, or special characters`;

/* ----- SELECTED HTML ELEMENTS ----- */
var generateBtn = document.querySelector("#generate");
let passwordText = document.querySelector("#password");

/* ----- EVENT LISTENERS ----- */
generateBtn.addEventListener("click", writePassword);

/* ----- MAIN FUNCTION TO GENERATE PASSWORD ----- */
function writePassword() {
  resetData();
  askForPasswordLength();
  askForPasswordCriteria();
  password = generatePassword();
  passwordText.value += password;
}

/* ----- FUNCTIONS LISTED IN ORDER THEY ARE CALLED BY WRITEPASSWORD ----- */
function resetData() {
  passwordCriteria = [];
  passwordLength = 0;
  password = [];
}

function askForPasswordLength() {
  while (true) {
    passwordLength = prompt('Enter the length of the password (Must be a number between 8 and 128)');
    if (passwordLength >= 8 && passwordLength <= 128) break;
    else alert('Invalid response.  Enter a number between 8 and 128.');
  }
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

/* ----- SUB FUNCTION FOR ASKFORPASSWORDCRITERIA ----- */
function passwordCriteriaPrompts() {
  let questionNum = 0;

  while (questionNum < 4) {
    while (true) {
      let response = (prompt(`Include ${prompts[questionNum]} in password? (y for yes, n for no, q to quit)`)).toLowerCase();

      if (response === 'q') {
        questionNum = 4;
        programQuit = true;
        location.reload();
        break;
      } else if (response === 'y' || response === 'n') {
          if (response === 'y') passwordCriteria.push(questionNum);
          break;
      } else alert('Invalid response, try again.');
    }
    questionNum++;
  }
}

function generatePassword() {
  let index = 0;
  let choice = 0;
  let passwordAsArray = [];

  //Generates at least one of each character based on user criteria
  passwordCriteria.forEach((criteria) => passwordAsArray.push(addCharToPassword(criteria)));

  //randomly selects the rest of the characters from the possible criteria laid out by the user
  for (let i = passwordCriteria.length; i < passwordLength; i++) {
    index = generateNumber(passwordCriteria.length);
    passwordAsArray.push(addCharToPassword(passwordCriteria[index]));
  }
  /* The two functions above guarentee that all inputs from the user criteria occur in the password at least once
  For example, if the password includes all input types, then the 1st 4 characters of the array will be a uppercase letter,
  a lower case, letter, a number, and then a value.  All additionall characters will be randomly selected form the criteria. */
  return passwordAsArray.join('');
}

/* ----- SUB FUNCTIONS TO GENERATE PASSWORD ----- */
function addCharToPassword(number) {
  if (number === 0) return getUppercaseLetter();
  else if (number === 1) return getLowercaseLetter();
  else if (number === 2) return generateNumber(10);
  else if (number === 3) return getSpecialCharacter();
}

function getUppercaseLetter() {
  let randomNum = generateNumber(26) + 65;
  return String.fromCharCode(randomNum);
}

function getLowercaseLetter() {
  return getUppercaseLetter().toLowerCase();
}

function getSpecialCharacter() {
  let randomNum = generateNumber(specialCharacters.length);
  return specialCharacters[randomNum];
}

function generateNumber(max) {
  return Math.floor(Math.random() * max);
}