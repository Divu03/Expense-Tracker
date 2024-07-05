import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCiwMvDC0jM-rQx5mxPPHeAq9oecaHrukY",
    authDomain: "expense-tracker-12895.firebaseapp.com",
    projectId: "expense-tracker-12895",
    storageBucket: "expense-tracker-12895.appspot.com",
    messagingSenderId: "538075439179",
    appId: "1:538075439179:web:b2fe32d4cc59752d222dce",
    measurementId: "G-FD80NCSEPR"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
