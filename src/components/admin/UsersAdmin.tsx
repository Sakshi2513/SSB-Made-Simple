"use client";

import { useMemo, useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Search, ShieldCheck, Trash2, UserRound } from "lucide-react";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Panel, Status, errMsg, inputCls, useCollection } from "./ui";

const when = (v: unknown) => {
  const ms = (v as { toMillis?: () => number } | undefined)?.toMillis?.();
  return ms ? new Date(ms).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "-";
};

export default function UsersAdmin() {
  const { user } = useAuth();
  const { rows, error } = useCollection("users");
  const [q, setQ] = useState("");
  const [msg, setMsg] = useState("");

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return [...(rows ?? [])]
      .filter((r) => !t || `${r.name} ${r.email} ${r.targetExam}`.toLowerCase().includes(t))
      .sort((a, b) => ((b.createdAt as { toMillis?: () => number })?.toMillis?.() ?? 0) - ((a.createdAt as { toMillis?: () => number })?.toMillis?.() ?? 0));
  }, [rows, q]);

  async function setRole(id: string, role: "admin" | "user") {
    if (!db) return;
    if (!confirm(role === "admin" ? "Give this person full admin access?" : "Remove admin access from this person?")) return;
    try {
      await updateDoc(doc(db, "users", id), { role });
      setMsg(`Role changed to ${role}.`);
    } catch (e) {
      setMsg(errMsg(e));
    }
  }

  return (
    <Panel title={`Users (${rows?.length ?? 0})`}>
      <div className="relative mb-4 max-w-md">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7589]" />
        <input className={`${inputCls} !pl-10`} placeholder="Search name, email or exam" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {error && <Status msg={`Could not load: ${error}`} />}
      <Status msg={msg} />
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead>
            <tr className="border-b border-[#eef1f6] text-xs font-bold uppercase tracking-wider text-[#6b7589]">
              <th className="py-2 pr-3">User</th><th className="py-2 pr-3">Target exam</th><th className="py-2 pr-3">Joined</th><th className="py-2 pr-3">Role</th><th className="py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eef1f6]">
            {list.map((r) => {
              const admin = r.role === "admin";
              const me = r.id === user?.uid;
              return (
                <tr key={r.id}>
                  <td className="py-3 pr-3">
                    <p className="font-extrabold text-[#0c2556]">{String(r.name || "Unnamed")} {me && <span className="ml-1 rounded bg-[#eef3fb] px-1.5 py-0.5 text-[0.65rem] font-bold text-[#1c4cb0]">You</span>}</p>
                    <p className="text-xs text-[#6b7589]">{String(r.email)}</p>
                  </td>
                  <td className="py-3 pr-3 text-[#4d5b76]">{String(r.targetExam || "-")}</td>
                  <td className="py-3 pr-3 text-[#4d5b76]">{when(r.createdAt)}</td>
                  <td className="py-3 pr-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-extrabold ${admin ? "bg-gold/30 text-[#7a5a00]" : "bg-[#eef3fb] text-[#4d5b76]"}`}>
                      {admin ? <ShieldCheck size={12} /> : <UserRound size={12} />} {admin ? "Admin" : "Student"}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    {!me && (
                      <div className="flex justify-end gap-1">
                        <button onClick={() => setRole(r.id, admin ? "user" : "admin")} className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#1c4cb0] hover:bg-[#eef3fb]">{admin ? "Remove admin" : "Make admin"}</button>
                        <button aria-label="Delete profile" onClick={() => confirm("Delete this profile record? Their login account stays; it is recreated at next login.") && db && deleteDoc(doc(db, "users", r.id))} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={15} /></button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows !== null && list.length === 0 && <p className="py-6 text-center text-sm text-[#6b7589]">No users found.</p>}
      </div>
    </Panel>
  );
}
