import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAngFny7yz6-g_d4non8Q6X7ETeMMx88qE",
  authDomain: "knight-s-arena.firebaseapp.com",
  projectId: "knight-s-arena",
  storageBucket: "knight-s-arena.appspot.com",
  messagingSenderId: "188001171329",
  appId: "1:188001171329:web:3a32e093d95254e7c45a80",
  measurementId: "G-BPDZLNWC4R" , 
  databaseURL: "https://knight-s-arena-default-rtdb.asia-southeast1.firebasedatabase.app/"

} ;
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);