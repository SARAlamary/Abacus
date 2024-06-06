// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoo1UZt6daTqU1BRmTJoxJN601KNhvf4c",
  authDomain: "abacus-1cd92.firebaseapp.com",
  projectId: "abacus-1cd92",
  storageBucket: "abacus-1cd92.appspot.com",
  messagingSenderId: "52069573106",
  appId: "1:52069573106:web:224d42e32e098446a34b6b",
  measurementId: "G-NCZPLYG1NR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);