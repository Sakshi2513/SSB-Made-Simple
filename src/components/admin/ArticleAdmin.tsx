"use client";

import { useState } from "react";
import { deleteDoc, doc, setDoc, writeBatch } from "firebase/firestore";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { posts as builtinPosts } from "@/content/posts";
import { materials as builtinMaterials } from "@/content/materials";
import { Field, Panel, Status, errMsg, ghostBtn, goldBtn, inputCls, primaryBtn, useCollection } from "./ui";

type Kind = "posts" | "materials";

const today = () => new Date().toISOString().slice(0, 10);
const blank = () => ({ slug: "", title: "", category: "", author: "Hitender Rohilla", date: today(), readMins: "4", summary: "", body: "", tags: "", status: "published" });
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// One editor for both blog posts and study guides.
export default function ArticleAdmin({ kind }: { kind: Kind }) {
  const isPost = kind === "posts";
  const noun = isPost ? "post" : "study guide";
  const { rows, error } = useCollection(kind);
  const [f, setF] = useState(blank);
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k: keyof ReturnType<typeof blank>, v: string) => setF((p) => ({ ...p, [k]: v }));
  const reset = () => { setF(blank()); setEditing(false); };

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!db) return;
    const slug = editing ? f.slug : slugify(f.slug || f.title);
    if (!slug) return setMsg("Could not save: add a title.");
    setBusy(true);
    setMsg("");
    try {
      const common = { tags: f.tags.trim(), status: f.status, updatedAt: today() };
      const data = isPost
        ? { ...common, title: f.title.trim(), category: f.category.trim() || "General", author: f.author.trim(), date: f.date, readMins: Number(f.readMins) || 3, excerpt: f.summary.trim(), body: f.body }
        : { ...common, title: f.title.trim(), category: f.category.trim() || "General", summary: f.summary.trim(), body: f.body };
      await setDoc(doc(db, kind, slug), data);
      setMsg(f.status === "draft" ? "Saved as a draft. It is hidden from the site." : f.date > today() && isPost ? "Saved. It is scheduled and appears on its date." : `Saved. The ${noun} is live on the site within a minute.`);
      reset();
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
      if (isPost) builtinPosts.forEach((p) => b.set(doc(db!, "posts", p.slug), { title: p.title, category: p.category, author: p.author, date: p.date, readMins: p.readMins, excerpt: p.excerpt, body: p.body.join("\n") }));
      else builtinMaterials.forEach((m) => b.set(doc(db!, "materials", m.slug), { title: m.title, category: m.category, summary: m.summary, body: m.body.join("\n") }));
      await b.commit();
      setMsg(`Built-in ${noun}s imported. You can now edit or delete them.`);
    } catch (err) {
      setMsg(errMsg(err));
    } finally {
      setBusy(false);
    }
  }

  function edit(r: Record<string, unknown>) {
    setF({
      slug: String(r.id),
      title: String(r.title ?? ""),
      category: String(r.category ?? ""),
      author: String(r.author ?? ""),
      date: String(r.date ?? today()),
      readMins: String(r.readMins ?? "4"),
      summary: String(isPost ? r.excerpt ?? "" : r.summary ?? ""),
      body: String(r.body ?? ""),
      tags: String(r.tags ?? ""),
      status: String(r.status ?? "published"),
    });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const sorted = [...(rows ?? [])].sort((a, b) => (isPost ? String(b.date).localeCompare(String(a.date)) : String(a.title).localeCompare(String(b.title))));
  const path = isPost ? "blog" : "study-material";

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_1fr]">
      <Panel title={editing ? `Editing: ${f.slug}` : `New ${noun}`} action={editing && <button className={ghostBtn} onClick={reset}>Cancel edit</button>}>
        <form onSubmit={save} className="space-y-3.5">
          <Field label="Title"><input required className={inputCls} value={f.title} onChange={(e) => set("title", e.target.value)} /></Field>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Category"><input className={inputCls} value={f.category} onChange={(e) => set("category", e.target.value)} placeholder={isPost ? "Preparation Tips" : "Interview"} /></Field>
            {isPost && <Field label="Author"><input className={inputCls} value={f.author} onChange={(e) => set("author", e.target.value)} /></Field>}
            {isPost && <Field label="Date"><input type="date" className={inputCls} value={f.date} onChange={(e) => set("date", e.target.value)} /></Field>}
            {isPost && <Field label="Read time (minutes)"><input type="number" min={1} className={inputCls} value={f.readMins} onChange={(e) => set("readMins", e.target.value)} /></Field>}
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Field label="Status" hint={isPost ? "Draft hides it. A future date schedules it." : "Draft hides it from the site."}>
              <select className={inputCls} value={f.status} onChange={(e) => set("status", e.target.value)}>
                <option value="published">Published</option>
                <option value="draft">Draft (hidden)</option>
              </select>
            </Field>
            <Field label="Tags" hint="Comma separated, e.g. TAT, stories, Day 2"><input className={inputCls} value={f.tags} onChange={(e) => set("tags", e.target.value)} /></Field>
          </div>
          {!editing && <Field label="URL slug" hint="Optional. Leave blank to build it from the title. It cannot be changed later."><input className={inputCls} value={f.slug} onChange={(e) => set("slug", e.target.value)} /></Field>}
          <Field label="Short summary"><textarea rows={2} className={inputCls} value={f.summary} onChange={(e) => set("summary", e.target.value)} /></Field>
          <Field label="Body" hint="One paragraph per line. Start a line with ## for a heading and with - for a bullet.">
            <textarea required rows={12} className={`${inputCls} font-mono`} value={f.body} onChange={(e) => set("body", e.target.value)} />
          </Field>
          <button disabled={busy} className={goldBtn}><Plus size={16} /> {editing ? "Save changes" : `Publish ${noun}`}</button>
          <Status msg={msg} />
        </form>
      </Panel>

      <Panel title={`${isPost ? "Posts" : "Study guides"} (${rows?.length ?? 0})`} action={rows?.length === 0 && <button disabled={busy} onClick={importBuiltin} className={primaryBtn}>Import built-in</button>}>
        {error && <Status msg={`Could not load: ${error}`} />}
        {rows === null && <p className="text-sm text-[#6b7589]">Loading...</p>}
        {rows?.length === 0 && !error && <p className="text-sm text-[#6b7589]">Nothing in Firestore yet, so the site shows its built-in {noun}s. Import them to manage them here, or publish a new one.</p>}
        <ul className="divide-y divide-[#eef1f6]">
          {sorted.map((r) => (
            <li key={r.id} className="flex items-start justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate font-extrabold text-[#0c2556]">{String(r.title)} {r.status === "draft" && <span className="ml-1 rounded bg-[#fff3d6] px-1.5 py-0.5 text-[0.65rem] font-bold text-[#8a5a00]">Draft</span>}{isPost && r.status !== "draft" && String(r.date) > today() && <span className="ml-1 rounded bg-[#eef3fb] px-1.5 py-0.5 text-[0.65rem] font-bold text-[#1c4cb0]">Scheduled</span>}</p>
                <p className="truncate text-xs text-[#6b7589]">{String(r.category)}{isPost ? ` · ${String(r.date)}` : ""} · updated {String(r.updatedAt || "never")}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <a aria-label="View on site" href={`/${path}/${r.id}`} target="_blank" rel="noreferrer" className="rounded-lg px-2 py-2 text-xs font-bold text-[#6b7589] hover:bg-[#eef3fb]">View</a>
                <button aria-label="Edit" onClick={() => edit(r)} className="rounded-lg p-2 text-[#1c4cb0] hover:bg-[#eef3fb]"><Pencil size={16} /></button>
                <button aria-label="Delete" onClick={() => confirm(`Delete this ${noun}?`) && db && deleteDoc(doc(db, kind, r.id))} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
