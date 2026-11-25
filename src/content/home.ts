// Home page content, taken from the current ssbmadesimple.com.
export const heroStats = [
  { value: "1,200+", label: "Recommended candidates mentored" },
  { value: "30 Days", label: "Structured plan" },
  { value: "4.9/5", label: "Candidate rating" },
];

export const planCard = [
  { label: "OIR accuracy target", value: "90%+" },
  { label: "TAT consistency score", value: "12 / 12" },
  { label: "Full program", value: "₹999" },
];

export const measures = [
  { title: "Mind", text: "Reasoning" },
  { title: "Personality", text: "Consistency" },
  { title: "Leadership", text: "Initiative" },
  { title: "Decisions", text: "Under pressure" },
];

export const stage1 = {
  label: "Stage 1 · Day 1 · Screening",
  note: "Roughly 40-60% of candidates are screened out on Day 1 alone.",
  tests: [
    { code: "OIR", name: "Officer Intelligence Test", note: "Reasoning, speed and accuracy under time pressure" },
    { code: "PPDT", name: "Picture Perception & Discussion", note: "A hazy picture, a short story, then a group discussion" },
    { code: "TAT", name: "Thematic Apperception Test", note: "12 images, one story each, consistency tested" },
    { code: "WAT", name: "Word Association Test", note: "60 words, 15 seconds each, personality revealed" },
  ],
};

export const stage2 = {
  label: "Stage 2 · Day 2 to Day 5 · Psychology, GTO & Interview",
  note: "Four days of assessment where recommended candidates are separated. Every day is scored separately. Consistency wins.",
  tests: [
    { code: "SDT", name: "Self Description Test", note: "Write who you are. The officer cross-checks it against everything else" },
    { code: "SRT", name: "Situation Reaction Test", note: "Structure matters more than length" },
    { code: "GTO", name: "Group Testing Officer Tasks", note: "Outdoor group tasks, the OLQ engine room" },
    { code: "PI", name: "Personal Interview & Conference", note: "25-30 minutes, plus group conference" },
  ],
};

export const whyPoints = [
  "Structured 30-day preparation plan",
  "Task-wise study material with examples",
  "Free practice questions and real SSB examples",
  "Focused on psychology tests, GTO and interview",
  "Designed for NDA, CDS, AFCAT and other SSB entries",
  "Day 0 checklist so no document costs you a candidature",
];

export const programContents = [
  "A 14-word TAT story framework that holds personality consistent across all 12 images",
  "A four-beat SRT structure: Situation, Task, Action, Result, on every single question",
  "Command task delegation drills you can run in a park, with no equipment",
  "A 30-story personal bank for the interview that is not memorised, but structured",
  "A Day-0 document checklist that has saved more candidatures than any OIR score",
];

export const weeks = [
  { label: "Week 1 · Days 1-7", title: "Foundation", text: "SSB process, OIR speed ladder, TAT word list, WAT sentences" },
  { label: "Week 2 · Days 8-14", title: "Psychology depth", text: "12-image TAT consistency, SRT structures, Defence current affairs habit" },
  { label: "Week 3 · Days 15-21", title: "Performance", text: "GTO outdoor drills, lecturette daily, first full mock SSB on Day 21" },
  { label: "Week 4 · Days 22-30", title: "Peak & Centre Day", text: "Interview only, story bank, Day-0 documents, rest, travel" },
];

export const freeMaterial = [
  { title: "PPDT Pictures", file: undefined as string | undefined },
  { title: "TAT Word List", file: undefined as string | undefined },
  { title: "WAT Sentences", file: undefined as string | undefined },
  { title: "SRT Situations", file: undefined as string | undefined },
  { title: "Lecturette Topics", file: undefined as string | undefined },
  { title: "GTO Topics & Tips", file: undefined as string | undefined },
  { title: "Interview Questions", file: undefined as string | undefined },
  { title: "OIR Practice Sets", file: undefined as string | undefined },
];

export const testimonials = [
  {
    name: "Aarav Mehta", role: "NDA aspirant", place: "Jaipur, Rajasthan",
    text: "I had cleared NDA but was rejected twice at SSB, both times at the GTO stage. Hitender sir's command task drills were the fix. Third attempt: recommended. The 30-day plan is brutally honest about what actually gets you ticks.",
  },
  {
    name: "Kavya Nair", role: "CDS aspirant", place: "Kochi, Kerala",
    text: "The TAT 14-word framework changed my Day 1 completely. I stopped trying to write clever stories and started writing the same person twelve times. That consistency is what assessors are actually looking for.",
  },
  {
    name: "Rohit Verma", role: "AFCAT aspirant", place: "Lucknow, Uttar Pradesh",
    text: "Bought the book for ₹379 and ended up buying the full program. The interview master pack alone saved me. I walked into the PI with 30 personal stories and zero memorised answers. Recommended for Air Force.",
  },
  {
    name: "Ananya Deshmukh", role: "NDA aspirant", place: "Pune, Maharashtra",
    text: "What I value most is the honesty. Nobody tells you that most candidates fail on Day 3 at the GTO. This plan told me that in week one, so I spent weeks two and three outdoors instead of memorising TAT words.",
  },
  {
    name: "Sanjay Thakur", role: "CDS aspirant", place: "Bhopal, Madhya Pradesh",
    text: "Forty-two years old, two years of gap, and a family to feed. I was not confident I would get a chance again. The 30-day plan gave me a structure I could follow alongside my job. Recommended, Coast Guard.",
  },
  {
    name: "Priya Sharma", role: "AFCAT aspirant", place: "Guwahati, Assam",
    text: "The SRT structures are genuinely the best I have found anywhere. I walk in with Situation, Task, Action, Result every single time. My last three SRT series have been called \"clear and structured\" in my feedback reports.",
  },
  {
    name: "Imran Sheikh", role: "NDA aspirant", place: "Hyderabad, Telangana",
    text: "I joined the Telegram group expecting generic motivation. Instead it is a daily drill group: people posting PGT times, lecturette recordings, asking for feedback on TAT stories. That accountability is worth more than the price.",
  },
  {
    name: "Meera Krishnan", role: "CDS aspirant", place: "Chennai, Tamil Nadu",
    text: "The document checklist saved my candidature. My CBE details were filled in wrong and the form would have been rejected at the counter. Found the error two days before Centre Day because it was in week four of the plan.",
  },
];
