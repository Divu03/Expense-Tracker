import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCiwMvDC0jM-rQx5mxPPHeAq9oecaHrukY",
    authDomain: "expense-tracker-12895.firebaseapp.com",
    projectId: "expense-tracker-12895",
    storageBucket: "expense-tracker-12895.appspot.com",
    messagingSenderId: "538075439179",
    appId: "1:538075439179:web:b2fe32d4cc59752d222dce",
    measurementId: "G-FD80NCSEPR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default app;
