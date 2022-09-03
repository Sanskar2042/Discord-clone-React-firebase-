import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChe9ueMRxMwT6jUMExgAgDtRBnyxjqWqo",
  authDomain: "discord-reactjs.firebaseapp.com",
  projectId: "discord-reactjs",
  storageBucket: "discord-reactjs.appspot.com",
  messagingSenderId: "340137124559",
  appId: "1:340137124559:web:b6e16d57d610752a0d8dba",
};

// eslint-disable-next-line
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
