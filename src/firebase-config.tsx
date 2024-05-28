import { FirebaseError, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZRR81ro9GN6GbLjEtEMa6EPjg0pHd3HI",
  authDomain: "unrealv2.firebaseapp.com",
  projectId: "unrealv2",
  storageBucket: "unrealv2.appspot.com",
  messagingSenderId: "54814253890",
  appId: "1:54814253890:web:f645babc991bfaa0541edb"
};


const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);




export async function loginUser(mail:string, password: string) {

    const auth = getAuth(app);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, mail, password);
        return userCredential.user;
    } catch (error) {
        console.log(error)
        return false
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
  