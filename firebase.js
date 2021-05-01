import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAYXGx7mkKGfDSFO2lNhTB02g2H5yZY1TQ",
  authDomain: "whatsapp-2-670bf.firebaseapp.com",
  projectId: "whatsapp-2-670bf",
  storageBucket: "whatsapp-2-670bf.appspot.com",
  messagingSenderId: "1065702934170",
  appId: "1:1065702934170:web:9c0ad0b006c86fb0594123",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
