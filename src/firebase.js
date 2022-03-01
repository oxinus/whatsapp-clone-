import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCWlqhjdojHTs-1MmTXFCjYKIwKgw19Wp8",
    authDomain: "whatsapp-clone-d2877.firebaseapp.com",
    projectId: "whatsapp-clone-d2877",
    storageBucket: "whatsapp-clone-d2877.appspot.com",
    messagingSenderId: "1035235268811",
    appId: "1:1035235268811:web:572c3d4f850b33292fe34e",
    measurementId: "G-LFXPP3L5SP"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const db = app.firestore();

  export const storage = firebase.storage();
  export const auth = firebase.auth();
  export default db;