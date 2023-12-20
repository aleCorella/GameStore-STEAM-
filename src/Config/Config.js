// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//Esta file es para la conifguracion de firebase -- la base da datos -- con nuestra aplicacion 
//cada uno de esto imports de aqui abajo son servicios de firebase 
import firebase from "firebase"
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB8b_gagGuhPSgM1oKI_N6COgrz_Ds63ZI",
    authDomain: "projectofinalapps.firebaseapp.com",
    projectId: "projectofinalapps",
    storageBucket: "projectofinalapps.appspot.com",
    messagingSenderId: "52615394848",
    appId: "1:52615394848:web:b9c631233cad9e7bbcee45",
    measurementId: "G-ZZGVQ6101T"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const fs = firebase.firestore();
  const storage = firebase.storage();



  export {auth,fs,storage}  