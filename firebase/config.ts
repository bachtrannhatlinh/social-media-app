// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKCOOUAfmJqmoWG6gI6N72LEKrRmfaqrU",
  authDomain: "social-media-app-b2c39.firebaseapp.com",
  projectId: "social-media-app-b2c39",
  storageBucket: "social-media-app-b2c39.firebasestorage.app",
  messagingSenderId: "425485674036",
  appId: "1:425485674036:web:1e26fa56a5215c52a74c61",
  measurementId: "G-CX7E8KYMFW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);