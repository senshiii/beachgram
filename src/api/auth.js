import { db, auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function registerUser(firstName, lastName, email, password) {
  // console.log("[registerUser] email", email, "password", password);
  try {
    // Set persistence
    await auth.setPersistence(browserSessionPersistence);
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
    const userData = {
      name: { first: firstName, last: lastName },
      email,
      emailVerified: user.emailVerified,
      profilePhotoUrl: user.photoURL,
    };
    await setDoc(docRef, userData, { merge: true });

    return { id: user.uid, ...userData };
  } catch (err) {
    if (err.message?.includes("email-already-in-use"))
      throw new Error(`Email ${email} already in use`);
    else throw new Error("Something went wrong");
  }
}

export async function loginUser(email, password) {
  try {
    // Set persistence
    await auth.setPersistence(browserSessionPersistence);
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
    if (err.message?.includes("wrong-password"))
      throw new Error("Incorrect credentials");
    else throw err;
  }
}

export async function registerBeach(email, password, name, address) {
  try {
    await auth.setPersistence(browserSessionPersistence);
    const beachCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const beach = beachCred.user;
    // Firestore
    // Set Data
    const ref = doc(db, "beaches", beach.uid);
    const beachData = {
      name,
      address,
      email,
      thingsToDo: [],
      visitorData: {},
      profilePhotoUrl: beach.photoURL,
    };
    await setDoc(ref, beachData);
    return { id: beach.uid, ...beachData };
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function loginBeach(email, password) {
  try {
    await auth.setPersistence(browserSessionPersistence);
    const beachCred = await signInWithEmailAndPassword(auth, email, password);
    const beach = beachCred.user;
    // Retrieve data
    const ref = doc(db, "beaches", beach.uid);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) return { id: beach.uid, ...docSnap.data() };
    else throw new Error("Code #404: Beach not found");
  } catch (err) {
    console.log("[loginBeach] err", err.message);
    throw new Error(err.message);
  }
}
