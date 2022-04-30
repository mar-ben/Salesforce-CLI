import jsforce from "jsforce";

var conn = new jsforce.Connection({
  instanceUrl: "https://gitub-dev-ed.my.salesforce.com",
  accessToken:
    "00D5e000001NjlD!ARMAQAUqNneNxhCellf5Ydtkpw2bUWgf48qtKSPpzhjQMWqOoRHs6CDbZkfVEuiXe1YdPT32eLJf1hwvowUAibs3cQUY4Mxn",
  refreshToken:
    "5Aep861ZBValxWWBUdmmHKNWwpPYh87ogvmr18YtP3IlBiQzxBdcZEe8X85ExxfVc5Su5BuygzAo1N6km8aCxjy",
});

// import keytar from "keytar";

// const API_URL = "apiurl";
// const AUTH_KEY = "apikey";
// const LOCAL_SERVER = "http://localhost:3000/";
// const SERVICE_NAME = "salesforceCLI";

// const getKeys = async () => {
//   const keys = await Promise((error, resolve) => {
//     const authToken = await keytar.getPassword(SERVICE_NAME, AUTH_KEY);
//     const instanceUrl =await  keytar.getPassword(SERVICE_NAME, API_URL);
//     resolve(authToken);
//   });
//   return keys;
// };
