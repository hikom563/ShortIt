import app from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNSr7twAkogWoLCeKstCyLyNr8dbwEm-I",
  authDomain: "shortit-cfffc.firebaseapp.com",
  projectId: "shortit-cfffc",
  storageBucket: "shortit-cfffc.appspot.com",
  messagingSenderId: "752577871113",
  appId: "1:752577871113:web:525ec545e9be3ec7a0e7d8",
};

const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();

if (process.env.NODE_ENV === "development") {
  firestore.useEmulator("localhost", 8080);
  auth.useEmulator("http://localhost:9099");
}

export { firebase, firestore, auth, app };
