#! /usr/bin/env node
// import chalk from "chalk"
// const clear = require("clear");
// const figlet = require("figlet");
// const yargs = require("yargs/yargs");
// const { hideBin } = require("yargs/helpers");
// const { askUserforCredentials } = require("./lib/inquirer");
// const { connect } = require("./lib/connect");
// const { exec } = require("child_process");
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import yargs from "yargs";
import hideBin from "yargs";
import askUserforCredentials from "./lib/inquirer.js";
import connect from "./lib/connect.js";

clear();

console.log(
  chalk.yellow(figlet.textSync("SF  CLI", { horizontalLayout: "full" }))
);

const login = async () => {
  const keys = await askUserforCredentials.askUserforCredentials();
  const response = await connect.connect(keys);
  //console.log(response);
  clear();
  if (response) {
    console.log("salesforce org is connected");
  }
};

const run = async () => {};

const argv = yargs(process.argv).argv;
//console.log(argv);
if (argv.connect) {
  console.log("connect");
  login();
}
