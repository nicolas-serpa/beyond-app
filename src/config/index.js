import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBR_BwknlFbNTpwg4un2ByU8eKRN0xxFrg",
  authDomain: "beyond-app-a3140.firebaseapp.com",
  projectId: "beyond-app-a3140",
  storageBucket: "beyond-app-a3140.appspot.com",
  messagingSenderId: "173850625102",
  appId: "1:173850625102:web:50bdd76ecbd048ffb4af1f",
  measurementId: "G-0EL35GW8CR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
