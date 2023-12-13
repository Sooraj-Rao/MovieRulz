import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB4McgMCvQQAKCFbqfaCJeTnLx0HVLBNAk",
  authDomain: "movierulz-9e8da.firebaseapp.com",
  projectId: "movierulz-9e8da",
  storageBucket: "movierulz-9e8da.appspot.com",
  messagingSenderId: "1005239413386",
  appId: "1:1005239413386:web:4a9afdcfe7ad6a38cfdb73"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const moviesRef=collection(db,"Movies")
export const reviewsRef=collection(db,"reviews")
export const usersRef=collection(db,"users")
export default app;