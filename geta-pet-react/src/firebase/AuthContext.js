import React, { useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  signOut,
} from "firebase/auth";
import { auth } from "./Firebase";

const AuthContext = React.createContext();

export const useAuthentication = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function doCreateUserWithEmailAndPassword(email, password, displayName) {
    await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(auth.currentUser, { displayName: displayName });
  }

  async function doSignInWithEmailAndPassword(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function doSocialSignIn(provider) {
    let socialProvider = null;
    if (provider === "google") {
      socialProvider = new GoogleAuthProvider();
    } else if (provider === "facebook") {
      socialProvider = new FacebookAuthProvider();
    }
    await signInWithPopup(auth, socialProvider);
  }

  async function doChangePassword(email, oldPassword, newPassword) {
    let authCredential = EmailAuthProvider.credential(email, oldPassword);
    await reauthenticateWithCredential(auth.currentUser, authCredential);
    await updatePassword(auth.currentUser, newPassword);
    await signOut(auth);
  }

  async function doSignOut() {
    await signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    doSocialSignIn,
    doSignOut,
    doChangePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
