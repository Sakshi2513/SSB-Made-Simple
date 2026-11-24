"use client";

import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { builtinProducts } from "@/content/products";
import { Field, Panel, Status, errMsg, ghostBtn, goldBtn, inputCls, useCollection } from "./ui";

const blank = { id: "", productId: "pack-oir", kind: "pdf", title: "", description: "", url: "", body: "", order: "1" };

export default function PremiumAdmin() {
  const { rows, error } = useCollection("premium");
  const products = useCollection("products");
  const [f, setF] = useState(blank);
  const [filter, setFilter] = useState("all");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof blank, v: string) => setF((p) => ({ ...p, [k]: v }));

  // Built-in products plus any extra ones added in the Products tab.
  const options = [
    ...builtinProducts.map((p) => ({ id: p.id, name: p.name })),
    ...(products.rows ?? []).filter((r) => !builtinProducts.some((p) => p.id === r.id)).map((r) => ({ id: r.id, name: String(r.name) })),
  ];
  const nameOf = (id: string) => options.find((o) => o.id === id)?.name ?? id;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!db) return;
    setBusy(true);
    setMsg("");
    const data = { productId: f.productId, kind: f.kind, title: f.title.trim(), description: f.description.trim(), url: f.url.trim(), body: f.body, order: Number(f.order) || 0, updatedAt: new Date().toISOString().slice(0, 10) };
    try {
      if (f.id) await setDoc(doc(db, "premium", f.id), data);
      else await addDoc(collection(db, "premium"), data);
      setMsg("Saved. Buyers of this product see it in My Library now.");
      setF({ ...blank, productId: f.productId, kind: f.kind });
    } catch (err) {
      setMsg(errMsg(err));
    } finally {
      setBusy(false);
    }
  }

  const shown = [...(rows ?? [])].filter((r) => filter === "all" || r.productId === filter).sort((a, b) => String(a.productId).localeCompare(String(b.productId)) || Number(a.order) - Number(b.order));

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
      <Panel title={f.id ? "Edit premium item" : "Add premium content"} action={f.id && <button className={ghostBtn} onClick={() => setF(blank)}>Cancel edit</button>}>
        <form onSubmit={save} className="space-y-3.5">
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Unlocked by">
              <select className={inputCls} value={f.productId} onChange={(e) => set("productId", e.target.value)}>
                {options.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
            </Field>
            <Field label="Type">
              <select className={inputCls} value={f.kind} onChange={(e) => set("kind", e.target.value)}>
                <option value="pdf">PDF download</option>
                <option value="article">Study guide (text)</option>
                <option value="video">Class video</option>
              </select>
            </Field>
          </div>
          <Field label="Title"><input required className={inputCls} value={f.title} onChange={(e) => set("title", e.target.value)} /></Field>
          <Field label="Description"><textarea rows={2} className={inputCls} value={f.description} onChange={(e) => set("description", e.target.value)} /></Field>
          {f.kind !== "article" && (
            <Field label={f.kind === "video" ? "Video link" : "PDF link"} hint={f.kind === "video" ? "Use a YouTube link set to Unlisted. It plays inside the site." : "A file link. Anyone who has this link could share it, so prefer an unlisted or expiring host."}>
              <input type="url" required className={inputCls} value={f.url} onChange={(e) => set("url", e.target.value)} placeholder="https://" />
            </Field>
          )}
          {f.kind === "article" && (
            <Field label="Body" hint="One paragraph per line. ## for a heading, - for a bullet."><textarea required rows={10} className={`${inputCls} font-mono`} value={f.body} onChange={(e) => set("body", e.target.value)} /></Field>
          )}
          <Field label="Order" hint="Lower numbers show first."><input type="number" className={inputCls} value={f.order} onChange={(e) => set("order", e.target.value)} /></Field>
          <button disabled={busy} className={goldBtn}><Plus size={16} /> {f.id ? "Save changes" : "Add content"}</button>
          <Status msg={msg} />
        </form>
      </Panel>

      <Panel title={`Premium content (${shown.length})`} action={
        <select className={`${inputCls} !w-auto`} value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by product">
          <option value="all">All products</option>
          {options.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
      }>
        {error && <Status msg={`Could not load: ${error}`} />}
        {rows?.length === 0 && !error && <p className="text-sm text-[#6b7589]">No premium content yet. Add a PDF, guide or class video and choose which product unlocks it.</p>}
        <ul className="divide-y divide-[#eef1f6]">
          {shown.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate font-extrabold text-[#0c2556]">{String(r.title)}</p>
                <p className="truncate text-xs text-[#6b7589]"><span className="font-bold uppercase">{String(r.kind)}</span> · {nameOf(String(r.productId))}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button aria-label="Edit" onClick={() => { setF({ id: r.id, productId: String(r.productId), kind: String(r.kind), title: String(r.title), description: String(r.description ?? ""), url: String(r.url ?? ""), body: String(r.body ?? ""), order: String(r.order ?? 0) }); window.scrollTo({ top: 0 }); }} className="rounded-lg p-2 text-[#1c4cb0] hover:bg-[#eef3fb]"><Pencil size={16} /></button>
                <button aria-label="Delete" onClick={() => confirm("Delete this item?") && db && deleteDoc(doc(db, "premium", r.id))} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
