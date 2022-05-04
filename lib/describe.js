import fs from "fs";
import csv from "./csv.js";
import file from "./file.js";
import Table from "cli-table";
import connect from "./connect.js";

const describeObject = async (objectName) => {
  const conn = await connect.makeConnection();

  return new Promise((resolve, reject) => {
    conn.sobject(objectName).describe(function (err, meta) {
      if (err) {
        return console.error(err);
      }
      const table = new Table({ head: ["Label", "API Name"] });

      for (const field of meta.fields) {
        table.push([field.label, field.name]);
      }
      console.log(table.toString());
    });
  });
};

export default { describeObject };
