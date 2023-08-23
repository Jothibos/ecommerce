// src/firebase.js
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";

  const firebaseConfig = {
    apiKey: "AIzaSyCXYJVvyacDlPyMj6yBDxGgN6WzNDgcjsE",
    authDomain: "e-commerce-51046.firebaseapp.com",
    projectId: "e-commerce-51046",
    storageBucket: "e-commerce-51046.appspot.com",
    messagingSenderId: "207649455949",
    appId: "1:207649455949:web:13ef63089cfa1d9da64104",
    measurementId: "G-FQTB4GY6R0",
  };
 const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
