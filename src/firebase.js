import {getFirestore} from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyCK2mgS31694ptj7JDj2PRyIUPJO6opSuM",
  // authDomain: "todolist-d09b9.firebaseapp.com",
  // projectId: "todolist-d09b9",
  // storageBucket: "todolist-d09b9.appspot.com",
  // messagingSenderId: "378091923868",
  // appId: "1:378091923868:web:4a19ebf173df42d508c059"
  apiKey:process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  //databaseURL:process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app)
export default app;