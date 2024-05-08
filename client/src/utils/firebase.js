// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: 'AIzaSyAFJksWfNYK8xTuFmxZlUqouBJfyOHuiFs',
  authDomain: 'virtual-classroom-30254.firebaseapp.com',
  projectId:  'virtual-classroom-30254',
  storageBucket: 'virtual-classroom-30254.appspot.com',
  messagingSenderId: '271639592197',
  appId:  '1:271639592197:web:878a3ab31b954f633d0b6c',
  measurementId: 'G-YBEH75H8DZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const analytics = getAnalytics(app);