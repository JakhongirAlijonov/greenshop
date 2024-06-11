// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcyB92_HUa6qRFbbPNpjd5zA4LS1euYCs",
  authDomain: "organic-48388.firebaseapp.com",
  projectId: "organic-48388",
  storageBucket: "organic-48388.appspot.com",
  messagingSenderId: "402604816966",
  appId: "1:402604816966:web:71591c2455505802386847"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider()
export  {app, auth , googleProvider }
