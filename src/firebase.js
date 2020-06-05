import firebase from 'firebase/app'
import 'firebase/database'

const appFirebase = firebase.initializeApp({
  apiKey: "AIzaSyDOx90R21GBie-fTL4BrvxTBk1t2ItCkKo",
  authDomain: "vue-diplom-crm.firebaseapp.com",
  databaseURL: "https://vue-diplom-crm.firebaseio.com",
  projectId: "vue-diplom-crm",
  storageBucket: "gs://vue-diplom-crm.appspot.com",
  messagingSenderId: "968181609113",
  appId: "1:968181609113:web:bb7c9eb5824b75a324be08",
  measurementId: "G-NB1DQ4MBGT"
})

export const db = appFirebase.database();
export const directorsRef = db.ref('directors');
export const tasksRef = db.ref('tasks')
