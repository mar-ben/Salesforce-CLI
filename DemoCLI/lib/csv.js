import converter from "json-2-csv";
import fs from "fs";
const { json2csv } = converter;
const csv = (data, fileName) => {
  return new Promise((resolve, reject) => {
    try {
      json2csv(data, (err, csv) => {
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
