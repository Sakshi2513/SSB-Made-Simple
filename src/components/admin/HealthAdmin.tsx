"use client";

import { useMemo, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { AlertTriangle, CheckCircle2, Clock, FileWarning, Flag } from "lucide-react";
import { db } from "@/lib/firebase";
import { Panel, errMsg, Status, useCollection } from "./ui";

const STALE_DAYS = 180;
const today = () => new Date().toISOString().slice(0, 10);
const daysSince = (d: string) => Math.floor((Date.now() - new Date(d).getTime()) / 86_400_000);
const words = (s: unknown) => String(s ?? "").split(/\s+/).filter(Boolean).length;

type Issue = { id: string; col: string; kind: string; title: string; problems: string[]; age: number | null };

export default function HealthAdmin({ go }: { go: (id: string) => void }) {
  const posts = useCollection("posts");
  const materials = useCollection("materials");
  const premium = useCollection("premium");
  const reports = useCollection("reports");
  const [msg, setMsg] = useState("");

  const { issues, counts } = useMemo(() => {
    const out: Issue[] = [];
    const check = (col: string, kind: string, rows: { id: string }[] | null, summaryKey: string) => {
      (rows ?? []).forEach((r) => {
        const x = r as Record<string, unknown>;
        const problems: string[] = [];
        const upd = x.updatedAt ? String(x.updatedAt) : "";
        const age = upd ? daysSince(upd) : null;
        if (age === null) problems.push("Never reviewed");
        else if (age > STALE_DAYS) problems.push(`Not updated for ${age} days`);
        if (x.status === "draft") problems.push("Still a draft");
        if (kind !== "Premium" && !String(x[summaryKey] ?? "").trim()) problems.push("No summary");
        if (kind !== "Premium" && words(x.body) < 120) problems.push("Very short (under 120 words)");
        if (kind === "Premium" && (x.kind === "pdf" || x.kind === "video") && !String(x.url ?? "").trim()) problems.push("Missing file link");
        if (problems.length) out.push({ id: r.id, col, kind, title: String(x.title ?? r.id), problems, age });
      });
    };
    check("posts", "Blog post", posts.rows, "excerpt");
    check("materials", "Study guide", materials.rows, "summary");
    check("premium", "Premium", premium.rows, "");
    const total = (posts.rows?.length ?? 0) + (materials.rows?.length ?? 0) + (premium.rows?.length ?? 0);
    return { issues: out.sort((a, b) => (b.age ?? 9999) - (a.age ?? 9999)), counts: { total, ok: total - out.length, openReports: (reports.rows ?? []).filter((r) => r.status !== "done").length } };
  }, [posts.rows, materials.rows, premium.rows, reports.rows]);

  async function markReviewed(i: Issue) {
    if (!db) return;
    try {
      await updateDoc(doc(db, i.col, i.id), { updatedAt: today() });
      setMsg(`"${i.title}" marked as reviewed today.`);
    } catch (e) {
      setMsg(errMsg(e));
    }
  }

  const loading = posts.rows === null || materials.rows === null || premium.rows === null;
  const tab = (c: string) => (c === "posts" ? "posts" : c === "materials" ? "materials" : "premium");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-2xl border border-[#dfe6f2] bg-white p-4"><p className="text-xs font-bold uppercase tracking-wider text-[#6b7589]">Items tracked</p><p className="mt-1 text-3xl font-black text-[#0c2556]">{counts.total}</p></div>
        <div className="rounded-2xl border border-[#dfe6f2] bg-white p-4"><p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3d6b24]"><CheckCircle2 size={14} /> Healthy</p><p className="mt-1 text-3xl font-black text-[#0c2556]">{counts.ok}</p></div>
        <div className="rounded-2xl border border-[#dfe6f2] bg-white p-4"><p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8a5a00]"><AlertTriangle size={14} /> Needs attention</p><p className="mt-1 text-3xl font-black text-[#0c2556]">{issues.length}</p></div>
        <button onClick={() => go("reports")} className="rounded-2xl bg-gradient-to-br from-[#0c2556] to-[#12306b] p-4 text-left text-white transition hover:-translate-y-0.5"><p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/70"><Flag size={14} /> Open reports</p><p className="mt-1 text-3xl font-black text-gold">{counts.openReports}</p></button>
      </div>

      <Panel title={`Needs attention (${issues.length})`}>
        <p className="mb-3 flex items-center gap-2 text-sm text-[#4d5b76]"><Clock size={15} /> Content not updated in {STALE_DAYS} days is flagged. Review it, fix anything outdated, then press <b>Mark reviewed</b>.</p>
        <Status msg={msg} />
        {loading && <p className="text-sm text-[#6b7589]">Loading...</p>}
        {!loading && counts.total === 0 && <p className="text-sm text-[#6b7589]">No content in the database yet. Import the built-in articles and guides first, then this page tracks them.</p>}
        {!loading && counts.total > 0 && issues.length === 0 && <p className="font-bold text-[#3d6b24]">Everything is up to date. Nice.</p>}
        <ul className="divide-y divide-[#eef1f6]">
          {issues.map((i) => (
            <li key={`${i.col}-${i.id}`} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate font-extrabold text-[#0c2556]">{i.title} <span className="ml-1 rounded bg-[#eef3fb] px-1.5 py-0.5 text-[0.65rem] font-bold uppercase text-[#1c4cb0]">{i.kind}</span></p>
                <p className="mt-0.5 flex flex-wrap gap-1.5">
                  {i.problems.map((p) => <span key={p} className="inline-flex items-center gap-1 rounded-full bg-[#fff3d6] px-2 py-0.5 text-xs font-bold text-[#8a5a00]"><FileWarning size={11} /> {p}</span>)}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => go(tab(i.col))} className="rounded-lg border border-[#dfe6f2] px-3 py-1.5 text-xs font-bold text-[#0c2556] hover:border-[#0c2556]">Edit</button>
                <button onClick={() => markReviewed(i)} className="rounded-lg bg-[#e4f1dc] px-3 py-1.5 text-xs font-bold text-[#3d6b24] hover:brightness-95">Mark reviewed</button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
