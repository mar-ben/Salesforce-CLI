import fs from "fs";
import csv from "./csv.js";
import file from "./file.js";
import connect from "./connect.js";

const insertRecords = async (objectName, fileName) => {
  const conn = await connect.makeConnection();
  const jsonData = await csv.csvToJson(fileName);
  //console.log(jsonData);
  return new Promise((resolve, reject) => {
    conn.sobject(objectName).create(jsonData, function (err, rets) {
      if (err) {
        return console.error(err);
      }
      for (var i = 0; i < rets.length; i++) {
        if (rets[i].success) {
          console.log("Created record id : " + rets[i].id);
        }
      }
      // ...
    });
  });
};

export default { insertRecords };
