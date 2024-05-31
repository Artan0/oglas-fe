// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBdlTNf7-w3fNU6UsJixp866BPT1QwuPd8",
    authDomain: "oglas-1b0b6.firebaseapp.com",
    projectId: "oglas-1b0b6",
    storageBucket: "oglas-1b0b6.appspot.com",
    messagingSenderId: "549140107856",
    appId: "1:549140107856:web:3cbe88c14d27fde5767755",
    measurementId: "G-DJDTX9JNPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const imgDB = getStorage(app)
const txtDB = getFirestore(app)

export { app, analytics, imgDB, txtDB };
