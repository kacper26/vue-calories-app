import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDwgd88QoWnc9nRKLvy4YBQirT30Quy5Fg",
  authDomain: "vue-calories-application.firebaseapp.com",
  projectId: "vue-calories-application",
  storageBucket: "vue-calories-application.appspot.com",
  messagingSenderId: "880963729572",
  appId: "1:880963729572:web:7f41b3699f539b9cd6ce31"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);

export { auth, firebaseApp, db, googleProvider }