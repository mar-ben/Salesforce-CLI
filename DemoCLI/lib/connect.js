//var axios = require("axios");
// express = require("express");
// const open = require("open");
// const qs = require("qs");
// const httpTerminator = require("http-terminator");
import axios from "axios";
import express from "express";
import open from "open";
import qs from "qs";
import { createHttpTerminator } from "http-terminator";

process.send = process.send || function () {};

const connect = async (keys) => {
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
        scope: "api",
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
        redirect_uri: "http://localhost:3000/authorize",
      };

      const apiCall = axios
        .post(
          "https://login.salesforce.com/services/oauth2/token?" +
            qs.stringify(queryParams)
        )
        .then(function (response) {
          accessToken = response.data.access_token;
          //console.log(accessToken);

          httpTerminator.terminate();
          resolve(accessToken);
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
      open("http://localhost:3000");
    });

    httpTerminator = createHttpTerminator({
      server,
    });
  });
};
export default { connect };
