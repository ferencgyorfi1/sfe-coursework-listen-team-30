import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'; // Import Firestore from Firebase SDK

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl275GejcwkVYn6ISWvmejxROYmr_nrF8",
  authDomain: "listen-database-5ec9c.firebaseapp.com",
  projectId: "listen-database-5ec9c",
  storageBucket: "listen-database-5ec9c.appspot.com",
  messagingSenderId: "973415679044",
  appId: "1:973415679044:web:15116ae9875c38e8f1a811",
  measurementId: "G-BRFVXNRE5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app); // Initialize Firestore

const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        console.log("User registered successfully:", user);
        return user;
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Registration error:", errorMessage);
        throw new Error(errorMessage);
      });
  };

const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log("User logged in successfully:", user);
        return user;
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorMessage);
        throw new Error(errorMessage);
      });
  };

export { auth, register, login, firestore }; // Export Firestore along with auth functions