// Built-in product catalogue. Prices here are the defaults: anything edited in /admin > Products
// (Firestore collection `products`) overrides these, both on the site and on the payment server.
export type Product = {
  id: string;
  name: string;
  price: number; // rupees
  type: "plan" | "pack";
  durationDays: number; // 0 = lifetime
  includes: string[]; // product ids unlocked together with this one
  features: string[];
  accent: string;
  order: number;
  active: boolean;
};

export const packIds = ["pack-oir", "pack-tat-wat-srt", "pack-gto", "pack-interview"];

export const builtinProducts: Product[] = [
  {
    id: "plan-30day",
    name: "30-Day SSB Action Plan",
    price: 999,
    type: "plan",
    durationDays: 90,
    includes: packIds,
    features: ["All 8 SSB tasks, decoded", "40+ hands-on drills", "220+ interview questions", "Day-0 document checklist", "Every premium pack included"],
    accent: "#ffd21f",
    order: 0,
    active: true,
  },
  { id: "pack-oir", name: "OIR Practice Pack", price: 299, type: "pack", durationDays: 0, includes: [], features: ["1,000 OIR questions", "Timed practice sets", "Answer explanations"], accent: "#3b9cff", order: 1, active: true },
  { id: "pack-tat-wat-srt", name: "TAT + WAT + SRT Mega Pack", price: 499, type: "pack", durationDays: 0, includes: [], features: ["60 TAT images", "Word and situation banks", "Answer frameworks"], accent: "#ffd21f", order: 2, active: true },
  { id: "pack-gto", name: "GTO Preparation Pack", price: 699, type: "pack", durationDays: 0, includes: [], features: ["GTO drills", "Task-by-task strategies", "Lecturette topic bank"], accent: "#4a7a2e", order: 3, active: true },
  { id: "pack-interview", name: "Interview Master Pack", price: 599, type: "pack", durationDays: 0, includes: [], features: ["Interview framework", "220+ interview questions", "30-story personal bank"], accent: "#ff8f1f", order: 4, active: true },
];

export const getBuiltinProduct = (id: string) => builtinProducts.find((p) => p.id === id);
