var jsforce = require("jsforce");

module.exports = {
  connect: (keys) => {
    let instanceUrl = "https://www.login.salesforce.com";
    if (keys.sandbox == "Y") {
      instanceUrl = "https://www.test.salesforce.com";
    }

    var connection = new jsforce.Connection({
      oauth2: {
        clientId: keys.clientId,
        clientSecret: keys.secretCode,
        redirectUri: "https://localhost/test",
      },
      instanceUrl: instanceUrl,
      accessToken: keys.accessToken,
      refreshToken: keys.refreshToken,
    });
    return connection;
  },
};
