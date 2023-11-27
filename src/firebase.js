import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCzf02LX6cXGkkLj2Qdq7OOfbZniyycKuA",
  authDomain: "trackapp-81527.firebaseapp.com",
  projectId: "trackapp-81527",
  storageBucket: "trackapp-81527.appspot.com",
  messagingSenderId: "1080792355684",
  appId: "1:1080792355684:web:14b63c5f0cad013a532071",
  measurementId: "G-G7H35L6M8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
