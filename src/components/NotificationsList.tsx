"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  addDoc, collection, deleteDoc, doc, limit, onSnapshot, orderBy, query, serverTimestamp, type Timestamp,
} from "firebase/firestore";
import { Bell, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { enablePush, type PushResult } from "@/lib/push";
import { useAuth } from "@/context/AuthContext";

type Notice = { id: string; title: string; body: string; link?: string; at: number };

const pushMessages: Record<PushResult, string> = {
  enabled: "Push notifications are on for this device.",
  denied: "Notifications are blocked. Allow them in your browser settings.",
  unsupported: "This browser does not support push notifications.",
  "not-configured": "Push notifications are not configured yet.",
  error: "Could not enable push notifications. Please try again.",
};

export const SEEN_KEY = "ssb-notif-seen";

export default function NotificationsList() {
  const { user, role } = useAuth();
  const [items, setItems] = useState<Notice[] | null>(null);
  const [pushState, setPushState] = useState<PushResult | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [posting, setPosting] = useState(false);
  const [formMsg, setFormMsg] = useState("");

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "notifications"), orderBy("createdAt", "desc"), limit(50));
    return onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs.map((d) => {
          const x = d.data();
          return {
            id: d.id,
            title: String(x.title ?? ""),
            body: String(x.body ?? ""),
            link: x.link ? String(x.link) : undefined,
            at: (x.createdAt as Timestamp | null)?.toMillis?.() ?? Date.now(),
          };
        });
        setItems(rows);
        if (rows[0]) {
          try {
            localStorage.setItem(SEEN_KEY, String(rows[0].at));
            window.dispatchEvent(new Event("notif-seen"));
          } catch {}
        }
      },
      () => setItems([]),
    );
  }, []);

  async function post(e: React.FormEvent) {
    e.preventDefault();
    if (!db) return;
    setPosting(true);
    setFormMsg("");
    try {
      await addDoc(collection(db, "notifications"), {
        title: title.trim(),
        body: body.trim(),
        ...(link.trim() ? { link: link.trim() } : {}),
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setBody("");
      setLink("");
      setFormMsg("Notice posted.");
    } catch {
      setFormMsg("Could not post. Is your account set to admin?");
    } finally {
      setPosting(false);
    }
  }

  const field = "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm";

  return (
    <div className="space-y-6">
      <div className="card flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold">Get alerts on this device</h2>
          <p className="text-sm text-muted">New tests, material and announcements, even when the site is closed.</p>
        </div>
        {user ? (
          <button
            className="btn-primary"
            onClick={async () => setPushState(await enablePush(user.uid))}
          >
            <Bell size={16} /> Enable notifications
          </button>
        ) : (
          <Link href="/login" className="btn-primary">Log in to enable</Link>
        )}
        {pushState && <p className="w-full text-sm text-muted" role="status">{pushMessages[pushState]}</p>}
      </div>

      {role === "admin" && (
        <form onSubmit={post} className="card space-y-3 border-gold">
          <h2 className="font-display text-xl font-semibold">Post a notice (admin)</h2>
          <input required placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className={field} />
          <textarea required rows={3} placeholder="Message" value={body} onChange={(e) => setBody(e.target.value)} className={field} />
          <input placeholder="Optional link, e.g. /practice-tests" value={link} onChange={(e) => setLink(e.target.value)} className={field} />
          <button disabled={posting} className="btn-gold disabled:opacity-60">{posting ? "Posting..." : "Post notice"}</button>
          {formMsg && <p className="text-sm text-muted" role="status">{formMsg}</p>}
          <p className="text-xs text-muted">To also send a push alert, use Firebase Console, Messaging, New campaign.</p>
        </form>
      )}

      <div className="space-y-3" aria-live="polite">
        {items === null && <p className="text-muted">Loading...</p>}
        {items?.length === 0 && <p className="text-muted">No notifications yet.</p>}
        {items?.map((n) => (
          <article key={n.id} className="card">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-semibold">{n.title}</h3>
              {role === "admin" && db && (
                <button
                  aria-label="Delete notice"
                  onClick={() => deleteDoc(doc(db!, "notifications", n.id))}
                  className="text-muted hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <p className="mt-1 text-sm text-muted">{n.body}</p>
            <div className="mt-2 flex items-center justify-between text-xs text-muted">
              <span>{new Date(n.at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
              {n.link && <Link href={n.link} className="font-semibold text-sky">Open</Link>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
