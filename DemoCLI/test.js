import yargs from "yargs";

const argv = yargs(process.argv);
console.log(JSON.stringify(argv));
console.log(argv.argv.soql);
