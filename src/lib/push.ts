import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { app, db } from "./firebase";

export type PushResult = "enabled" | "denied" | "unsupported" | "not-configured" | "error";

export async function enablePush(uid: string): Promise<PushResult> {
  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
  if (!app || !db || !vapidKey) return "not-configured";
  if (typeof window === "undefined" || !("Notification" in window) || !("serviceWorker" in navigator)) return "unsupported";
  if (!(await isSupported())) return "unsupported";

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return "denied";

  try {
    // The service worker reads the public Firebase config from these URL parameters.
    const params = new URLSearchParams({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
    });
    const registration = await navigator.serviceWorker.register(`/firebase-messaging-sw.js?${params}`);
    const token = await getToken(getMessaging(app), { vapidKey, serviceWorkerRegistration: registration });
    if (!token) return "error";
    await setDoc(doc(db, "pushTokens", token), { uid, platform: "web", createdAt: serverTimestamp() });
    return "enabled";
  } catch {
    return "error";
  }
}
