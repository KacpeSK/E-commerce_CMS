/* eslint-disable */
// @ts-nocheck

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsvSO9htfV0hXgLtKx-pMZ3Wo4Zc-ZNWk",
  authDomain: "cms-clothing-db.firebaseapp.com",
  projectId: "cms-clothing-db",
  storageBucket: "cms-clothing-db.firebasestorage.app",
  messagingSenderId: "717906530152",
  appId: "1:717906530152:web:5205dc69f4e6e8f28890dd",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) {
    return;
  }

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating a user", error.mesage);
    }
  }
  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  if (!callback) {
    return;
  }
  onAuthStateChanged(auth, callback);
};
