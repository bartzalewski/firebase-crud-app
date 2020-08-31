import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBkpsXuwJZIHdSDizywYm8aVTMayrFOS4o',
  authDomain: 'todo-list-e21a1.firebaseapp.com',
  databaseURL: 'https://todo-list-e21a1.firebaseio.com',
  projectId: 'todo-list-e21a1',
  storageBucket: 'todo-list-e21a1.appspot.com',
  messagingSenderId: '30402708070',
  appId: '1:30402708070:web:9086e2590b3f4d9435a3a7',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db, firebase as default };
