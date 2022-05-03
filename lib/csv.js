import converter from "json-2-csv";
const { json2csv, csv2json } = converter;
import fs from "fs";
import file from "./file.js";
const csv = (data, fileName) => {
  return new Promise((resolve, reject) => {
    try {
      json2csv(data, (err, csv) => {
        const currentDir = process.cwd();
        //console.log(csv);
        const filePath = process.cwd() + "/" + fileName;
        console.log("Output: " + filePath);
        file.writeFile(filePath, csv);
        resolve(csv);
      });
    } catch (e) {
      reject(e);
    }
  });
};

const csvToJson = (fileName) => {
  return new Promise((resolve, reject) => {
    try {
      const csvData = file.readFile(fileName);
      csv2json(csvData, (err, json) => {
        resolve(json);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default { csv, csvToJson };
