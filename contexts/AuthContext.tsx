// contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import { 
  onAuthStateChange, 
  signInWithEmail, 
  signUpWithEmail, 
  signInWithGoogle, 
  logOut 
} from '@/lib/firebase/auth';

interface UserData {
  displayName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  photoURL?: string;
  bio?: string;
  location?: string;
  website?: string;
  occupation?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  logout: () => Promise<{ error: string | null }>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUserData = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
    }
  };

  const refreshUserData = async () => {
    if (user) {
      await fetchUserData(user.uid);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (authUser) => {
      setUser(authUser);
      
      if (authUser) {
        await fetchUserData(authUser.uid);
        // Redirect to dashboard after successful login
        router.push('/dashboard');
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const signIn = async (email: string, password: string) => {
    const { user: signedInUser, error } = await signInWithEmail(email, password);
    if (error) return { error };
    if (signedInUser) {
      await fetchUserData(signedInUser.uid);
      router.push('/dashboard'); // Explicit redirect after sign in
    }
    return { error: null };
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const { user: signedUpUser, error } = await signUpWithEmail(email, password, displayName);
    if (error) return { error };
    if (signedUpUser) {
      await fetchUserData(signedUpUser.uid);
      router.push('/dashboard'); // Explicit redirect after sign up
    }
    return { error: null };
  };

  const signInWithGoogleHandler = async () => {
    const { user: googleUser, error } = await signInWithGoogle();
    if (error) return { error };
    if (googleUser) {
      await fetchUserData(googleUser.uid);
      router.push('/dashboard'); // Explicit redirect after Google sign in
    }
    return { error: null };
  };

  const logout = async () => {
    const { error } = await logOut();
    if (!error) {
      setUserData(null);
      router.push('/'); // Redirect to home after logout
    }
    return { error: error || null };
  };

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      loading,
      signIn,
      signUp,
      signInWithGoogle: signInWithGoogleHandler,
      logout,
      refreshUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}