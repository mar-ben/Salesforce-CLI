import fs from "fs";
import file from "./file.js";

const insertRecords = (objectName, fileName) => {
  return new Promise((resolve, reject) => {
    const content = file.readFile(fileName);
  });

  conn
    .sobject(objectName)
    .create(
      [{ Name: "My Account #1" }, { Name: "My Account #2" }],
      function (err, rets) {
        if (err) {
          return console.error(err);
        }
        for (var i = 0; i < rets.length; i++) {
          if (rets[i].success) {
            console.log("Created record id : " + rets[i].id);
          }
        }
        // ...
      }
    );
};

export default { insertRecords };
