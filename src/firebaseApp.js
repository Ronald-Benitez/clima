// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPkuQtfwD8b-CPYaea5AYWowkSIIPLos0",
  authDomain: "estacionmeteorologica-eb378.firebaseapp.com",
  databaseURL: "https://estacionmeteorologica-eb378-default-rtdb.firebaseio.com",
  projectId: "estacionmeteorologica-eb378",
  storageBucket: "estacionmeteorologica-eb378.appspot.com",
  messagingSenderId: "537057407947",
  appId: "1:537057407947:web:60e13566f059c2d202bc4e",
  measurementId: "G-K28R59H782"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);