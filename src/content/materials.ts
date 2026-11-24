// SAMPLE study guides. Replace with your own content.
export type Material = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  body: string[];
  tags?: string[];
  updatedAt?: string;
};

export const materials: Material[] = [
  {
    slug: "filling-the-piq-form",
    title: "Filling the PIQ Form Correctly",
    category: "Interview",
    summary: "The Personal Information Questionnaire drives your interview. Fill it honestly and know every line.",
    body: [
      "The PIQ is the first document the interviewing officer reads.",
      "## Be consistent",
      "Everything you write can become a question. Only write what you can explain.",
      "## Know your details",
      "Study your hobbies, family background, education and achievements in depth.",
    ],
  },
  {
    slug: "current-affairs-for-ssb",
    title: "Current Affairs for the SSB",
    category: "Knowledge",
    summary: "What to read, how much to read, and how to form your own opinion.",
    body: [
      "You are not expected to know everything, but you should be aware of major national and international events.",
      "## What to follow",
      "Defence news, national policy, economy, sports and your own region.",
      "## Form an opinion",
      "Do not memorise facts. Think about why an event matters and what you would do.",
    ],
  },
  {
    slug: "gto-tasks-explained",
    title: "GTO Tasks Explained",
    category: "GTO",
    summary: "A quick overview of each group task and what the GTO looks for.",
    body: [
      "GTO tasks test how you behave in a group, under pressure and with limited resources.",
      "## Group tasks",
      "Group Discussion, Group Planning Exercise, Progressive Group Task, Half Group Task and Final Group Task.",
      "## Individual tasks",
      "Individual Obstacles, Command Task and Lecturette.",
      "## What matters",
      "Cooperation, initiative and clear thinking matter more than winning.",
    ],
  },
  {
    slug: "fitness-for-ssb",
    title: "Fitness for the SSB",
    category: "Fitness",
    summary: "Basic fitness standards and a simple weekly plan.",
    body: [
      "Good physical fitness helps in GTO obstacles and keeps you alert for five days.",
      "## Weekly plan",
      "Run three times a week, do bodyweight exercises on alternate days, and stretch daily.",
      "## Medical",
      "Check the medical standards for your entry, and fix any issues well before the SSB.",
    ],
  },
];

export const getMaterial = (slug: string) => materials.find((m) => m.slug === slug);
