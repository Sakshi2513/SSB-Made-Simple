"use client";

import { useState } from "react";
import { deleteDoc, doc, setDoc, writeBatch } from "firebase/firestore";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { builtinProducts } from "@/content/products";
import { Field, Panel, Status, errMsg, ghostBtn, goldBtn, inputCls, primaryBtn, useCollection } from "./ui";

const blank = { id: "", name: "", price: "", type: "pack", durationDays: "0", includesText: "", featuresText: "", accent: "#3b9cff", order: "10", active: true };
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function ProductsAdmin() {
  const { rows, error } = useCollection("products");
  const [f, setF] = useState(blank);
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const set = <K extends keyof typeof blank>(k: K, v: (typeof blank)[K]) => setF((p) => ({ ...p, [k]: v }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!db) return;
    const id = editing ? f.id : slugify(f.id || f.name);
    if (!id || !(Number(f.price) > 0)) return setMsg("Could not save: add a name and a price above 0.");
    setBusy(true);
    setMsg("");
    try {
      await setDoc(doc(db, "products", id), {
        name: f.name.trim(),
        price: Number(f.price),
        type: f.type,
        durationDays: Number(f.durationDays) || 0,
        includesText: f.includesText.trim(),
        featuresText: f.featuresText,
        accent: f.accent,
        order: Number(f.order) || 0,
        active: f.active,
      });
      setMsg("Saved. The new price is used for checkout immediately.");
      setF(blank);
      setEditing(false);
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
      builtinProducts.forEach((p) =>
        b.set(doc(db!, "products", p.id), { name: p.name, price: p.price, type: p.type, durationDays: p.durationDays, includesText: p.includes.join(", "), featuresText: p.features.join("\n"), accent: p.accent, order: p.order, active: true }),
      );
      await b.commit();
      setMsg("Built-in products imported. You can now edit prices and details.");
    } catch (err) {
      setMsg(errMsg(err));
    } finally {
      setBusy(false);
    }
  }

  const sorted = [...(rows ?? [])].sort((a, b) => Number(a.order) - Number(b.order));

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <Panel title={editing ? `Editing: ${f.id}` : "Add a product"} action={editing && <button className={ghostBtn} onClick={() => { setF(blank); setEditing(false); }}>Cancel edit</button>}>
        <form onSubmit={save} className="space-y-3.5">
          <Field label="Name"><input required className={inputCls} value={f.name} onChange={(e) => set("name", e.target.value)} /></Field>
          <div className="grid gap-3.5 sm:grid-cols-3">
            <Field label="Price (₹)"><input required type="number" min={1} className={inputCls} value={f.price} onChange={(e) => set("price", e.target.value)} /></Field>
            <Field label="Type">
              <select className={inputCls} value={f.type} onChange={(e) => set("type", e.target.value)}>
                <option value="pack">Pack</option>
                <option value="plan">Plan</option>
              </select>
            </Field>
            <Field label="Access (days)" hint="0 = lifetime"><input type="number" min={0} className={inputCls} value={f.durationDays} onChange={(e) => set("durationDays", e.target.value)} /></Field>
          </div>
          <Field label="Also unlocks (product IDs)" hint="Comma separated. A plan usually unlocks every pack, for example pack-oir, pack-gto."><input className={inputCls} value={f.includesText} onChange={(e) => set("includesText", e.target.value)} /></Field>
          <Field label="What is included" hint="One point per line."><textarea rows={4} className={inputCls} value={f.featuresText} onChange={(e) => set("featuresText", e.target.value)} /></Field>
          <div className="grid gap-3.5 sm:grid-cols-3">
            <Field label="Colour"><input type="color" className={`${inputCls} h-11 p-1`} value={f.accent} onChange={(e) => set("accent", e.target.value)} /></Field>
            <Field label="Order"><input type="number" className={inputCls} value={f.order} onChange={(e) => set("order", e.target.value)} /></Field>
            <label className="flex items-end gap-2 pb-3 text-sm font-bold text-[#0c2556]"><input type="checkbox" checked={f.active} onChange={(e) => set("active", e.target.checked)} className="h-5 w-5 accent-[#1c4cb0]" /> On sale</label>
          </div>
          {!editing && <Field label="Product ID" hint="Optional. Built from the name if blank. It cannot be changed later."><input className={inputCls} value={f.id} onChange={(e) => set("id", e.target.value)} /></Field>}
          <button disabled={busy} className={goldBtn}><Plus size={16} /> {editing ? "Save changes" : "Add product"}</button>
          <Status msg={msg} />
        </form>
      </Panel>

      <Panel title={`Products (${rows?.length ?? 0})`} action={rows?.length === 0 && <button disabled={busy} onClick={importBuiltin} className={primaryBtn}>Import built-in products</button>}>
        {error && <Status msg={`Could not load: ${error}`} />}
        {rows?.length === 0 && !error && <p className="text-sm text-[#6b7589]">Nothing here yet, so the site sells the built-in plan and packs. Import them to change prices.</p>}
        <ul className="divide-y divide-[#eef1f6]">
          {sorted.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate font-extrabold text-[#0c2556]">{String(r.name)} {r.active === false && <span className="ml-1 rounded bg-red-50 px-1.5 py-0.5 text-[0.65rem] font-bold text-red-600">Off sale</span>}</p>
                <p className="truncate text-xs text-[#6b7589]">₹{String(r.price)} · {Number(r.durationDays) > 0 ? `${r.durationDays} days` : "Lifetime"} · ID: {r.id}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button aria-label="Edit" onClick={() => { setF({ id: r.id, name: String(r.name), price: String(r.price), type: String(r.type ?? "pack"), durationDays: String(r.durationDays ?? 0), includesText: String(r.includesText ?? ""), featuresText: String(r.featuresText ?? ""), accent: String(r.accent ?? "#3b9cff"), order: String(r.order ?? 0), active: r.active !== false }); setEditing(true); window.scrollTo({ top: 0 }); }} className="rounded-lg p-2 text-[#1c4cb0] hover:bg-[#eef3fb]"><Pencil size={16} /></button>
                <button aria-label="Delete" onClick={() => confirm("Delete this product? Existing buyers keep their access.") && db && deleteDoc(doc(db, "products", r.id))} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
