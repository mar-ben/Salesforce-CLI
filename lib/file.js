import fs from "fs";
const readFile = (fileName) => {
  const fileContent = fs.readFileSync("./" + fileName, {
    encoding: "utf8",
    flag: "r",
  });
  return fileContent;
};

const writeFile = (fileName, data) => {
  fs.writeFileSync(fileName, data, (err) => {
    if (err) {
      console.error(err);
    }
  });
};
export default { readFile, writeFile };
