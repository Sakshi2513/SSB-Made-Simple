"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs, type Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Row = { id: string; type: string; score?: number; total?: number; count?: number; at: number };

export default function RecentResults({ uid }: { uid: string }) {
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    if (!db) return;
    getDocs(query(collection(db, "testResults"), where("uid", "==", uid)))
      .then((snap) => {
        const r = snap.docs.map((d) => {
          const x = d.data();
          return {
            id: d.id,
            type: String(x.type).toUpperCase(),
            score: x.score,
            total: x.total,
            count: Array.isArray(x.responses) ? x.responses.length : undefined,
            at: (x.createdAt as Timestamp | null)?.toMillis?.() ?? 0,
          };
        });
        setRows(r.sort((a, b) => b.at - a.at).slice(0, 10));
      })
      .catch(() => setRows([]));
  }, [uid]);

  if (rows === null) return <p className="text-sm text-muted">Loading results...</p>;
  if (rows.length === 0) return <p className="text-sm text-muted">No tests taken yet.</p>;

  return (
    <ul className="divide-y divide-border">
      {rows.map((r) => (
        <li key={r.id} className="flex items-center justify-between py-2 text-sm">
          <span className="font-semibold">{r.type}</span>
          <span className="text-muted">
            {r.score !== undefined ? `${r.score}/${r.total}` : `${r.count ?? 0} responses`}
            {r.at ? ` · ${new Date(r.at).toLocaleDateString("en-IN")}` : ""}
          </span>
        </li>
      ))}
    </ul>
  );
}
