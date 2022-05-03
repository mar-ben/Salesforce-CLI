import fs from "fs";
import csv from "./csv.js";
import file from "./file.js";
import connect from "./connect.js";

const updateRecords = async (objectName, fileName) => {
  const conn = await connect.makeConnection();
  const jsonData = await csv.csvToJson(fileName);
  console.log(jsonData);
  return new Promise((resolve, reject) => {
    conn.sobject(objectName).update(jsonData, function (err, rets) {
      if (err) {
        return console.error(err);
        reject(err);
      }
      for (var i = 0; i < rets.length; i++) {
        if (rets[i].success) {
          console.log("Updated Successfully : " + rets[i].id);
        }
      }
      resolve(rets);
    });
  });
};

export default { updateRecords };
