"use client";

import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { Send, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { Field, Panel, Status, errMsg, goldBtn, inputCls, useCollection } from "./ui";

export default function NoticesAdmin() {
  const { rows, error } = useCollection("notifications");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function post(e: React.FormEvent) {
    e.preventDefault();
    if (!db) return;
    setBusy(true);
    setMsg("");
    try {
      await addDoc(collection(db, "notifications"), { title: title.trim(), body: body.trim(), ...(link.trim() ? { link: link.trim() } : {}), createdAt: serverTimestamp() });
      setTitle("");
      setBody("");
      setLink("");
      setMsg("Notice posted. It shows on the Notifications page right away.");
    } catch (err) {
      setMsg(errMsg(err));
    } finally {
      setBusy(false);
    }
  }

  const ts = (r: Record<string, unknown>) => (r.createdAt as { toMillis?: () => number } | undefined)?.toMillis?.() ?? 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <Panel title="Post a notice">
        <form onSubmit={post} className="space-y-3.5">
          <Field label="Title"><input required className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
          <Field label="Message"><textarea required rows={4} className={inputCls} value={body} onChange={(e) => setBody(e.target.value)} /></Field>
          <Field label="Link (optional)" hint="For example /practice-tests or /blog"><input className={inputCls} value={link} onChange={(e) => setLink(e.target.value)} /></Field>
          <button disabled={busy} className={goldBtn}><Send size={16} /> Post notice</button>
          <Status msg={msg} />
          <p className="text-xs text-[#6b7589]">To also send a phone push alert, use Firebase Console, Messaging, New campaign.</p>
        </form>
      </Panel>
      <Panel title={`Notices (${rows?.length ?? 0})`}>
        {error && <Status msg={`Could not load: ${error}`} />}
        {rows?.length === 0 && !error && <p className="text-sm text-[#6b7589]">No notices yet.</p>}
        <ul className="divide-y divide-[#eef1f6]">
          {rows?.sort((a, b) => ts(b) - ts(a)).map((r) => (
            <li key={r.id} className="flex items-start justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="font-extrabold text-[#0c2556]">{String(r.title)}</p>
                <p className="line-clamp-2 text-sm text-[#4d5b76]">{String(r.body)}</p>
              </div>
              <button aria-label="Delete" onClick={() => confirm("Delete this notice?") && db && deleteDoc(doc(db, "notifications", r.id))} className="shrink-0 rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
