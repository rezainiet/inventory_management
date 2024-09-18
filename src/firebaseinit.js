/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_fN2426D32spLvEn307moT2JbQpNoSbs",
    authDomain: "koel-inventory.firebaseapp.com",
    projectId: "koel-inventory",
    storageBucket: "koel-inventory.appspot.com",
    messagingSenderId: "1029411587981",
    appId: "1:1029411587981:web:39edc3ab307f11fbb5dfc4",
    measurementId: "G-H4ZSFNR3C5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);