import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "acebot-963a0.firebaseapp.com",
  projectId: "acebot-963a0",
  storageBucket: "acebot-963a0.firebasestorage.app",
  messagingSenderId: "180049224469",
  appId: "1:180049224469:web:f8b9b0ba537bab695cbf1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export {auth , provider}
