import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyB0TmEpPdy8X5Ny9flAQf5hrawEuaThGK4",
  authDomain: "smart-room-gl.firebaseapp.com",
  projectId: "smart-room-gl",
  storageBucket: "smart-room-gl.appspot.com",
  messagingSenderId: "599473240775",
  appId: "1:599473240775:web:210ebc9ce742f2f183dce2",
});
const db = getFirestore(firebaseApp);

export default db;
