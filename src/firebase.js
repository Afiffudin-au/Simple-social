import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
  //firebase key
})
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export {db , auth ,storage}