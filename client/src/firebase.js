// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-4a301.firebaseapp.com",
  projectId: "mern-blog-app-4a301",
  storageBucket: "mern-blog-app-4a301.appspot.com",
  messagingSenderId: "15697313215",
  appId: "1:15697313215:web:837dd38780b54c3c64b50a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
