// SAMPLE question banks. Replace/extend with your own content.
export type TestType = "wat" | "srt" | "tat" | "oir";

export const testMeta: Record<TestType, { title: string; blurb: string; rules: string[] }> = {
  wat: {
    title: "WAT: Word Association Test",
    blurb: "Write the first positive sentence that comes to mind for each word.",
    rules: ["Each word is shown for 15 seconds.", "Write one short, meaningful sentence.", "There are no marks. Review your answers at the end."],
  },
  srt: {
    title: "SRT: Situation Reaction Test",
    blurb: "Write what you would actually do in each situation.",
    rules: ["Each situation gets 30 seconds.", "Write a practical, specific action.", "There are no marks. Review your answers at the end."],
  },
  tat: {
    title: "TAT: Thematic Apperception Test",
    blurb: "See a picture for 30 seconds, then write a story in 4 minutes.",
    rules: ["30 seconds to observe, then the picture disappears.", "4 minutes to write the story.", "The last slide is blank: write your own story."],
  },
  oir: {
    title: "OIR: Officer Intelligence Rating",
    blurb: "Reasoning questions with scoring and explanations.",
    rules: ["Answer all questions within the time limit.", "Each correct answer scores 1 mark.", "Review explanations after submitting."],
  },
};

export const watWords: string[] = [
  "Army", "Duty", "Failure", "Friend", "Courage", "Fear", "Team", "Leader", "Mother", "Challenge",
  "Win", "Discipline", "Risk", "Honest", "Help", "Danger", "Success", "Plan", "Anger", "Hope",
];

export const srtSituations: string[] = [
  "You are going to appear for an important interview and your friend meets with an accident on the way.",
  "You are the team captain and your team is losing badly at half time.",
  "You find a wallet with money lying on the road.",
  "During a trek, one of your group members is exhausted and cannot walk further.",
  "You are late for a train and the traffic signal is red.",
  "Your close friend is cheating in an exam.",
  "A fire breaks out in your neighbour's house at night.",
  "You are assigned a task but you lack the required knowledge.",
  "Your junior makes a serious mistake in front of everyone.",
  "You are lost in an unfamiliar city with little money.",
];

export type OIRQuestion = { q: string; options: string[]; answer: number; explanation: string };

export const oirQuestions: OIRQuestion[] = [
  { q: "Find the next number: 2, 6, 12, 20, 30, ?", options: ["38", "40", "42", "44"], answer: 2, explanation: "Differences are 4, 6, 8, 10, so the next difference is 12: 30 + 12 = 42." },
  { q: "Book is to Reading as Fork is to?", options: ["Drawing", "Eating", "Writing", "Stirring"], answer: 1, explanation: "A book is used for reading, and a fork is used for eating." },
  { q: "If CAT is coded as 3120, how is DOG coded?", options: ["4157", "4167", "3157", "4147"], answer: 0, explanation: "Each letter becomes its position: D=4, O=15, G=7, so 4157." },
  { q: "Which is the odd one out?", options: ["Square", "Triangle", "Circle", "Cube"], answer: 3, explanation: "Cube is a three-dimensional shape; the others are two-dimensional." },
  { q: "A is the brother of B. B is the sister of C. How is C related to A?", options: ["Brother", "Sister", "Brother or sister", "Cousin"], answer: 2, explanation: "C is a sibling of A, but the gender of C is not known." },
  { q: "If 5 workers finish a job in 12 days, how many days will 10 workers take?", options: ["4", "6", "8", "10"], answer: 1, explanation: "Work is 5 x 12 = 60 worker-days. With 10 workers: 60 / 10 = 6 days." },
  { q: "Find the missing number: 3, 9, 27, 81, ?", options: ["162", "243", "324", "108"], answer: 1, explanation: "Each number is multiplied by 3: 81 x 3 = 243." },
  { q: "Which word does not belong: Apple, Mango, Potato, Banana?", options: ["Apple", "Mango", "Potato", "Banana"], answer: 2, explanation: "Potato is a vegetable; the others are fruits." },
  { q: "If you face north and turn 90 degrees right, then 90 degrees right again, which way do you face?", options: ["North", "East", "South", "West"], answer: 2, explanation: "North, then East, then South." },
  { q: "Complete the series: A, C, F, J, ?", options: ["M", "N", "O", "P"], answer: 2, explanation: "Gaps increase by 1: A+2=C, C+3=F, F+4=J, J+5=O." },
];

export const OIR_SECONDS = 10 * 60;
export const WAT_SECONDS = 15;
export const SRT_SECONDS = 30;
export const TAT_VIEW_SECONDS = 30;
export const TAT_WRITE_SECONDS = 240;
