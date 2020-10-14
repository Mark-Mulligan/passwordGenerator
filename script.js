// Assignment Code
var generateBtn = document.querySelector("#generate");

//no spaces are included;
let specialCharacters = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
let passwordCriteria = [];
let passwordLength = 0;
let correctStructure = false;
let programQuit = false;
let prompts = ['special characters', 'numeric characters', 'lowercase letters', 'uppercase letters'];

function passwordCriteriaPrompts() {
  let questionsLeft = 4;

  while (questionsLeft > 0) {
    while (true) {
      let response = prompt(`Include ${prompts[questionsLeft - 1]} in password? (y for yes, n for no, q to quit)`);
      if (response === 'y' || response === 'n') {
        passwordCriteria.push(response);
        questionsLeft--;
        break;
      } else if (response === 'q') {
        questionsLeft = 0;
        programQuit = true;
        location.reload();
        break;
      } else {
        alert('Invalid response, try again.')
      }
    }
  }
}

function passwordLengthPrompt() {
  while (true) {
    passwordLength = prompt('Enter the length of the password (Must be a number between 8 and 128)');
    if (passwordLength >= 8 && passwordLength <= 128) {
      break;
    } else {
      alert('Invalid response, please try again');
    }
  }
}

// Write password to the #password input
function writePassword() {

  passwordLengthPrompt();

  while (!correctStructure) {
    passwordCriteriaPrompts();
    if (programQuit) {
      break;
    } else if (passwordCriteria.includes('y')) {
      correctStructure = true;
    } else {
      passwordCriteria = [];
      alert(` Invalid password criteria
      Password must include at least one of the following criteria
      lowercase letters, uppercase letters, numeric characters, or special characters`);
    }
  }

  console.log(passwordLength);
  console.log(passwordCriteria);
  getSpecialCharacter();

  //var password = generatePassword();
  //var passwordText = document.querySelector("#password");

  //passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

/* QUESTIONS ASKED FOR USER

How many characters (between 8 and 128);
What charcters included in password (uppercase, lowercase, numeric, special characters);

*/

console.log(generateNumber(10));

function getLowercaseLetter () {

}

function getUppercaseLEtter () {

}

function getSpecialCharacter () {
  let randomNum = generateNumber(specialCharacters.length);
  let result = specialCharacters[randomNum];
  console.log(result);
}

function generateNumber(max) {
  return Math.floor(Math.random() * max);
}