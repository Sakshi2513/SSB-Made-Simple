"use client";

import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, setDoc, writeBatch } from "firebase/firestore";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { downloads as builtin } from "@/content/downloads";
import { Field, Panel, Status, errMsg, ghostBtn, goldBtn, inputCls, primaryBtn, useCollection } from "./ui";

const empty = { id: "", title: "", description: "", file: "", order: "1" };

export default function DownloadsAdmin() {
  const { rows, error } = useCollection("downloads");
  const [f, setF] = useState(empty);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof empty, v: string) => setF((p) => ({ ...p, [k]: v }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!db) return;
    setBusy(true);
    setMsg("");
    const data = { title: f.title.trim(), description: f.description.trim(), file: f.file.trim(), order: Number(f.order) || 0 };
    try {
      if (f.id) await setDoc(doc(db, "downloads", f.id), data);
      else await addDoc(collection(db, "downloads"), data);
      setMsg("Saved. It appears on the site within a minute.");
      setF(empty);
    } catch (err) {
      setMsg(errMsg(err));
    } finally {
      setBusy(false);
    }
  }

  async function importBuiltin() {
    if (!db) return;
    setBusy(true);
    try {
      const b = writeBatch(db);
      builtin.forEach((d, i) => b.set(doc(collection(db!, "downloads")), { title: d.title, description: d.description, file: d.file ?? "", order: i + 1 }));
      await b.commit();
      setMsg("Built-in downloads imported. You can now edit or delete them.");
    } catch (err) {
      setMsg(errMsg(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <Panel title={f.id ? "Edit download" : "Add a free download"} action={f.id && <button className={ghostBtn} onClick={() => setF(empty)}>Cancel edit</button>}>
        <form onSubmit={save} className="space-y-3.5">
          <Field label="Title"><input required className={inputCls} value={f.title} onChange={(e) => set("title", e.target.value)} /></Field>
          <Field label="Description"><textarea rows={2} className={inputCls} value={f.description} onChange={(e) => set("description", e.target.value)} /></Field>
          <Field label="PDF link" hint="A public link to the PDF (Google Drive share link, your website, or any file host). Leave empty to show Coming soon.">
            <input type="url" className={inputCls} value={f.file} onChange={(e) => set("file", e.target.value)} placeholder="https://" />
          </Field>
          <Field label="Order" hint="Lower numbers show first."><input type="number" className={inputCls} value={f.order} onChange={(e) => set("order", e.target.value)} /></Field>
          <button disabled={busy} className={goldBtn}><Plus size={16} /> {f.id ? "Save changes" : "Add download"}</button>
          <Status msg={msg} />
        </form>
      </Panel>
      <Panel title={`Downloads (${rows?.length ?? 0})`} action={rows?.length === 0 && <button disabled={busy} onClick={importBuiltin} className={primaryBtn}>Import built-in downloads</button>}>
        {error && <Status msg={`Could not load: ${error}`} />}
        {rows?.length === 0 && !error && <p className="text-sm text-[#6b7589]">Nothing in Firestore yet, so the site shows its built-in list.</p>}
        <ul className="divide-y divide-[#eef1f6]">
          {rows?.sort((a, b) => Number(a.order) - Number(b.order)).map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate font-extrabold text-[#0c2556]">{String(r.order)}. {String(r.title)}</p>
                <p className="truncate text-xs text-[#6b7589]">{r.file ? String(r.file) : "Coming soon"}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button aria-label="Edit" onClick={() => setF({ id: r.id, title: String(r.title), description: String(r.description ?? ""), file: String(r.file ?? ""), order: String(r.order ?? 0) })} className="rounded-lg p-2 text-[#1c4cb0] hover:bg-[#eef3fb]"><Pencil size={16} /></button>
                <button aria-label="Delete" onClick={() => confirm("Delete this download?") && db && deleteDoc(doc(db, "downloads", r.id))} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
