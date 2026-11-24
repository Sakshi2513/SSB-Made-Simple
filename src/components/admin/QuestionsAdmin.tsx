"use client";

import { useRef, useState } from "react";
import { addDoc, collection, deleteDoc, doc, updateDoc, writeBatch } from "firebase/firestore";
import { Archive, Download, Plus, RotateCcw, Trash2, Upload } from "lucide-react";
import { db } from "@/lib/firebase";
import { oirQuestions, srtSituations, watWords } from "@/content/tests";
import { parseCsv, questionTemplate } from "@/lib/csv";
import { Field, Panel, Status, errMsg, ghostBtn, goldBtn, inputCls, primaryBtn, useCollection } from "./ui";

type QType = "oir" | "wat" | "srt";
const labels: Record<QType, string> = { oir: "OIR question", wat: "WAT word", srt: "SRT situation" };

export default function QuestionsAdmin() {
  const { rows, error } = useCollection("questions");
  const [type, setType] = useState<QType>("oir");
  const [q, setQ] = useState("");
  const [opts, setOpts] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState(0);
  const [why, setWhy] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [showRetired, setShowRetired] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const ofType = (rows ?? []).filter((r) => r.type === type).sort((a, b) => Number(a.n) - Number(b.n));
  const live = ofType.filter((r) => !r.retired);
  const retired = ofType.filter((r) => r.retired);
  const mine = showRetired ? retired : live;

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!db) return;
    setBusy(true);
    setMsg("");
    try {
      const base = { type, n: Date.now(), topic: topic.trim(), difficulty, retired: false };
      await addDoc(collection(db, "questions"), type === "oir" ? { ...base, q: q.trim(), options: opts.map((o) => o.trim()), answer, explanation: why.trim() } : { ...base, text: q.trim() });
      setQ("");
      setOpts(["", "", "", ""]);
      setWhy("");
      setAnswer(0);
      setMsg("Added. New test takers see it straight away.");
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
      let n = Date.now();
      oirQuestions.forEach((x) => b.set(doc(collection(db!, "questions")), { type: "oir", n: n++, q: x.q, options: x.options, answer: x.answer, explanation: x.explanation, topic: "", difficulty: "medium", retired: false }));
      watWords.forEach((w) => b.set(doc(collection(db!, "questions")), { type: "wat", n: n++, text: w, topic: "", difficulty: "medium", retired: false }));
      srtSituations.forEach((s) => b.set(doc(collection(db!, "questions")), { type: "srt", n: n++, text: s, topic: "", difficulty: "medium", retired: false }));
      await b.commit();
      setMsg("Built-in questions imported. You can now edit or retire them.");
    } catch (err) {
      setMsg(errMsg(err));
    } finally {
      setBusy(false);
    }
  }

  // CSV: type,question,option1..4,answer(1-4),explanation,topic,difficulty
  async function importCsv(file: File) {
    if (!db) return;
    setBusy(true);
    setMsg("");
    try {
      const table = parseCsv(await file.text());
      const body = /^type$/i.test(table[0]?.[0] ?? "") ? table.slice(1) : table;
      const good: Record<string, unknown>[] = [];
      const bad: string[] = [];
      let n = Date.now();
      body.forEach((r, i) => {
        const t = (r[0] ?? "").toLowerCase();
        const base = { n: n++, topic: r[8] ?? "", difficulty: ["easy", "medium", "hard"].includes((r[9] ?? "").toLowerCase()) ? r[9].toLowerCase() : "medium", retired: false };
        if (t === "oir") {
          const options = [r[2], r[3], r[4], r[5]];
          const ans = Number(r[6]) - 1;
          if (!r[1] || options.some((o) => !o) || !(ans >= 0 && ans <= 3)) return void bad.push(`row ${i + 2}`);
          good.push({ ...base, type: "oir", q: r[1], options, answer: ans, explanation: r[7] ?? "" });
        } else if (t === "wat" || t === "srt") {
          if (!r[1]) return void bad.push(`row ${i + 2}`);
          good.push({ ...base, type: t, text: r[1] });
        } else bad.push(`row ${i + 2}`);
      });
      for (let i = 0; i < good.length; i += 400) {
        const b = writeBatch(db);
        good.slice(i, i + 400).forEach((g) => b.set(doc(collection(db!, "questions")), g));
        await b.commit();
      }
      setMsg(`Imported ${good.length} item${good.length === 1 ? "" : "s"}.${bad.length ? ` Skipped ${bad.length} with problems: ${bad.slice(0, 8).join(", ")}${bad.length > 8 ? "..." : ""}.` : ""}`);
    } catch (err) {
      setMsg(errMsg(err));
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function downloadTemplate() {
    const url = URL.createObjectURL(new Blob([questionTemplate], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "questions-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
      <div className="space-y-6">
        <Panel title="Bulk import from a spreadsheet">
          <p className="text-sm text-[#4d5b76]">Fill the template in Excel or Google Sheets, save as CSV, and upload it. Add hundreds of questions at once.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={downloadTemplate} className={ghostBtn}><Download size={16} /> Download template</button>
            <button type="button" disabled={busy} onClick={() => fileRef.current?.click()} className={primaryBtn}><Upload size={16} /> Upload CSV</button>
            <input ref={fileRef} type="file" accept=".csv,text/csv" hidden onChange={(e) => e.target.files?.[0] && importCsv(e.target.files[0])} />
          </div>
          <p className="mt-3 text-xs text-[#6b7589]">Columns: type (oir, wat or srt), question, option1 to option4, answer (1 to 4), explanation, topic, difficulty (easy, medium or hard).</p>
        </Panel>

        <Panel title="Add one item">
          <div className="mb-4 grid grid-cols-3 gap-1 rounded-xl bg-[#eef3fb] p-1 text-sm font-bold">
            {(Object.keys(labels) as QType[]).map((t) => (
              <button key={t} type="button" onClick={() => setType(t)} className={`rounded-lg py-2 uppercase ${type === t ? "bg-[#0c2556] text-white" : "text-[#6b7589]"}`}>{t}</button>
            ))}
          </div>
          <form onSubmit={add} className="space-y-3.5">
            <Field label={type === "oir" ? "Question" : type === "wat" ? "Word" : "Situation"}>
              {type === "wat" ? <input required className={inputCls} value={q} onChange={(e) => setQ(e.target.value)} /> : <textarea required rows={3} className={inputCls} value={q} onChange={(e) => setQ(e.target.value)} />}
            </Field>
            {type === "oir" && (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  {opts.map((o, i) => (
                    <Field key={i} label={`Option ${i + 1}`}>
                      <div className="flex items-center gap-2">
                        <input required className={inputCls} value={o} onChange={(e) => setOpts((p) => p.map((v, j) => (j === i ? e.target.value : v)))} />
                        <input type="radio" name="correct" aria-label={`Option ${i + 1} is correct`} checked={answer === i} onChange={() => setAnswer(i)} className="h-5 w-5 shrink-0 accent-[#1c4cb0]" />
                      </div>
                    </Field>
                  ))}
                </div>
                <p className="text-xs text-[#6b7589]">Tick the round button beside the correct option.</p>
                <Field label="Explanation"><textarea rows={2} className={inputCls} value={why} onChange={(e) => setWhy(e.target.value)} /></Field>
              </>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Topic"><input className={inputCls} value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Number series" /></Field>
              <Field label="Difficulty">
                <select className={inputCls} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </Field>
            </div>
            <button disabled={busy} className={goldBtn}><Plus size={16} /> Add {labels[type]}</button>
          </form>
        </Panel>
        <Status msg={msg} />
      </div>

      <Panel
        title={`${type.toUpperCase()} ${showRetired ? "retired" : "live"} (${mine.length})`}
        action={
          rows?.length === 0 ? (
            <button disabled={busy} onClick={importBuiltin} className={primaryBtn}>Import built-in questions</button>
          ) : (
            <button onClick={() => setShowRetired((v) => !v)} className={ghostBtn}>{showRetired ? "Show live" : `Retired (${retired.length})`}</button>
          )
        }
      >
        {error && <Status msg={`Could not load: ${error}`} />}
        {rows?.length === 0 && !error && <p className="text-sm text-[#6b7589]">Nothing in Firestore yet, so tests use the built-in questions. Once you add or import anything, tests use only what is here.</p>}
        <p className="mb-2 text-xs text-[#6b7589]">Retire a question instead of deleting it, so students&apos; past scores still make sense. Retired questions are hidden from tests.</p>
        <ul className="max-h-[36rem] divide-y divide-[#eef1f6] overflow-y-auto">
          {mine.map((r) => (
            <li key={r.id} className="flex items-start justify-between gap-3 py-3">
              <div className="min-w-0 text-sm">
                <p className="font-bold text-[#0c2556]">{String(r.q ?? r.text)}</p>
                <p className="text-xs text-[#6b7589]">
                  {r.type === "oir" && Array.isArray(r.options) ? `Answer: ${String((r.options as string[])[Number(r.answer)])} · ` : ""}
                  {r.topic ? `${String(r.topic)} · ` : ""}{String(r.difficulty ?? "medium")}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button aria-label={r.retired ? "Restore" : "Retire"} title={r.retired ? "Restore" : "Retire"} onClick={() => db && updateDoc(doc(db, "questions", r.id), { retired: !r.retired })} className="rounded-lg p-2 text-[#1c4cb0] hover:bg-[#eef3fb]">{r.retired ? <RotateCcw size={16} /> : <Archive size={16} />}</button>
                {Boolean(r.retired) && <button aria-label="Delete forever" onClick={() => confirm("Delete this item forever?") && db && deleteDoc(doc(db, "questions", r.id))} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>}
              </div>
            </li>
          ))}
          {mine.length === 0 && <li className="py-6 text-center text-sm text-[#6b7589]">Nothing here.</li>}
        </ul>
      </Panel>
    </div>
  );
}
