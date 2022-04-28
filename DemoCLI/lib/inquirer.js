//const inquirer = require("inquirer");
import inquirer from "inquirer";

const validationInputSandbox = (value) => {
  if (value !== "N" && value !== "Y") {
    return "Enter a valid input";
  }
  return true;
};

const askUserforCredentials = async () => {
  let keys = {};
  await inquirer
    .prompt([
      { name: "clientId", message: "Enter client id", type: "input" },
      { name: "secretCode", message: "Enter secret code", type: "input" },
      {
        name: "sandbox",
        message: "sandbox (Y/N)",
        type: "input",
        validate: validationInputSandbox,
      },
    ])
    .then((answers) => {
      //console.log(answers.clientId);
      //console.log(answers.secretCode);
      //console.log(answers.sandbox);
      keys = answers;
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
  return keys;
};
export default { askUserforCredentials };
