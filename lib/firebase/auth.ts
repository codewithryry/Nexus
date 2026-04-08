// lib/firebase/auth.ts
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./config";

// Sign in with email & password
export async function signInWithEmail(email: string, password: string) {
  try {
    if (!auth) throw new Error("Auth not initialized");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    console.error("Sign in error:", error);
    let errorMessage = "Failed to sign in";
    if (error.code === 'auth/user-not-found') errorMessage = "No account found with this email";
    if (error.code === 'auth/wrong-password') errorMessage = "Incorrect password";
    if (error.code === 'auth/invalid-email') errorMessage = "Invalid email address";
    return { user: null, error: errorMessage };
  }
}

// Sign up with email & password
export async function signUpWithEmail(email: string, password: string, displayName: string) {
  try {
    if (!auth) throw new Error("Auth not initialized");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user document in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: email,
      displayName: displayName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    console.error("Sign up error:", error);
    let errorMessage = "Failed to create account";
    if (error.code === 'auth/email-already-in-use') errorMessage = "Email already in use";
    if (error.code === 'auth/weak-password') errorMessage = "Password should be at least 6 characters";
    if (error.code === 'auth/invalid-email') errorMessage = "Invalid email address";
    return { user: null, error: errorMessage };
  }
}

// Sign in with Google
export async function signInWithGoogle() {
  try {
    if (!auth) throw new Error("Auth not initialized");
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    
    // Check if user document exists, if not create it
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    console.error("Google sign in error:", error);
    let errorMessage = "Failed to sign in with Google";
    if (error.code === 'auth/popup-closed-by-user') errorMessage = "Sign in cancelled";
    if (error.code === 'auth/account-exists-with-different-credential') {
      errorMessage = "An account already exists with the same email but different sign-in method";
    }
    return { user: null, error: errorMessage };
  }
}

// Sign out
export async function logOut() {
  try {
    if (!auth) throw new Error("Auth not initialized");
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    console.error("Sign out error:", error);
    return { error: error.message };
  }
}

// Listen to auth state changes
export function onAuthStateChange(callback: (user: User | null) => void) {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, callback);
}