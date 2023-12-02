// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  connectFunctionsEmulator,
  getFunctions,
} from 'firebase/functions';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBTNgw8lQsoR8qE8ZnDG8RjqozxVV4hu6s',
  authDomain: 'teeshood-a1052.firebaseapp.com',
  projectId: 'teeshood-a1052',
  storageBucket: 'teeshood-a1052.appspot.com',
  messagingSenderId: '599990006898',
  appId: '1:599990006898:web:183610d73e7e0f943b7eeb',
  measurementId: 'G-YHME970LYY',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
const functions = getFunctions(app, 'asia-south1');
export const analytics = getAnalytics(app);

// connectFunctionsEmulator(functions, 'localhost', 5001);

export { functions };
