import fs from "fs";
import csv from "./csv.js";
import file from "./file.js";
import connect from "./connect.js";

const upsertRecords = async (objectName, fileName, externalIdFieldName) => {
  const conn = await connect.makeConnection();
  const jsonData = await csv.csvToJson(fileName);
  console.log(jsonData);
  return new Promise((resolve, reject) => {
    conn
      .sobject(objectName)
      .upsert(
        jsonData,
        externalIdFieldName,
        { allOrNone: true },
        function (err, rets) {
          if (err) {
            reject(err);
            return console.error(err);
          }
          for (var i = 0; i < rets.length; i++) {
            if (rets[i].success) {
              console.log("Upserted Successfully");
            } else {
              console.log("Upsert failed : " + JSON.stringify(rets[i].errors));
            }
          }
          resolve(rets);
          // ...
        }
      );
  });
};

export default { upsertRecords };
