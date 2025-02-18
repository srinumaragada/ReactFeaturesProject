import { auth } from "../config/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword } from "firebase/auth";


export const signUpWithEmailAndPassword = async (auth: any, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message); 
    }
    throw new Error("An unknown error occurred during sign-up.");
  }
};

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await firebaseSignInWithEmailAndPassword(auth, email, password); 
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error during sign-in:", error.message);
      throw new Error(error.message);
    }
    console.log("Unknown error during sign-in:", error);
    throw new Error("An unknown error occurred during sign-in.");
  }
};
