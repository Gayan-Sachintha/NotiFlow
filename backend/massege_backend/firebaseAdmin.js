const { ref, onValue } = require('firebase/database');
const { initializeApp } = require("firebase/app");
const { getDatabase } = require('firebase/database');
const fs = require('fs');

const firebaseConfig = JSON.parse(fs.readFileSync('./key/firebase_key.json'));

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

onValue(ref(database, '.info/connected'), (snapshot) => {
  if (snapshot.val() === true) {
    console.log('Firebase connection successful!');
  } else {
    console.log('Firebase connection lost!');
  }
});

module.exports = {
  app,
  database
};
