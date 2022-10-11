// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getDatabase} from 'firebase/database'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_NEXT_PUBLIC_API_KEY,
  authDomain: process.env.REACT_APP_NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.REACT_APP_NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.REACT_APP_NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_NEXT_PUBLIC_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getDatabase(app)

export default app

