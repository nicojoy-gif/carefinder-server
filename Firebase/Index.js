const admin = require('firebase-admin');
const serviceAccount = require('./carefinder-65852-firebase-adminsdk-842dw-19d0e9beb2.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  
});
module.exports = admin;