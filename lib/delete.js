import fs from "fs";
import csv from "./csv.js";
import file from "./file.js";
import connect from "./connect.js";
import { json } from "express";

const deleteRecords = async (objectName, fileName) => {
  const conn = await connect.makeConnection();
  const jsonData = await csv.csvToJson(fileName);
  console.log(jsonData);
  const formattedData = jsonData.map((item) => item.Id);
  console.log(formattedData);
  return new Promise((resolve, reject) => {
    conn.sobject(objectName).del(formattedData, function (err, rets) {
      if (err) {
        console.log(err);
        return console.error(err);
        reject(err);
      }
      console.log(rets);
      for (var i = 0; i < rets.length; i++) {
        if (rets[i].success) {
          console.log("Deleted Successfully : " + rets[i].id);
        } else {
          console.log("Deleted failed : " + JSON.stringify(rets[i].errors));
        }
      }
      resolve(rets);
    });
  });
};

export default { deleteRecords };
