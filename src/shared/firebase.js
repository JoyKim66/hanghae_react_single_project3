import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyD3P2dCTt5G9l5dvx3FvHFLv7t_tvYBjXw",
  authDomain: "myweb-961b1.firebaseapp.com",
  projectId: "myweb-961b1",
  storageBucket: "myweb-961b1.appspot.com",
  messagingSenderId: "775494999477",
  appId: "1:775494999477:web:eb7819f1f1337a015f0dfc",
  measurementId: "G-T3LDPC0YC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
