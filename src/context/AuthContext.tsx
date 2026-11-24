"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
  signOut as fbSignOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";

type AuthCtx = {
  user: User | null;
  role: string;
  loading: boolean;
  configured: boolean;
  signUp: (name: string, email: string, password: string, targetExam: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

function requireAuth() {
  if (!auth) throw new Error("Firebase is not configured yet.");
  return auth;
}

async function ensureUserDoc(user: User, extra: { targetExam?: string; name?: string } = {}) {
  if (!db) return;
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return;
  await setDoc(ref, {
    name: extra.name ?? user.displayName ?? "",
    email: user.email ?? "",
    targetExam: extra.targetExam ?? "",
    role: "user",
    createdAt: serverTimestamp(),
  });
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u && db) {
        getDoc(doc(db, "users", u.uid))
          .then(async (s) => {
            if (!s.exists()) await ensureUserDoc(u); // recreate a missing profile document
            setRole(s.data()?.role ?? "user");
          })
          .catch(() => setRole("user"));
      } else {
        setRole("user");
      }
    });
  }, []);

  const signUp: AuthCtx["signUp"] = useCallback(async (name, email, password, targetExam) => {
    const a = requireAuth();
    const cred = await createUserWithEmailAndPassword(a, email, password);
    await updateProfile(cred.user, { displayName: name });
    await ensureUserDoc(cred.user, { name, targetExam });
  }, []);

  const signIn: AuthCtx["signIn"] = useCallback(async (email, password) => {
    await signInWithEmailAndPassword(requireAuth(), email, password);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const cred = await signInWithPopup(requireAuth(), new GoogleAuthProvider());
    await ensureUserDoc(cred.user);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    await sendPasswordResetEmail(requireAuth(), email);
  }, []);

  const signOut = useCallback(async () => {
    await fbSignOut(requireAuth());
  }, []);

  return (
    <Ctx.Provider
      value={{ user, role, loading, configured: isFirebaseConfigured, signUp, signIn, signInWithGoogle, resetPassword, signOut }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
}
