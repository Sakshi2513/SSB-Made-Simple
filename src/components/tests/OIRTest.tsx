"use client";

import { useState } from "react";
import Countdown from "./Countdown";
import { OIR_SECONDS, type OIRQuestion } from "@/content/tests";

export default function OIRTest({ questions: oirQuestions, onFinish }: { questions: OIRQuestion[]; onFinish: (answers: number[]) => void }) {
  const [answers, setAnswers] = useState<number[]>(() => oirQuestions.map(() => -1));

  function pick(q: number, o: number) {
    setAnswers((a) => a.map((v, i) => (i === q ? o : v)));
  }

  return (
    <div className="space-y-4">
      <div className="card flex items-center justify-between">
        <p className="text-sm font-semibold text-muted">
          Answered {answers.filter((a) => a >= 0).length} of {oirQuestions.length}
        </p>
        <Countdown seconds={OIR_SECONDS} onEnd={() => onFinish(answers)} />
      </div>
      {oirQuestions.map((q, qi) => (
        <fieldset key={qi} className="card">
          <legend className="font-semibold">
            {qi + 1}. {q.q}
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {q.options.map((o, oi) => (
              <label
                key={oi}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${answers[qi] === oi ? "border-navy bg-navy/5" : "border-border"}`}
              >
                <input type="radio" name={`q${qi}`} checked={answers[qi] === oi} onChange={() => pick(qi, oi)} />
                {o}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <button onClick={() => onFinish(answers)} className="btn-primary">Submit test</button>
    </div>
  );
}
