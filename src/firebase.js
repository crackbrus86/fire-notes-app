import firebase from "firebase";

var config = {
    apiKey: "AIzaSyASG9dA6Cnf-y5EoTh28MvP-t5zyTTrwxU",
    authDomain: "fire-notes-e4ae7.firebaseapp.com",
    databaseURL: "https://fire-notes-e4ae7.firebaseio.com",
    projectId: "fire-notes-e4ae7",
    storageBucket: "fire-notes-e4ae7.appspot.com",
    messagingSenderId: "1570630476"
  };
  firebase.initializeApp(config);
  
  export default firebase;