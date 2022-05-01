#! /usr/bin/env node
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import yargs from "yargs";
import hideBin from "yargs";
import askUserforCredentials from "./lib/inquirer.js";
import connect from "./lib/connect.js";
import jsforce from "jsforce";
import query from "./lib/query.js";
import keytar from "keytar";
import csv from "./lib/csv.js";
//clear();

const API_URL = "apiurl";
const AUTH_KEY = "apikey";
const LOCAL_SERVER = "http://localhost:3000/";
const SERVICE_NAME = "salesforceCLI";

console.log(
  chalk.yellow(figlet.textSync("SF  CLI", { horizontalLayout: "full" }))
);

const login = async () => {
  const keys = await askUserforCredentials.askUserforCredentials();
  const response = await connect.connect(keys);
  //console.log(response);

  if (response) {
    console.log(response);
    console.log("salesforce org is connected");
  }
};

const executeQuery = async (soql, fileName) => {
  try {
    const keys = await query.getAccessKeys();
    const result = await query.execute(soql, keys);
    //console.log("query result");
    //console.log(JSON.stringify(result));
    console.log("total records :" + result.totalSize);
    result.records.forEach((item) => {
      delete item.attributes;
    });
    csv.csv(result.records, fileName);
  } catch (err) {
    console.log(err);
  }
};

const argv = yargs(process.argv).argv;
const argv2 = yargs(process.argv).argv._[2];

if (argv2 == "connect") {
  login();
}

if (argv2 == "query") {
  const soql = argv.soql;
  const fileName = argv.file;
  if (!soql) {
    console.log("Please input soql");
    process.exit(0);
  }
  if (!fileName) {
    console.log("please input fileName");
    process.exit(0);
  }
  executeQuery(soql, fileName);
}
// const argv = yargs(process.argv).argv;
// console.log(argv);
// if (argv.connect) {
//   console.log("connect");
//   //login();
// // }

// const argv = yargs(hideBin(process.argv))
//   .scriptName("salesforce")
//   .usage("salesforce connect")
//   .options("W");
