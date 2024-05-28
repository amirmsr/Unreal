import { Capacitor } from "@capacitor/core";
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, createUserWithEmailAndPassword, getAuth, indexedDBLocalPersistence, initializeAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAweURB0VIOiv4AevW0OJ1D94ASIS1w3Zc",
  authDomain: "movieapp-54292.firebaseapp.com",
  projectId: "movieapp-54292",
  storageBucket: "movieapp-54292.appspot.com",
  messagingSenderId: "488949526413",
  appId: "1:488949526413:web:9cf980667b36dc3e39d7c4"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

let persistence;

if (Capacitor.isNativePlatform()) {
  persistence = indexedDBLocalPersistence;
} else {
  persistence = browserLocalPersistence;
}

initializeAuth(app, { persistence });

export const auth = getAuth(app);

export async function loginUser(mail:string, password: string) {
  try {
      const userCredential = await signInWithEmailAndPassword(auth, mail, password);
      return userCredential.user;
  } catch (error) {
      return false;
  }
}

export async function registerUser(email: string, password: string, username: string, age:number) {
    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(firestore, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        age: age
      });
  
      return user;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

export async function logoutUser() {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
}
  