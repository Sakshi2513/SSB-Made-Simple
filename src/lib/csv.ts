// Small CSV parser: handles quoted fields, commas and line breaks inside quotes, and "" escapes.
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  const src = text.replace(/^﻿/, "");
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(cell);
      cell = "";
      if (row.some((x) => x.trim() !== "")) rows.push(row);
      row = [];
    } else cell += c;
  }
  row.push(cell);
  if (row.some((x) => x.trim() !== "")) rows.push(row);
  return rows.map((r) => r.map((x) => x.trim()));
}

export const questionTemplate = [
  "type,question,option1,option2,option3,option4,answer,explanation,topic,difficulty",
  'oir,"Find the next number: 2, 6, 12, 20, ?",28,30,32,36,2,"Differences are 4, 6, 8, so next is +10 = 30.",Number series,easy',
  "wat,Courage,,,,,,,Positive words,easy",
  'srt,"You see a fight on the road on your way to an exam.",,,,,,,Social situations,medium',
].join("\n");
