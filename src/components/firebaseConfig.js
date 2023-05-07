// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZDl8bdRiRJaNTAHwljPX3WwpsKvl5wP0",
  authDomain: "daodb-fc7ef.firebaseapp.com",
  projectId: "daodb-fc7ef",
  storageBucket: "daodb-fc7ef.appspot.com",
  messagingSenderId: "583237050351",
  appId: "1:583237050351:web:e59a43976765532810a01a",
  measurementId: "G-ZT66P4SKSW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app);
export default app