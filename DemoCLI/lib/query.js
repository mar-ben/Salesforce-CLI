import jsforce from "jsforce";
import keytar from "keytar";
import { Parser } from "json2csv";

const SERVICE_NAME = "salesforceCLI";

const CLIENT_ID = "apiurl";
const SECRET_CODE = "apikey";
const REFRESH_TOKEN = "refreshtoken";
const ACCESS_TOKEN = "authtoken";
const INSTANCE_URL = "instanceurl";
const REDIRECT_URI = "redirecturi";

const getAccessKeys = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const instanceUrl = await keytar.getPassword(SERVICE_NAME, INSTANCE_URL);
      const clientId = keytar.getPassword(SERVICE_NAME, CLIENT_ID);
      const refreshToken = keytar.getPassword(SERVICE_NAME, REFRESH_TOKEN);
      const accessToken = await keytar.getPassword(SERVICE_NAME, ACCESS_TOKEN);
      const secretCode = keytar.getPassword(SERVICE_NAME, SECRET_CODE);

      resolve({ accessToken, instanceUrl, refreshToken, clientId, secretCode });
    } catch (err) {
      reject(err);
    }
  });
};

const execute = (query, accessKeys) => {
  console.log("inside execute");
  return new Promise((resolve, reject) => {
    console.log("making connection");
    var conn = new jsforce.Connection({
      oauth2: {
        clientId: accessKeys.clientId,
        clientSecret: accessKeys.secretCode,
        redirectUri: "http://localhost:3000/authorize",
      },
      instanceUrl: accessKeys.instanceUrl,
      accessToken: accessKeys.accessToken,
      refreshToken: accessKeys.refreshToken,
    });

    var records = [];
    conn.query(query, function (err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);

      console.log("total : " + result.totalSize);
      console.log("fetched : " + result.records.length);
    });
  });
};
export default { execute, getAccessKeys };
