import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDBT1T86TSYwiW8V93MX3ubT3ihvnt8DQM",
  authDomain: "iable-publications.firebaseapp.com",
  databaseURL: "https://iable-publications.firebaseio.com",
  projectId: "iable-publications",
  storageBucket: "iable-publications.appspot.com",
  messagingSenderId: "387649237596",
  appId: "1:387649237596:web:ec284a2c7784e89811ec99",
  measurementId: "G-FJL6CLFQQF",
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

//firebase.analytics()

export default firebase
