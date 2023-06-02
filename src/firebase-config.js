// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0alUDcoC4m1r2j0OSDgYvTFcAU31wJdI",
  authDomain: "mymrc-382104.firebaseapp.com",
  databaseURL: "https://mymrc-382104-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mymrc-382104",
  storageBucket: "mymrc-382104.appspot.com",
  messagingSenderId: "951452673062",
  appId: "1:951452673062:web:9ab1ef8e88662ad0d672e7",
  measurementId: "G-STG27RCXF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

 
export { db, auth, storage };