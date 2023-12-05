import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth'

import {
  addDoc,
  collection,
  getFirestore,
  query,
  getDocs,
  where
} from "firebase/firestore"

import { auth } from './fireBaseService'
import { db } from './fireBaseService'


export async function login(email: string, pass: string) {
  return signInWithEmailAndPassword(auth, email, pass)
}

export async function logOut() {
  return signOut(auth)
}

export function onAuthChanged(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}

export function logWithGoogle() {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

export async function createAccountWithEmail(email: string, pwd: string) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, pwd);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid, // Use 'uid' instead of 'id'
      authProvider: "local",
      email,
      pwd
    });
  } catch (error) {
    // Handle error appropriately
    console.error("Error creating account:", error);
  }
}

export async function recoverPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email)
    console.log("Password reset email sent successfully!");
  } catch (error) {
    console.error("Error resetting password:", error);
  }
}