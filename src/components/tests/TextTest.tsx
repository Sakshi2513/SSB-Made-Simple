"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Countdown from "./Countdown";
import { TAT_VIEW_SECONDS, TAT_WRITE_SECONDS } from "@/content/tests";

export type TextItem = { prompt: string; image?: string };
export type TextResponse = { prompt: string; response: string };

type Props = {
  kind: "wat" | "srt" | "tat";
  items: TextItem[];
  seconds: number; // per item for wat/srt (ignored for tat)
  onFinish: (responses: TextResponse[]) => void;
};

export default function TextTest({ kind, items, seconds, onFinish }: Props) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"view" | "write">(kind === "tat" ? "view" : "write");
  const [done, setDone] = useState<TextResponse[]>([]);
  const area = useRef<HTMLTextAreaElement>(null);

  const item = items[idx];

  function submit() {
    const response = area.current?.value.trim() ?? "";
    const next = [...done, { prompt: item.prompt, response }];
    if (idx + 1 >= items.length) {
      setDone(next);
      onFinish(next);
      return;
    }
    setDone(next);
    setIdx(idx + 1);
    setPhase(kind === "tat" ? "view" : "write");
    if (area.current) area.current.value = "";
  }

  const writeSeconds = kind === "tat" ? TAT_WRITE_SECONDS : seconds;
  const timerKey = `${idx}-${phase}`;

  return (
    <div className="card">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-muted">
          {kind === "tat" ? "Picture" : kind === "wat" ? "Word" : "Situation"} {idx + 1} of {items.length}
        </p>
        {phase === "view" ? (
          <Countdown key={timerKey} seconds={TAT_VIEW_SECONDS} onEnd={() => setPhase("write")} />
        ) : (
          <Countdown key={timerKey} seconds={writeSeconds} onEnd={submit} />
        )}
      </div>

      {kind === "tat" && phase === "view" ? (
        item.image ? (
          <Image
            src={item.image}
            alt="Observe this picture"
            width={800}
            height={600}
            unoptimized
            className="mx-auto max-h-[60vh] w-auto rounded-lg border border-border"
          />
        ) : (
          <p className="grid h-60 place-items-center rounded-lg border border-dashed border-border text-center text-muted">
            Blank slide. Imagine any situation and prepare to write your own story.
          </p>
        )
      ) : (
        <>
          <p className={`mb-3 font-display font-semibold ${kind === "wat" ? "text-5xl" : "text-2xl"}`}>
            {kind === "tat" ? "Write your story: past, present and future." : item.prompt}
          </p>
          <label htmlFor="resp" className="sr-only">Your response</label>
          <textarea
            id="resp"
            ref={area}
            autoFocus
            rows={kind === "wat" ? 2 : kind === "srt" ? 4 : 10}
            className="w-full rounded-lg border border-border bg-surface p-3"
            placeholder="Type your response..."
          />
          <button onClick={submit} className="btn-primary mt-3">
            {idx + 1 >= items.length ? "Finish" : "Next"}
          </button>
        </>
      )}
      {kind === "tat" && phase === "view" && (
        <button onClick={() => setPhase("write")} className="btn-outline mt-4">Start writing now</button>
      )}
    </div>
  );
}
