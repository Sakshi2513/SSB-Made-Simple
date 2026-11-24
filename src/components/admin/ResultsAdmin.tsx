"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Panel, Status, useCollection } from "./ui";

type Result = { id: string; uid: string; type: string; score?: number; total?: number; at: number; responses?: number };

export function useResults(max = 100) {
  const [rows, setRows] = useState<Result[] | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!db) return;
    return onSnapshot(
      query(collection(db, "testResults"), orderBy("createdAt", "desc"), limit(max)),
      (snap) =>
        setRows(
          snap.docs.map((d) => {
            const x = d.data();
            return { id: d.id, uid: String(x.uid), type: String(x.type), score: x.score, total: x.total, at: x.createdAt?.toMillis?.() ?? 0, responses: Array.isArray(x.responses) ? x.responses.length : undefined };
          }),
        ),
      (e) => { setError(e.message); setRows([]); },
    );
  }, [max]);
  return { rows, error };
}

export default function ResultsAdmin() {
  const { rows, error } = useResults(200);
  const users = useCollection("users");
  const names = useMemo(() => Object.fromEntries((users.rows ?? []).map((u) => [u.id, String(u.name || u.email || "Unknown")])), [users.rows]);

  const byType = useMemo(() => {
    const m: Record<string, number> = {};
    (rows ?? []).forEach((r) => (m[r.type] = (m[r.type] ?? 0) + 1));
    return m;
  }, [rows]);
  const oir = (rows ?? []).filter((r) => r.type === "oir" && r.total);
  const avg = oir.length ? Math.round((oir.reduce((s, r) => s + (r.score ?? 0) / (r.total ?? 1), 0) / oir.length) * 100) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {["oir", "wat", "srt", "tat"].map((t) => (
          <div key={t} className="rounded-2xl border border-[#dfe6f2] bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[#6b7589]">{t} attempts</p>
            <p className="mt-1 text-3xl font-black text-[#0c2556]">{byType[t] ?? 0}</p>
          </div>
        ))}
        <div className="rounded-2xl border border-[#dfe6f2] bg-gradient-to-br from-[#0c2556] to-[#12306b] p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-white/70">Average OIR score</p>
          <p className="mt-1 text-3xl font-black text-gold">{avg === null ? "-" : `${avg}%`}</p>
        </div>
      </div>
      <Panel title={`Recent test attempts (${rows?.length ?? 0})`}>
        {error && <Status msg={`Could not load: ${error}`} />}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-[#eef1f6] text-xs font-bold uppercase tracking-wider text-[#6b7589]"><th className="py-2 pr-3">Student</th><th className="py-2 pr-3">Test</th><th className="py-2 pr-3">Result</th><th className="py-2">When</th></tr>
            </thead>
            <tbody className="divide-y divide-[#eef1f6]">
              {(rows ?? []).map((r) => (
                <tr key={r.id}>
                  <td className="py-2.5 pr-3 font-bold text-[#0c2556]">{names[r.uid] ?? r.uid.slice(0, 8)}</td>
                  <td className="py-2.5 pr-3 uppercase text-[#4d5b76]">{r.type}</td>
                  <td className="py-2.5 pr-3 text-[#4d5b76]">{r.total ? `${r.score} / ${r.total}` : r.responses !== undefined ? `${r.responses} responses` : "-"}</td>
                  <td className="py-2.5 text-[#6b7589]">{r.at ? new Date(r.at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows?.length === 0 && !error && <p className="py-6 text-center text-sm text-[#6b7589]">No tests taken yet.</p>}
        </div>
      </Panel>
    </div>
  );
}
