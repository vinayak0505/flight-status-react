import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAn0qds2ongfFpLAPbIs6pVsIr5V3Mf8Y",
  authDomain: "test-e37ab.firebaseapp.com",
  projectId: "test-e37ab",
  storageBucket: "test-e37ab.appspot.com",
  messagingSenderId: "301151428688",
  appId: "1:301151428688:web:2f4486b2636ebcaf1cf155"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseMessaging = getMessaging(firebaseApp);