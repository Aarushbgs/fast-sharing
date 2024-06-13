
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from "firebase/storage"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJwt1bk9OxpAgLeyMy-jknrqomnacUhow",
  authDomain: "fileupload-43941.firebaseapp.com",
  projectId: "fileupload-43941",
  storageBucket: "fileupload-43941.appspot.com",
  messagingSenderId: "873737235781",
  appId: "1:873737235781:web:4244699545ea9df100222c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);