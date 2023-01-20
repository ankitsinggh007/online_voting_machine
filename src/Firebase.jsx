// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyk3xj6obwFK0f6j1cLp9U8zEy3ukmlKU",
  authDomain: "voting-system-7b056.firebaseapp.com",
  projectId: "voting-system-7b056",
  storageBucket: "voting-system-7b056.appspot.com",
  messagingSenderId: "420017505819",
  appId: "1:420017505819:web:9076cf3d450590252b1abe"
};

const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
export default db;