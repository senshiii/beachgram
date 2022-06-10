import { db, auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function registerUser(firstName, lastName, email, password) {
  // console.log("[registerUser] email", email, "password", password);
  try {
    // Sign Up User
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
    // console.log("User Credentials", user);

    // Create User Documentin Firestore
    const docRef = doc(db, "users", user.uid);
    await setDoc(
      docRef,
      {
        name: { first: firstName, last: lastName },
        email,
        emailVerified: user.emailVerified,
        profilePhotoUrl: user.photoURL,
        accountType: "user",
      },
      { merge: true }
    );

    // Fetch User Doc from Fiestore
    const userDocSnap = await getDoc(docRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      // console.log("[User Data]", userData);
      return { id: user.uid, ...userData };
    }

    // Throw error if user data not found
    throw { code: 500, message: "Something went wrong" };
  } catch (err) {
    if (err.message?.includes("email-already-in-use"))
      throw new Error(`Email ${email} already in use`);
    else throw new Error("Something went wrong");
  }
}

export async function loginUser(email, password) {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      return { id: user.uid, ...userData };
    }
    throw new Error("Something went wrong");
  } catch (err) {
    console.log("[loginUser] err", err.message);
    if(err.message?.includes("wrong-password")) throw new Error("Incorrect credentials");
    else throw err;
  }
}
