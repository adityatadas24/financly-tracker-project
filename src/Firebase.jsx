// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore , doc,setDoc} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGhxHxsqVxM-Um3ZsSefODefQ_apZirf8",
  authDomain: "financly-finance-tracker.firebaseapp.com",
  projectId: "financly-finance-tracker",
  storageBucket: "financly-finance-tracker.appspot.com",
  messagingSenderId: "210728414563",
  appId: "1:210728414563:web:8ef19ebbce3d3f382a7756",
  measurementId: "G-G6ER7JRVKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc};