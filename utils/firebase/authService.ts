import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth'
import { auth } from './fireBaseService'

export async function login(email:string, pass: string) {
  return signInWithEmailAndPassword(auth, email, pass)
}

export async function logOut() {
  return signOut(auth)
}

export function onAuthChanged(callback: (user: User | null) => void ) {
  return onAuthStateChanged(auth, callback)
}