#! /usr/bin/env node
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import yargs from "yargs";
import askUserforCredentials from "./lib/inquirer.js";
import connect from "./lib/connect.js";
import query from "./lib/query.js";
import csv from "./lib/csv.js";
import insert from "./lib/insert.js";
import update from "./lib/update.js";
import upsert from "./lib/upsert.js";
import del from "./lib/delete.js";
import desc from "./lib/describe.js";
clear();

const API_URL = "apiurl";
const AUTH_KEY = "apikey";
const LOCAL_SERVER = "http://localhost:3000/";
const SERVICE_NAME = "salesforceCLI";

console.log(
  chalk.yellow(figlet.textSync("SF  CLI", { horizontalLayout: "full" }))
);

const login = async () => {
  const keys = await askUserforCredentials.askUserforCredentials();
  const response = await connect.authorize(keys);
  //console.log(response);

  if (response) {
    console.log(response);
    console.log("salesforce org is connected");
  }
};

const executeQuery = async (soql, fileName) => {
  try {
    const result = await query.execute(soql);
    //console.log("query result");
    //console.log(JSON.stringify(result));
    console.log("Total records :" + result.totalSize);
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
//salesforce query --soql=
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

if (argv2 == "insert") {
  const object = argv.object;
  const file = argv.file;
  if (!file) {
    console.log("Please input fileName");
    process.exit(0);
  }
  if (!object) {
    console.log("Please input object API Name");
    process.exit(0);
  }
  insert.insertRecords(object, file);
}
if (argv2 == "update") {
  const object = argv.object;
  const file = argv.file;
  if (!file) {
    console.log("Please input fileName");
    process.exit(0);
  }
  if (!object) {
    console.log("Please input object API Name");
    process.exit(0);
  }
  update.updateRecords(object, file);
}
if (argv2 == "update") {
  const object = argv.object;
  const file = argv.file;
  if (!file) {
    console.log("Please input fileName");
    process.exit(0);
  }
  if (!object) {
    console.log("Please input object API Name");
    process.exit(0);
  }
  update.updateRecords(object, file);
}

if (argv2 == "delete") {
  const object = argv.object;
  const file = argv.file;
  if (!file) {
    console.log("Please input fileName");
    process.exit(0);
  }
  if (!object) {
    console.log("Please input object API Name");
    process.exit(0);
  }
  del.deleteRecords(object, file);
}

if (argv2 == "upsert") {
  const object = argv.object;
  const file = argv.file;
  const extId = argv.extId;
  if (!file) {
    console.log("Please input file");
    process.exit(0);
  }
  if (!object) {
    console.log("Please input object");
    process.exit(0);
  }
  if (!extId) {
    console.log("Please input  extId");
    process.exit(0);
  }
  upsert.upsertRecords(object, file, extId);
}

if (argv2 == "desc") {
  const object = argv.object;

  if (!object) {
    console.log("Please input object");
    process.exit(0);
  }
  desc.describeObject(object);
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
