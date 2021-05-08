const GOOGLE_CREDS = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const serviceAccount = require(GOOGLE_CREDS);
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const messaging = admin.messaging();

module.exports = {
  messaging
}