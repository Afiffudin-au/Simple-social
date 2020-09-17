import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
  // If you want to run this, please paste your firebase key here
})
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export {db , auth ,storage}