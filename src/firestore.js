import firebase from 'firebase'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyCapt2nwrdX8Dg8i7C8Bj5jDGTKZ_4WZfc",
    authDomain: "bingo-project-2c67d.firebaseapp.com",
    projectId: "bingo-project-2c67d",
    storageBucket: "bingo-project-2c67d.appspot.com",
    messagingSenderId: "553164113438",
    appId: "1:553164113438:web:c3445fa88a5a3743f9100f",
    measurementId: "G-BGMY66E54C"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  export default db;