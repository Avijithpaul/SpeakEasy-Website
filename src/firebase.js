import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'appId']

export const missingFirebaseKeys = requiredKeys.filter((key) => !firebaseConfig[key])
export const isFirebaseConfigured = missingFirebaseKeys.length === 0

let app = null
let auth = null
let googleProvider = null
let initError = null

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    googleProvider = new GoogleAuthProvider()
    googleProvider.setCustomParameters({ prompt: 'select_account' })
  } catch (error) {
    initError = error
    console.error('Firebase initialization failed:', error)
  }
}

export const loginWithGoogle = () => {
  if (!auth) throw new Error('Firebase is not configured properly.')
  return signInWithPopup(auth, googleProvider)
}

export const registerWithEmail = async (name, email, password, photoURL) => {
  if (!auth) throw new Error('Firebase is not configured properly.')
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const profileUpdates = {}
  if (name) {
    profileUpdates.displayName = name
  }
  if (photoURL) {
    profileUpdates.photoURL = photoURL
  }
  if (Object.keys(profileUpdates).length > 0) {
    await updateProfile(userCredential.user, profileUpdates)
  }
  return userCredential
}

export const loginWithEmail = (email, password) => {
  if (!auth) throw new Error('Firebase is not configured properly.')
  return signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
  if (!auth) throw new Error('Firebase is not configured properly.')
  return signOut(auth)
}

export const subscribeToAuthChanges = (callback) => {
  if (!auth) return () => {}
  return onAuthStateChanged(auth, callback)
}

export { auth, googleProvider, initError }
