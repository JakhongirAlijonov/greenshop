import { GoogleAuthProvider, updateProfile } from "firebase/auth";
import { auth } from "./Config";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, {
    displayName: name,
  });
  return userCredential;
};
export const doSignInUserWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const doSignOut = async () => {
  return auth.signOut();
};
// parolni reset qilish
export const doPasswordReset = async (email) => {
  return sendPasswordResetEmail(auth, email);
};
// parolni almashtirish
export const doPasswordChange = async (password) => {
  return updatePassword(auth.currentUser, password);
};
