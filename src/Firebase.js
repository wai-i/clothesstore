// Import the functions you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxzzrcHR5lk8s-SIOTFiZ-Mz34ZQbzlCs",
  authDomain: "my-first-project-396a4.firebaseapp.com",
  databaseURL: "https://my-first-project-396a4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-first-project-396a4",
  storageBucket: "my-first-project-396a4.firebasestorage.app",
  messagingSenderId: "866649436898",
  appId: "1:866649436898:web:e9dcbec4e391c40c4264bb",
  measurementId: "G-M10LS2QH0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };