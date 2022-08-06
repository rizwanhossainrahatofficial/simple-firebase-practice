import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";



const authenticationInitialize=()=>{
    initializeApp(firebaseConfig);
}

export default authenticationInitialize;