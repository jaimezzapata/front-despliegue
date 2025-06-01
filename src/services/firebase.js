import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCUXZmh9OhPXUOly_lQ95pCPcPqLNsfbOU",
  authDomain: "ontrol-suscripciones.firebaseapp.com",
  projectId: "ontrol-suscripciones",
  storageBucket: "ontrol-suscripciones.firebasestorage.app",
  messagingSenderId: "139028756084",
  appId: "1:139028756084:web:5439c4f933d1bdeb9b8321"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
