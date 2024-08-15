import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-0x-1-2-3",
  authDomain: "loginpage-b2b6c.firebaseapp.com",
  projectId: "loginpage-b2b6c",
  storageBucket: "loginpage-b2b6c.appspot.com",
  messagingSenderId: "101010",
  appId: "1:101010:web:101010",
  measurementId: "G-101010",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth,firestore ,app };