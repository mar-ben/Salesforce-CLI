const inquirer = require("inquirer");

const validationInputSandbox = (value) => {
  if (value !== "N" && value !== "Y") {
    return "Enter a valid input";
  }
  return true;
};
module.exports = {
  askUserforCredentials: async () => {
    let keys = {};
    await inquirer
      .prompt([
        { name: "clientId", message: "Enter client id", type: "input" },
        { name: "secretCode", message: "Enter secret code", type: "input" },
        { name: "refreshToken", message: "Enter RefreshToken", type: "input" },
        { name: "accessToken", message: "Enter AccessToken", type: "input" },
        {
          name: "sandbox",
          message: "sandbox (Y/N)",
          type: "input",
          validate: validationInputSandbox,
        },
      ])
      .then((answers) => {
        console.log(answers.clientId);
        console.log(answers.secretCode);
        console.log(answers.refreshToken);
        console.log(answers.sandbox);
        console.log(answers.accessToken);
        keys = answers;
        // Use user feedback for... whatever!!
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
    return keys;
  },
};
