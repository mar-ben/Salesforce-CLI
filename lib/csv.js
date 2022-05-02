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
        const file = process.cwd() + "/" + fileName;
        console.log("Output: " + file);
        file.writeFile(file, csv);
        resolve(csv);
      });
    } catch (e) {
      reject(e);
    }
  });
};

const csvToJson = (data, fileName) => {
  return new Promise((resolve, reject) => {
    try {
      csv2json(data, (err, csv) => {
        const currentDir = process.cwd();
        //console.log(csv);
        const file = process.cwd() + "/" + fileName;
        console.log("Output: " + file);
        try {
          fs.writeFileSync(file, csv);
        } catch (err) {
          reject(err);
        }
        resolve(csv);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default { csv };
