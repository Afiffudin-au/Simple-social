import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCkQgN38mNDD3ERJUT_EjWhIzRIN-Ut5KQ",
  authDomain: "simple-sosial-2.firebaseapp.com",
  databaseURL: "https://simple-sosial-2.firebaseio.com",
  projectId: "simple-sosial-2",
  storageBucket: "simple-sosial-2.appspot.com",
  messagingSenderId: "167116992643",
  appId: "1:167116992643:web:533c5a9c5f60db31bc2bb6"
})
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export {db , auth ,storage}