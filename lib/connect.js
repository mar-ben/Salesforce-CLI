import axios from "axios";
import express from "express";
import open from "open";
import qs from "qs";
import { createHttpTerminator } from "http-terminator";
import keytar from "keytar";
import jsforce from "jsforce";

const SERVICE_NAME = "salesforceCLI";
const LOCAL_SERVER = "http://localhost:3000/";

const CLIENT_ID = "clientid";
const SECRET_CODE = "secretcode";
const REFRESH_TOKEN = "refreshtoken";
const ACCESS_TOKEN = "accesstoken";
const INSTANCE_URL = "instanceurl";
const REDIRECT_URI = "redirecturi";

process.send = process.send || function () {};

const authorize = async (keys) => {
  return new Promise((resolve, reject) => {
    let accessToken = "";
    let httpTerminator = "";
    //console.log(keys);
    let instanceUrl = "https://login.salesforce.com";
    if (keys.sandbox == "Y") {
      instanceUrl = "https://test.salesforce.com";
    }
    var app = express();
    app.get("/", (request, response) => {
      let options = {
        redirect_uri: "http://localhost:3000/authorize",
        client_id: keys.clientId,
        response_type: "code",
      };
      const url =
        instanceUrl +
        "/services/oauth2/authorize" +
        "?" +
        qs.stringify(options);
      //console.log(url);
      response.redirect(url);
    });

    app.get("/authorize", (request, response) => {
      //console.log("code=" + request.query.code);

      const queryParams = {
        code: request.query.code,
        client_id: keys.clientId,
        client_secret: keys.secretCode,
        grant_type: "authorization_code",
        redirect_uri: LOCAL_SERVER + "authorize",
      };

      const apiCall = axios
        .post(
          instanceUrl + "/services/oauth2/token?" + qs.stringify(queryParams)
        )
        .then(function (response) {
          console.log(response.data);
          accessToken = response.data.access_token;
          const refreshToken = response.data.refresh_token;
          instanceUrl = response.data.instance_url;
          keytar.setPassword(SERVICE_NAME, CLIENT_ID, keys.clientId);
          keytar.setPassword(SERVICE_NAME, SECRET_CODE, keys.secretCode);
          keytar.setPassword(SERVICE_NAME, ACCESS_TOKEN, accessToken);
          keytar.setPassword(SERVICE_NAME, INSTANCE_URL, instanceUrl);
          keytar.setPassword(SERVICE_NAME, REFRESH_TOKEN, refreshToken);
          httpTerminator.terminate();
          resolve({ accessToken, instanceUrl, refreshToken });
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    });

    const server = app.listen(3000, "localhost", function () {
      //console.log("Listening on 3000");
      open(LOCAL_SERVER);
    });

    httpTerminator = createHttpTerminator({
      server,
    });
  });
};

const getAccessKeys = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const instanceUrl = await keytar.getPassword(SERVICE_NAME, INSTANCE_URL);
      const clientId = await keytar.getPassword(SERVICE_NAME, CLIENT_ID);
      const refreshToken = await keytar.getPassword(
        SERVICE_NAME,
        REFRESH_TOKEN
      );
      const accessToken = await keytar.getPassword(SERVICE_NAME, ACCESS_TOKEN);
      const secretCode = await keytar.getPassword(SERVICE_NAME, SECRET_CODE);
      resolve({ accessToken, instanceUrl, refreshToken, clientId, secretCode });
    } catch (err) {
      reject(err);
    }
  });
};

const makeConnection = async () => {
  const accessKeys = await getAccessKeys();
  // console.log("keys received");
  return new jsforce.Connection({
    oauth2: {
      clientId: accessKeys.clientId,
      clientSecret: accessKeys.secretCode,
      redirectUri: "http://localhost:3000/authorize",
    },
    instanceUrl: accessKeys.instanceUrl,
    accessToken: accessKeys.accessToken,
    refreshToken: accessKeys.refreshToken,
  });
};

export default { authorize, getAccessKeys, makeConnection };
