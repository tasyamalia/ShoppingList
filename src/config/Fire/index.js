// // Import the functions you need from the SDKs you need
// import {initializeApp} from 'firebase/app';
// import {getAuth} from 'firebase/auth';
// import {getFirestore} from 'firebase/firestore';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyCWfJjS2b9NqcNrtOCl5xSu1IPAsDuUWqM',
//   authDomain: 'beauty4ever-d6601.firebaseapp.com',
//   projectId: 'beauty4ever-d6601',
//   storageBucket: 'beauty4ever-d6601.appspot.com',
//   messagingSenderId: '123826404727',
//   appId: '1:123826404727:web:f2b4b941fdf89c6c3ab572',
//   measurementId: 'G-EQ512KHR3W',
// };

// const Fire = initializeApp(firebaseConfig);
// const auth = getAuth(Fire);
// const db = getFirestore(Fire);
// export {Fire, auth, db};
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDbe33P4tG_J4kKlxWX-2ZxvXYaNvda0Ek',
  authDomain: 'shoppinglisttasya.firebaseapp.com',
  projectId: 'shoppinglisttasya',
  storageBucket: 'shoppinglisttasya.appspot.com',
  messagingSenderId: '1015801003303',
  appId: '1:1015801003303:web:6e19d4b1557d0e06e93d02',
  measurementId: 'G-GVL9N053BV',
  databaseURL:
    'shoppinglisttasya-default-rtdb.asia-southeast1.firebasedatabase.app',
};
const Fire = initializeApp(firebaseConfig);
const Auth = getAuth(Fire);
const Database = getFirestore(Fire, {
  experimentalAutoDetectLongPolling: true,
  experimentalForceLongPolling: true,
});
const RealDatabase = getDatabase(Fire);
export {Fire, Auth, Database, RealDatabase};
