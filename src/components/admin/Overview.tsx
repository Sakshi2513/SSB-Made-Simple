"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { Bell, BookOpen, ClipboardCheck, Download, FileText, HelpCircle, Users } from "lucide-react";
import { db } from "@/lib/firebase";
import { Panel, useCollection } from "./ui";
import { useResults } from "./ResultsAdmin";

type Go = (id: string) => void;

const stats = [
  { col: "users", label: "Students", Icon: Users, c: "#3b9cff", go: "users" },
  { col: "testResults", label: "Tests taken", Icon: ClipboardCheck, c: "#ffd21f", go: "results" },
  { col: "posts", label: "Blog posts", Icon: FileText, c: "#6aa84a", go: "posts" },
  { col: "materials", label: "Study guides", Icon: BookOpen, c: "#8a63d2", go: "materials" },
  { col: "downloads", label: "Downloads", Icon: Download, c: "#ff8f1f", go: "downloads" },
  { col: "questions", label: "Test questions", Icon: HelpCircle, c: "#2f6b3a", go: "questions" },
  { col: "notifications", label: "Notices", Icon: Bell, c: "#e0527a", go: "notices" },
];

const ms = (v: unknown) => (v as { toMillis?: () => number } | undefined)?.toMillis?.() ?? 0;

export default function Overview({ go }: { go: Go }) {
  const [counts, setCounts] = useState<Record<string, number | null>>({});
  const users = useCollection("users");
  const results = useResults(8);

  useEffect(() => {
    if (!db) return;
    stats.forEach(({ col }) =>
      getCountFromServer(collection(db!, col))
        .then((s) => setCounts((c) => ({ ...c, [col]: s.data().count })))
        .catch(() => setCounts((c) => ({ ...c, [col]: null }))),
    );
  }, []);

  const recentUsers = useMemo(() => [...(users.rows ?? [])].sort((a, b) => ms(b.createdAt) - ms(a.createdAt)).slice(0, 6), [users.rows]);
  const names = useMemo(() => Object.fromEntries((users.rows ?? []).map((u) => [u.id, String(u.name || u.email || "Unknown")])), [users.rows]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {stats.map(({ col, label, Icon, c, go: to }) => (
          <button key={col} onClick={() => go(to)} className="group rounded-2xl border border-[#dfe6f2] bg-white p-4 text-left shadow-[0_14px_30px_-24px_rgba(12,37,86,0.6)] transition hover:-translate-y-1 hover:border-gold">
            <span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: c, color: c === "#ffd21f" ? "#0c2556" : "#fff" }}><Icon size={19} /></span>
            <p className="mt-3 text-3xl font-black text-[#0c2556]">{counts[col] === undefined ? "…" : counts[col] ?? "-"}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-[#6b7589]">{label}</p>
          </button>
        ))}
        <div className="rounded-2xl bg-gradient-to-br from-[#0c2556] to-[#12306b] p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-white/70">Quick actions</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[["posts", "New post"], ["notices", "Notice"], ["downloads", "PDF"], ["settings", "Banner"]].map(([id, l]) => (
              <button key={id} onClick={() => go(id)} className="rounded-lg bg-white/15 px-2.5 py-1.5 text-xs font-bold hover:bg-gold hover:text-[#0c2556]">{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Newest students" action={<button onClick={() => go("users")} className="text-sm font-bold text-[#1c4cb0]">View all</button>}>
          <ul className="divide-y divide-[#eef1f6]">
            {recentUsers.map((u) => (
              <li key={u.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0"><p className="truncate font-bold text-[#0c2556]">{String(u.name || "Unnamed")}</p><p className="truncate text-xs text-[#6b7589]">{String(u.email)}</p></div>
                <span className="shrink-0 text-xs font-semibold text-[#4d5b76]">{String(u.targetExam || "")}</span>
              </li>
            ))}
            {recentUsers.length === 0 && <li className="py-4 text-sm text-[#6b7589]">No students yet.</li>}
          </ul>
        </Panel>
        <Panel title="Latest test attempts" action={<button onClick={() => go("results")} className="text-sm font-bold text-[#1c4cb0]">View all</button>}>
          <ul className="divide-y divide-[#eef1f6]">
            {(results.rows ?? []).map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 py-2.5">
                <p className="truncate font-bold text-[#0c2556]">{names[r.uid] ?? r.uid.slice(0, 8)}</p>
                <span className="shrink-0 rounded-full bg-[#eef3fb] px-2.5 py-1 text-xs font-extrabold uppercase text-[#1c4cb0]">{r.type}{r.total ? ` ${r.score}/${r.total}` : ""}</span>
              </li>
            ))}
            {results.rows?.length === 0 && <li className="py-4 text-sm text-[#6b7589]">No tests taken yet.</li>}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
