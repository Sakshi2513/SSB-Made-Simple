"use client";

import { useEffect, useRef, useState } from "react";

export function formatTime(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

// Remount with a new `key` to restart. Calls onEnd once when it reaches zero.
export default function Countdown({ seconds, onEnd }: { seconds: number; onEnd: () => void }) {
  const [left, setLeft] = useState(seconds);
  const endRef = useRef(onEnd);

  useEffect(() => {
    endRef.current = onEnd;
  });

  useEffect(() => {
    const end = Date.now() + seconds * 1000;
    const id = setInterval(() => {
      const l = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setLeft(l);
      if (l === 0) {
        clearInterval(id);
        endRef.current();
      }
    }, 250);
    return () => clearInterval(id);
  }, [seconds]);

  const low = left <= 5;
  return (
    <span
      role="timer"
      aria-label={`${left} seconds left`}
      className={`rounded-full px-3 py-1 font-mono text-sm font-bold ${low ? "bg-red-600 text-white" : "bg-navy text-white"}`}
    >
      {formatTime(left)}
    </span>
  );
}
