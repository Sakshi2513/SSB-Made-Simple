"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import PageHero from "@/components/PageHero";
import TextTest, { type TextItem, type TextResponse } from "./TextTest";
import OIRTest from "./OIRTest";
import { testMeta, watWords as builtinWat, srtSituations as builtinSrt, oirQuestions as builtinOir, WAT_SECONDS, SRT_SECONDS, type OIRQuestion, type TestType } from "@/content/tests";

type Result =
  | { kind: "text"; responses: TextResponse[] }
  | { kind: "oir"; answers: number[]; score: number };

export default function TestRunner({ type, tatImages }: { type: TestType; tatImages: string[] }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const meta = testMeta[type];
  // Questions added in /admin are used if any exist; otherwise the built-in bank.
  const [watWords, setWat] = useState<string[]>(builtinWat);
  const [srtSituations, setSrt] = useState<string[]>(builtinSrt);
  const [oirQuestions, setOir] = useState<OIRQuestion[]>(builtinOir);

  useEffect(() => {
    if (!db || type === "tat") return;
    getDocs(query(collection(db, "questions"), where("type", "==", type)))
      .then((snap) => {
        const rows = snap.docs.map((d) => d.data()).filter((d) => !d.retired).sort((a, b) => Number(a.n) - Number(b.n));
        if (rows.length === 0) return;
        if (type === "oir") setOir(rows.map((r) => ({ q: String(r.q), options: (r.options as string[]) ?? [], answer: Number(r.answer), explanation: String(r.explanation ?? "") })));
        if (type === "wat") setWat(rows.map((r) => String(r.text)));
        if (type === "srt") setSrt(rows.map((r) => String(r.text)));
      })
      .catch(() => {});
  }, [type]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) return <p className="container-x py-20 text-center text-muted">Loading...</p>;

  const tatItems: TextItem[] = [
    ...tatImages.map((src, i) => ({ prompt: `Picture ${i + 1}`, image: src })),
    { prompt: "Blank slide" },
  ];

  async function save(r: Result) {
    if (!db || !user) return;
    setSaveState("saving");
    try {
      const base = { uid: user.uid, type, createdAt: serverTimestamp() };
      await addDoc(
        collection(db, "testResults"),
        r.kind === "text"
          ? { ...base, responses: r.responses }
          : { ...base, score: r.score, total: oirQuestions.length, answers: r.answers },
      );
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }

  function finishText(responses: TextResponse[]) {
    const r: Result = { kind: "text", responses };
    setResult(r);
    save(r);
  }

  function finishOIR(answers: number[]) {
    const score = answers.reduce((s, a, i) => s + (a === oirQuestions[i].answer ? 1 : 0), 0);
    const r: Result = { kind: "oir", answers, score };
    setResult(r);
    save(r);
  }

  const noTat = type === "tat" && tatImages.length === 0;

  return (
    <>
      <PageHero title={meta.title} subtitle={meta.blurb} />
      <section className="container-x max-w-3xl py-10">
        {!started && !result && (
          <div className="card">
            <h2 className="font-display text-2xl font-semibold">Before you begin</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
              {meta.rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            {noTat ? (
              <p className="mt-4 rounded-lg bg-gold/20 p-3 text-sm">
                No TAT pictures have been added yet. Add images to <code>public/tat</code> to enable this test.
              </p>
            ) : (
              <button onClick={() => setStarted(true)} className="btn-gold mt-5">Start test</button>
            )}
          </div>
        )}

        {started && !result && type === "wat" && (
          <TextTest kind="wat" items={watWords.map((w) => ({ prompt: w }))} seconds={WAT_SECONDS} onFinish={finishText} />
        )}
        {started && !result && type === "srt" && (
          <TextTest kind="srt" items={srtSituations.map((s) => ({ prompt: s }))} seconds={SRT_SECONDS} onFinish={finishText} />
        )}
        {started && !result && type === "tat" && <TextTest kind="tat" items={tatItems} seconds={0} onFinish={finishText} />}
        {started && !result && type === "oir" && <OIRTest questions={oirQuestions} onFinish={finishOIR} />}

        {result?.kind === "text" && (
          <div className="space-y-3">
            <h2 className="font-display text-3xl font-bold">Review your responses</h2>
            <p className="text-sm text-muted">
              There are no marks here. Check that your answers are positive, specific and action-oriented.
            </p>
            {result.responses.map((r, i) => (
              <div key={i} className="card">
                <p className="text-sm font-semibold text-olive">{r.prompt}</p>
                <p className="mt-1">{r.response || <span className="text-muted">(no response)</span>}</p>
              </div>
            ))}
          </div>
        )}

        {result?.kind === "oir" && (
          <div className="space-y-3">
            <h2 className="font-display text-3xl font-bold">
              Score: {result.score} / {oirQuestions.length}
            </h2>
            {oirQuestions.map((q, i) => {
              const ok = result.answers[i] === q.answer;
              return (
                <div key={i} className="card">
                  <p className="font-semibold">{i + 1}. {q.q}</p>
                  <p className={`mt-1 text-sm font-medium ${ok ? "text-olive" : "text-red-600"}`}>
                    Your answer: {result.answers[i] >= 0 ? q.options[result.answers[i]] : "Not answered"} {ok ? "(correct)" : ""}
                  </p>
                  {!ok && <p className="text-sm">Correct answer: {q.options[q.answer]}</p>}
                  <p className="mt-1 text-sm text-muted">{q.explanation}</p>
                </div>
              );
            })}
          </div>
        )}

        {result && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/practice-tests" className="btn-primary">More tests</Link>
            <Link href="/dashboard" className="btn-outline">Dashboard</Link>
            <span className="text-sm text-muted" role="status">
              {saveState === "saving" && "Saving result..."}
              {saveState === "saved" && "Result saved to your dashboard."}
              {saveState === "error" && "Could not save this result."}
            </span>
          </div>
        )}
      </section>
    </>
  );
}
