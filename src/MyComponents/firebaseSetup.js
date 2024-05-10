// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJy6-DatxkugTsv2nTAlqcBAoAez2VoZo",
  authDomain: "loknathcatererandtravels.firebaseapp.com",
  projectId: "loknathcatererandtravels",
  storageBucket: "loknathcatererandtravels.appspot.com",
  messagingSenderId: "144363082479",
  appId: "1:144363082479:web:4a8b188eacd0ad85ce811a",
  measurementId: "G-M3FYP6LQLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();


export default db; 