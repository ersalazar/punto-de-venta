// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAflOeYV6C5rNleNM2XRVo3Wp8TRnS-v5U",
  authDomain: "puntodeventa-841e0.firebaseapp.com",
  projectId: "puntodeventa-841e0",
  storageBucket: "puntodeventa-841e0.appspot.com",
  messagingSenderId: "640232152950",
  appId: "1:640232152950:web:a8092e3f6e5e5466b06457"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)