import { db, auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function registerUser(firstName, lastName, email, password) {
  console.log("[registerUser] email", email, "password", password);
  try {
    // Sign Up User
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
    console.log("User Credentials", user);
    
    // Create User Documentin Firestore
    const docRef = doc(db, "users", user.uid);
    await setDoc(
      docRef,
      {
        name: { first: firstName, last: lastName },
        email,
        emailVerified: user.emailVerified,
        accountType: 'user'
      },
      { merge: true }
    );
    
    // Fetch User Doc from Fiestore
    const userDocSnap = await getDoc(docRef);
    if (userDocSnap.exists()) return userDocSnap.data();
    
    // Throw error if user data not found
    throw { code: 500, message: "Something went wrong" };
  } catch (err) {
    throw new Error(`Error #${err.code} : ${err.message}`);
  }
}

export async function loginUser(email, password) {
  try {
    const userCredentials = signInWithEmailAndPassword(auth, email, password);
    console.log("");
  } catch (err) {}
}
