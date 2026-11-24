"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Flag, X } from "lucide-react";
import { db } from "@/lib/firebase";

// "Report an error" on content pages. Saves to Firestore `reports`; admins read it in /admin > Reports.
export default function ReportError({ page, title }: { page: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!db) return setState("error");
    setState("sending");
    try {
      await addDoc(collection(db, "reports"), {
        page,
        title: title.slice(0, 200),
        message: msg.trim().slice(0, 1000),
        email: email.trim().slice(0, 200),
        status: "open",
        createdAt: serverTimestamp(),
      });
      setState("sent");
      setMsg("");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-[#dfe6f2] bg-white p-4">
      {!open ? (
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 text-sm font-bold text-[#4d5b76] hover:text-[#0c2556]">
          <Flag size={16} /> Found a mistake or outdated detail? Tell us
        </button>
      ) : state === "sent" ? (
        <p role="status" className="text-sm font-bold text-[#3d6b24]">Thank you. We will check it and update the page.</p>
      ) : (
        <form onSubmit={send} className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-extrabold text-[#0c2556]">Report an error on this page</p>
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="text-[#6b7589]"><X size={16} /></button>
          </div>
          <textarea required rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="What is wrong or out of date?" className="w-full rounded-xl border border-[#dfe6f2] bg-[#f6f8fc] px-3 py-2 text-sm outline-none focus:border-[#1c4cb0]" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email (optional)" className="w-full rounded-xl border border-[#dfe6f2] bg-[#f6f8fc] px-3 py-2 text-sm outline-none focus:border-[#1c4cb0]" />
          <button disabled={state === "sending"} className="rounded-xl bg-[#0c2556] px-5 py-2 text-sm font-bold text-white disabled:opacity-60">{state === "sending" ? "Sending..." : "Send report"}</button>
          {state === "error" && <p role="alert" className="text-xs font-semibold text-red-600">Could not send. Please try again, or message us on WhatsApp.</p>}
        </form>
      )}
    </div>
  );
}
