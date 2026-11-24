export const siteConfig = {
  name: "SSBMadeSimple",
  tagline: "A 30-day action plan for NDA, CDS and AFCAT. Structured guidance. Focused preparation. Real results.",
  description:
    "SSB Made Simple: a 30-day SSB action plan, task-wise study material, practice tests and a book by Hitender Rohilla for NDA, CDS and AFCAT candidates.",
  url: "https://ssbmadesimple.com",
  author: "Hitender Rohilla",
  contact: {
    email: "support@ssbmadesimple.in",
    phone: "+91 89004 48642",
    whatsapp: "918900448642",
    telegram: "https://t.me/ssbmadesimple",
    telegramName: "SSB Made Simple",
    youtube: "https://youtube.com/@ssbmadesimple",
    instagram: "https://www.instagram.com/ssbmadesimple",
    instagramHandle: "@ssbmadesimple",
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ssb-tasks", label: "SSB Tasks" },
  { href: "/study-material", label: "Study Material" },
  { href: "/practice-tests", label: "Practice Tests" },
  { href: "/book", label: "Book" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const mobileTabs = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/ssb-tasks", label: "Tasks", icon: "target" },
  { href: "/practice-tests", label: "Tests", icon: "clipboard" },
  { href: "/notifications", label: "Alerts", icon: "bell" },
  { href: "/login", label: "Account", icon: "user" },
] as const;

export const bookConfig = {
  title: "SSB Made Simple: A 30-Day Action Plan",
  subtitle:
    "320 pages of task breakdowns, real SSB examples and fillable templates you can carry into the centre. The physical companion to the 30-day program, for candidates who want one plan, one notebook and no screen fatigue.",
  author: "Hitender Rohilla",
  amazonUrl: "https://www.flipkart.com/ssb-made-simple-30-days-action-plan/p/itm4bbbc32940928",
  price: "₹299",
  format: "Paperback",
  cover: "/brand/book-cover.webp",
  points: ["30-day plan", "Practice material", "Real SSB examples", "Exam focused", "Free digital copy with every order"],
};

export const program = {
  name: "30-Day SSB Action Plan",
  price: "₹999",
  summary: "8 tasks · 40+ drills · 220+ interview questions",
};
