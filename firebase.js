import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBP3sZf6SdxSf27D60jY-chX4ye44UocTE",
  authDomain: "clone-42958.firebaseapp.com",
  projectId: "clone-42958",
  storageBucket: "clone-42958.appspot.com",
  messagingSenderId: "77866719718",
  appId: "1:77866719718:web:c0c356d573ad8ef4545e27",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db =app.firestore();
export default db;