import jsforce from "jsforce";
import keytar from "keytar";
import connect from "./connect.js";

const execute = (query, accessKeys) => {
  //console.log("inside execute");
  return new Promise((resolve, reject) => {
    const conn = connect.makeConnection(accessKeys);
    var records = [];
    conn.query(query, function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);
    });
  });
};
export default { execute };
