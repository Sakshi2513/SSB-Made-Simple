"use client";

import { useMemo, useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { CheckCircle2, ExternalLink, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { Panel, Status, useCollection } from "./ui";

const ms = (v: unknown) => (v as { toMillis?: () => number } | undefined)?.toMillis?.() ?? 0;

export default function ReportsAdmin() {
  const { rows, error } = useCollection("reports");
  const [showDone, setShowDone] = useState(false);
  const list = useMemo(
    () => [...(rows ?? [])].filter((r) => (showDone ? r.status === "done" : r.status !== "done")).sort((a, b) => ms(b.createdAt) - ms(a.createdAt)),
    [rows, showDone],
  );
  const open = (rows ?? []).filter((r) => r.status !== "done").length;

  return (
    <Panel
      title={`${showDone ? "Resolved" : "Open"} reports (${list.length})`}
      action={<button onClick={() => setShowDone((v) => !v)} className="rounded-xl border-2 border-[#dfe6f2] bg-white px-4 py-2 text-sm font-bold text-[#0c2556] hover:border-[#0c2556]">{showDone ? `Show open (${open})` : "Show resolved"}</button>}
    >
      {error && <Status msg={`Could not load: ${error}`} />}
      {list.length === 0 && !error && <p className="text-sm text-[#6b7589]">{showDone ? "Nothing resolved yet." : "No open reports. Students can flag mistakes from any blog post or study guide."}</p>}
      <ul className="divide-y divide-[#eef1f6]">
        {list.map((r) => (
          <li key={r.id} className="py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-extrabold text-[#0c2556]">{String(r.title || r.page)}</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-[#33415c]">{String(r.message)}</p>
                <p className="mt-1 text-xs text-[#6b7589]">
                  {ms(r.createdAt) ? new Date(ms(r.createdAt)).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : ""}
                  {r.email ? ` · ${String(r.email)}` : ""}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <a href={String(r.page)} target="_blank" rel="noreferrer" aria-label="Open page" className="rounded-lg p-2 text-[#1c4cb0] hover:bg-[#eef3fb]"><ExternalLink size={16} /></a>
                <button aria-label={r.status === "done" ? "Reopen" : "Mark resolved"} title={r.status === "done" ? "Reopen" : "Mark resolved"} onClick={() => db && updateDoc(doc(db, "reports", r.id), { status: r.status === "done" ? "open" : "done" })} className="rounded-lg p-2 text-[#3d6b24] hover:bg-[#e4f1dc]"><CheckCircle2 size={16} /></button>
                <button aria-label="Delete" onClick={() => confirm("Delete this report?") && db && deleteDoc(doc(db, "reports", r.id))} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
