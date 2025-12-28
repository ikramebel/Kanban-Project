// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAy5aCceZbyh8LcoPK7hraN62rOtw7yXbI",
  authDomain: "project-manager-4184d.firebaseapp.com",
  projectId: "project-manager-4184d",
  storageBucket: "project-manager-4184d.firebasestorage.app",
  messagingSenderId: "480597027868",
  appId: "1:480597027868:web:d3a872234bc6ed5b7bc3d9",
  measurementId: "G-V2X6E4Q869"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };