const admin = require("firebase-admin");

// We'll add the service account key later
//const serviceAccount = require("./firebase-service-account.json");

//admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//});

module.exports = admin;