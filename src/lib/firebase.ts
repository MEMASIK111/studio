// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Add a check to ensure all required config values are present.
// This provides a clearer error message if the .env file is missing or misconfigured.
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error(
    "Firebase config is missing. Make sure you have a .env file with all the required NEXT_PUBLIC_FIREBASE_ variables, and that you have restarted the development server."
  );
}

// Initialize Firebase
// We check if apps are already initialized to prevent errors during hot-reloading in development.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firebase services to be used in other parts of the application
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
