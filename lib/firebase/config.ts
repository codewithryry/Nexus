// lib/firebase/config.ts
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCR_W5ffPttfg5HDVTqqcao_CJPsH8MtqU",
  authDomain: "nexusaitech2026.firebaseapp.com",
  projectId: "nexusaitech2026",
  storageBucket: "nexusaitech2026.firebasestorage.app",
  messagingSenderId: "378075388308",
  appId: "1:378075388308:web:43cb85ac8661049e571781"
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

let auth: ReturnType<typeof getAuth> | null = null

if (typeof window !== "undefined") {
  auth = getAuth(app)
}

const db = getFirestore(app)

export { app, auth, db }