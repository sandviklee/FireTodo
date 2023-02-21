import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "... Dont you even try!",
  authDomain: "firetodo-3ea63.firebaseapp.com",
  projectId: "firetodo-3ea63",
  storageBucket: "firetodo-3ea63.appspot.com",
  messagingSenderId: "419916125489",
  appId: "1:419916125489:web:19e320f66bdc0ad6c30c10",
  measurementId: "G-8MYVG0TW9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {
    db
}