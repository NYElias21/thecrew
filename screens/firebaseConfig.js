import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_Kdx5y0Yj4Yko6OYf1HtFd8EedOS40iI",
  authDomain: "thecrew-b1d15.firebaseapp.com",
  projectId: "thecrew-b1d15",
  storageBucket: "thecrew-b1d15.appspot.com",
  messagingSenderId: "66228651945",
  appId: "1:66228651945:web:9107efb2f2f6a4235266b8",
  // measurementId is not needed for React Native
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
