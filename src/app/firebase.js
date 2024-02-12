
import firebase from 'firebase/app'
import {getAuth} from  "firebase/auth";
import {getStorage} from 'firebase/storage'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWxkeNEVqYIMh0vfyhnXC_HxAbPIJN4pc",
  authDomain: "nextblog-70b4a.firebaseapp.com",
  projectId: "nextblog-70b4a",
  storageBucket: "nextblog-70b4a.appspot.com",
  messagingSenderId: "294526332477",
  appId: "1:294526332477:web:70dcbbdd7acc02716f0454"
};


const app = initializeApp(firebaseConfig);

 const auth=getAuth(app);
 const storage = getStorage(app);
 const db = getFirestore(app);

 export {app,auth,storage,db}