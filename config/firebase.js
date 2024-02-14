// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKkiWUTNgJdHSi0p_VnFD8FQEAlSm0c-Q",
  authDomain: "foodapp-26d02.firebaseapp.com",
  projectId: "foodapp-26d02",
  storageBucket: "foodapp-26d02.appspot.com",
  messagingSenderId: "682770046989",
  appId: "1:682770046989:web:faf7836212496c65673544",
  measurementId: "G-GM9W6FEY2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);