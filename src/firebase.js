import firebase from "firebase";
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDngQrM5XRc7nWhdl7ev3R9SM1jpqS_PlM",
  authDomain: "react-taller-3ba69.firebaseapp.com",
  projectId: "react-taller-3ba69",
  storageBucket: "react-taller-3ba69.appspot.com",
  messagingSenderId: "554260141047",
  appId: "1:554260141047:web:13370674a676f89ddb14f2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export {firebase}