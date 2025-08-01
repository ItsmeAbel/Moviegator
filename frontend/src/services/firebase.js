import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const F_API_KEY = import.meta.env.VITE_Firebase_API_KEY;
const F_Auth_Domain = import.meta.env.VITE_Firebase_Auth_Domain;
const F_Storage_Bucket = import.meta.env.VITE_Firebase_Storage_Bucket;
const F_Project_Id = import.meta.env.VITE_Firebase_Project_Id;
const F_Sender_Id = import.meta.env.VITE_Firebase_Messaging_Sender_Id;
const F_App_Id = import.meta.env.VITE_Firebase_App_Id;
const F_Measurement_Id = import.meta.env.VITE_Firebase_Measurement_Id;
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: F_API_KEY,
  authDomain: F_Auth_Domain,
  projectId: F_Project_Id,
  storageBucket: F_Storage_Bucket,
  messagingSenderId: F_Sender_Id,
  appId: F_App_Id,
  measurementId: F_Measurement_Id,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
