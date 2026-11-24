"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Megaphone, Save, BookOpen } from "lucide-react";
import { db } from "@/lib/firebase";
import { Field, Panel, Status, errMsg, goldBtn, inputCls } from "./ui";

const init = { announceEnabled: false, announceText: "", announceLink: "", bookPrice: "", bookUrl: "" };

export default function SettingsAdmin() {
  const [s, setS] = useState(init);
  const [loaded, setLoaded] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!db) return;
    getDoc(doc(db, "settings", "site"))
      .then((d) => d.exists() && setS({ ...init, ...(d.data() as Partial<typeof init>) }))
      .finally(() => setLoaded(true));
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!db) return;
    setBusy(true);
    setMsg("");
    try {
      await setDoc(doc(db, "settings", "site"), s);
      setMsg("Settings saved. The site updates within a minute.");
    } catch (err) {
      setMsg(errMsg(err));
    } finally {
      setBusy(false);
    }
  }

  if (!loaded) return <p className="text-[#6b7589]">Loading...</p>;

  return (
    <form onSubmit={save} className="grid gap-6 lg:grid-cols-2">
      <Panel title="Announcement bar">
        <div className="space-y-3.5">
          <p className="flex items-center gap-2 text-sm text-[#4d5b76]"><Megaphone size={16} /> A strip shown at the very top of every page.</p>
          <label className="flex items-center gap-3 rounded-xl border border-[#dfe6f2] bg-[#f6f8fc] px-3.5 py-3 text-sm font-bold text-[#0c2556]">
            <input type="checkbox" checked={s.announceEnabled} onChange={(e) => setS({ ...s, announceEnabled: e.target.checked })} className="h-5 w-5 accent-[#1c4cb0]" />
            Show the announcement bar
          </label>
          <Field label="Message"><input className={inputCls} value={s.announceText} onChange={(e) => setS({ ...s, announceText: e.target.value })} placeholder="New batch starts on 1 December. Enroll now!" /></Field>
          <Field label="Link (optional)" hint="For example /subscription"><input className={inputCls} value={s.announceLink} onChange={(e) => setS({ ...s, announceLink: e.target.value })} /></Field>
          {s.announceEnabled && s.announceText && (
            <div className="rounded-xl bg-gold px-4 py-2.5 text-center text-sm font-extrabold text-[#0c2556]">{s.announceText}</div>
          )}
        </div>
      </Panel>
      <Panel title="Book">
        <div className="space-y-3.5">
          <p className="flex items-center gap-2 text-sm text-[#4d5b76]"><BookOpen size={16} /> Used on the home page and the Book page. Leave blank to keep the built-in values.</p>
          <Field label="Price"><input className={inputCls} value={s.bookPrice} onChange={(e) => setS({ ...s, bookPrice: e.target.value })} placeholder="₹299" /></Field>
          <Field label="Buy link"><input type="url" className={inputCls} value={s.bookUrl} onChange={(e) => setS({ ...s, bookUrl: e.target.value })} placeholder="https://www.flipkart.com/..." /></Field>
        </div>
      </Panel>
      <div className="lg:col-span-2">
        <button disabled={busy} className={goldBtn}><Save size={16} /> Save settings</button>
        <div className="mt-3"><Status msg={msg} /></div>
      </div>
    </form>
  );
}
