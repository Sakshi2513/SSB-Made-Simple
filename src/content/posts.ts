// Articles by Hitender Rohilla (from the current ssbmadesimple.com). In Stage 8 these move to the admin panel.
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // YYYY-MM-DD
  readMins: number;
  author: string;
  body: string[]; // "## " = heading, "- " = bullet
  tags?: string[];
  updatedAt?: string; // YYYY-MM-DD, shown as "Last updated"
};

const author = "Hitender Rohilla";

export const posts: Post[] = [
  {
    slug: "ssb-preparation-tips-30-day-framework",
    title: "SSB Preparation Tips: The 30-Day Framework That Actually Works",
    excerpt:
      "A week-by-week breakdown of how to sequence OIR, psychology tests, GTO and interview prep in 30 days, without burning out two weeks before Centre Day.",
    category: "Preparation Tips",
    date: "2026-10-10",
    readMins: 4,
    author,
    body: [
      "## Why 30 days is the sweet spot",
      "Most aspirants either start three months before the SSB and forget everything by Centre Day, or start four days before and panic. Thirty days is the sweet spot: long enough to build real structure, short enough that nothing goes stale.",
      "## Week 1: Foundation (Days 1-7)",
      "- Day 1-2: Read the SSB process end to end. Know what each test measures.",
      "- Day 3-4: OIR speed ladder. Two sets a day, 20 minutes each.",
      "- Day 5: TAT word list drilling. 15 words, morning and night.",
      "- Day 6-7: WAT practice, 30 sentences a day.",
      "## Week 2: Depth (Days 8-14)",
      "Psychology tests are where most recommended candidates lose OLQ. This week is about building stories, not collecting pictures.",
      "- TAT: 12 images, one story per image, 14 words maximum.",
      "- SRT: 40 situational problems with structured answers.",
      "- Start reading Defence current affairs for 20 minutes daily.",
      "## Week 3: Performance (Days 15-21)",
      "- GTO drills: command task, PGT, HGT every alternate day in a park.",
      "- Lecturette: one 3-minute topic daily, recorded and reviewed.",
      "- One full mock SSB on Day 21. Write down every single point you lost.",
      "## Week 4: Peak (Days 22-30)",
      "- Interview only. Story bank, current affairs capsules, conference practice.",
      "- OIR maintenance: one set a day, nothing more.",
      "- Day 28-29: rest, documents, travel plan.",
      "- Day 30: reach the centre early. That is the whole plan.",
      "## The one rule",
      "Consistency beats intensity. Thirty focused days beats ninety distracted ones.",
    ],
  },
  {
    slug: "common-ssb-mistakes-to-avoid",
    title: "Common SSB Mistakes to Avoid on Centre Day",
    excerpt: "Top assessors share the eight mistakes that cost candidates a recommendation every single board, and exactly how to avoid each one.",
    category: "Common Mistakes",
    date: "2026-10-10",
    readMins: 4,
    author,
    body: [
      "## 1. Trying to be someone else",
      "Assessors meet 300+ candidates. The one who is genuinely themselves is the one who stands out. Preparation should remove the nervousness, not install a personality.",
      "## 2. Over-scripting TAT stories",
      "If your TAT story has perfect cause-effect-every-time structure, it will feel rehearsed. Prepare the framework, then let the image lead.",
      "## 3. Speaking over the group in GTO",
      "Volume is not leadership. Being the one who lets others speak, then structures the group's output, is what earns you the tick.",
      "## 4. Ignoring housekeeping",
      "Boots. Belt. Hair. Grease on the face. These are free marks that candidates lose every single board because nobody told them it was being assessed.",
      "## 5. Skipping the GPE / medical follow-up",
      "Recommendation is only a recommendation. Do not treat the paperwork as a formality.",
      "## 6. Interview preparation by memorisation",
      "Reciting a 200-word answer to \"tell me about yourself\" is the single most common reason a strong candidate goes unrecommended. Know your stories, deliver them in your own words.",
      "## 7. Panic on the first OIR set",
      "The OIR is a speed test, not an intelligence test. Your first set will be slow. That is fine. The tenth set is what matters.",
      "## 8. Comparing yourself to others in the waiting room",
      "Every candidate around you is thinking the same thing you are. The one who walks in calm and starts assessing the group positively is already winning.",
    ],
  },
  {
    slug: "how-to-crack-ssb-personal-interview",
    title: "How to Crack the SSB Personal Interview (PI + Conference)",
    excerpt: "The interview is not a viva. It is a 25-30 minute conversation about you. Here is the structure, the story bank and the traps.",
    category: "Interview",
    date: "2026-10-10",
    readMins: 3,
    author,
    body: [
      "## The interview is about consistency",
      "Interview officers are not trying to trick you. They are cross-checking the 30 stories you have already told across OIR, TAT, WAT, SRT and GTO. If your TAT hero was a doctor and your interview answer says your role model is a teacher, that inconsistency gets noticed.",
      "## Build a story bank first",
      "Write 30 short personal stories, each under 60 words:",
      "- A time you led a team",
      "- A time you failed and recovered",
      "- A time you did something nobody asked you to do",
      "- Your village, town, school, and what is wrong with it",
      "- The one problem in India you would fix first",
      "## The 5-day interview prep plan",
      "- Day 1-2: Story bank, written and memorised as beats, not scripts.",
      "- Day 3: Defence current affairs, 30 capsules, border issues, recent operations.",
      "- Day 4: Mock interview with a friend. Record it. Watch yourself back.",
      "- Day 5: Revision only. Documents, route, sleep.",
      "## Conference groups",
      "In conference, the officer is looking for how you treat people who disagree with you. Argue the point, not the person. Bring the quieter candidate into the conversation. That is a very strong signal.",
      "## Questions that always appear",
      "- Why do you want to join the Armed Forces?",
      "- Tell me about your family.",
      "- What do you know about the recent operation in [X]?",
      "- If you are rejected today, what will you do?",
    ],
  },
  {
    slug: "gto-tasks-explained",
    title: "GTO Tasks Explained: Command Tasks, PGT, HGT and Lecturette",
    excerpt:
      "What each GTO task measures, the time limits, the order of commands, and what an assessor is writing on the OLQ sheet while you talk.",
    category: "GTO",
    date: "2026-10-10",
    readMins: 3,
    author,
    body: [
      "## What GTO actually measures",
      "One thing: Officer Like Qualities. Not knowledge, not speed, not domination. Every GTO task is a different lens on the same question: would I take a chance on this person as my second-in-command?",
      "## Command Task (GTO 1)",
      "You are given a destination, a time limit, and a load. The load is deliberately too heavy. The task is not to finish, the task is to delegate. Identify the strongest person in your group, give them a real job, and keep the group moving. Candidates who try to carry everything themselves fail here consistently.",
      "## PGT: Peg Transfer",
      "Two pegs, one free space, sixty seconds. The trap is a second peg halfway through. Most groups freeze. The correct move is to restart the rhythm immediately, without frustration, without blaming. That recovery is the actual assessment.",
      "## HGT: Horse and Rider",
      "The rider must dismount, walk the horse, remount and reach the goal. The temptation is to drag the rider. Do not. Help the rider do it himself. Handing over initiative is worth more than finishing fast.",
      "## Lecturette",
      "Three minutes. You are given a topic and a fixed audience. Structure matters:",
      "- 0:00-0:20: Define the topic, state your stance",
      "- 0:20-1:40: Two or three points with a real example each",
      "- 1:40-2:40: Counter-argument, then your conclusion",
      "- 2:40-3:00: Clean close, no trailing",
      "Groups that finish in 90 seconds and sit silent lose the group discussion marks.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
