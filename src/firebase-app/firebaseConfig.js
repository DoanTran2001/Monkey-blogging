import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD9HGwckHacmlCfu7tn8pNT8ZPeHHycyxw",
  authDomain: "monkey-blogging-8bfea.firebaseapp.com",
  projectId: "monkey-blogging-8bfea",
  storageBucket: "monkey-blogging-8bfea.appspot.com",
  messagingSenderId: "720496544604",
  appId: "1:720496544604:web:1483c96162879d8941cf99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); //  database
export const auth = getAuth(app); // Đăng nhập, đăng kí, đăng xuất
