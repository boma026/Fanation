// backend/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./fanation-7b52b-firebase-adminsdk-fbsvc-a6a6b89509.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://fanation-7b52b.firebasestorage.app'
});

const bucket = admin.storage().bucket();

module.exports = bucket;
