import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKF62TWYR4t4xsluIgKTRhBjtJc0j0mus",
  authDomain: "fir-project-142ac.firebaseapp.com",
  projectId: "fir-project-142ac",
  storageBucket: "fir-project-142ac.appspot.com",
  messagingSenderId: "981101980880",
  appId: "1:981101980880:web:4c438d4958c9b584f7c2d5",
  measurementId: "G-52TY1J91GV",
};
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export default firebaseApp;
