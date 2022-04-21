#! /usr/bin/env node
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { askUserforCredentials } = require("./lib/inquirer");
const {connect} =require("./lib/login")
clear();

console.log(
  chalk.yellow(figlet.textSync("SF  CLI", { horizontalLayout: "full" }))
);

const login = async () => {
  const keys = await askUserforCredentials();
  const response = await connect();
  
}


const argv = yargs(hideBin(process.argv)).argv;
console.log(argv);
if (argv.connect) {
 
  if (options.connect) {
//   console.log("connect here");
// }

// const { exec } = require("child_process");
// exec(
//   "sfdx auth:web:login --instanceurl https://test.salesforce.com",
//   (err, stdout, stderr) => {
//     if (err) {
//       // node couldn't execute the command

//       console.log(err);
//       return;
//     }

//     // the *entire* stdout and stderr (buffered)

//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
//   }
//);
