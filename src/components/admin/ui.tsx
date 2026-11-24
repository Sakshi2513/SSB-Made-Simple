"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const inputCls =
  "w-full rounded-xl border border-[#dfe6f2] bg-[#f6f8fc] px-3.5 py-2.5 text-sm font-medium text-[#0c2556] outline-none transition focus:border-[#1c4cb0] focus:bg-white focus:ring-4 focus:ring-[#1c4cb0]/15";
export const labelCls = "mb-1 block text-xs font-bold uppercase tracking-wider text-[#4d5b76]";
export const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#0c2556] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#143a82] disabled:opacity-60";
export const goldBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-2.5 text-sm font-black text-[#0c2556] transition hover:brightness-105 disabled:opacity-60";
export const ghostBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#dfe6f2] bg-white px-4 py-2 text-sm font-bold text-[#0c2556] transition hover:border-[#0c2556]";

export type DocRow = { id: string } & Record<string, unknown>;

// Live list of a Firestore collection, with errors surfaced instead of swallowed.
export function useCollection(name: string) {
  const [rows, setRows] = useState<DocRow[] | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!db) return;
    return onSnapshot(
      collection(db, name),
      (snap) => setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (e) => {
        setError(e.message);
        setRows([]);
      },
    );
  }, [name]);
  return { rows, error };
}

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-[#6b7589]">{hint}</p>}
    </div>
  );
}

export function Panel({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-[#dfe6f2] bg-white p-5 shadow-[0_18px_40px_-28px_rgba(12,37,86,0.5)] md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-black text-[#0c2556]">{title}</h2>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function Status({ msg }: { msg: string }) {
  if (!msg) return null;
  const bad = /fail|denied|could not|error/i.test(msg);
  return (
    <p role="status" className={`rounded-lg px-3 py-2 text-sm font-semibold ${bad ? "bg-red-50 text-red-600" : "bg-[#e4f1dc] text-[#3d6b24]"}`}>
      {msg}
    </p>
  );
}

export function errMsg(e: unknown) {
  const code = (e as { code?: string })?.code ?? "";
  if (code.includes("permission")) return "Permission denied. Publish the updated firestore.rules and make sure your account role is admin.";
  return (e as Error)?.message || "Could not save.";
}
