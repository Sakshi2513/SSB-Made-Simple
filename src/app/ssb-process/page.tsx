import type { Metadata } from "next";
import Link from "next/link";
import TaskBackdrop from "@/components/TaskBackdrop";
import { ArrowRight, Brain, Compass, Fingerprint, Flag } from "lucide-react";

export const metadata: Metadata = {
  title: "The SSB Selection Process",
  description: "The complete day-by-day SSB selection process, from reporting on Day 0 to the final conference on Day 5.",
};

const measures = [
  { Icon: Brain, title: "Mind", text: "Reasoning that stays sharp under a hard clock." },
  { Icon: Fingerprint, title: "Personality", text: "The same genuine person from first test to last." },
  { Icon: Flag, title: "Leadership", text: "Initiative that lifts the group, not just yourself." },
  { Icon: Compass, title: "Decisions", text: "Clear calls when time and resources run out." },
];

type Item = { title: string; text: string; slug?: string };
type Day = { id: string; day: string; name: string; c: string; fg: string; intro: string; items: Item[] };

const days: Day[] = [
  {
    id: "day-0", day: "Day 0", name: "Reporting & Documentation", c: "#8b93a7", fg: "#fff",
    intro: "You report to your allotted selection centre and complete the formalities.",
    items: [
      { title: "Reporting And Briefing", text: "Candidates report to the designated selection centre (such as Allahabad, Bhopal or Bangalore). Documents are verified, chest numbers are allotted, and an administrative briefing covers rules, conduct and how to fill in the Personal Information Questionnaire (PIQ) form." },
    ],
  },
  {
    id: "day-1", day: "Day 1", name: "Screening Test (Stage I)", c: "#3b9cff", fg: "#fff",
    intro: "Stage I is a screening round. Candidates who do not clear it are sent back the same day.",
    items: [
      { title: "Officer Intelligence Rating (OIR) Test", text: "A set of verbal and non-verbal reasoning tests designed to check basic intellect and mental agility.", slug: "oir" },
      { title: "Picture Perception & Discussion Test (PPDT)", text: "A hazy picture is shown for 30 seconds. Candidates get 1 minute to note the number of characters, their age, mood, sex and the core action, then 4 minutes to write a short story.", slug: "ppdt" },
      { title: "PPDT Group Discussion", text: "Candidates are divided into sub-groups of about 15–20. Each narrates their story, then the group discusses to reach a common story within about 30 minutes.", slug: "ppdt" },
      { title: "Results", text: "Screened-in candidates are retained for Stage II and given new chest numbers. The rest are dispersed." },
    ],
  },
  {
    id: "day-2", day: "Day 2", name: "Psychological Tests (Stage II)", c: "#e6b800", fg: "#0c2556",
    intro: "These tests measure your subconscious mind, speed of reaction, value system and social adaptability under time pressure.",
    items: [
      { title: "Thematic Apperception Test (TAT)", text: "Eleven picture slides are shown one after another, each for 30 seconds, and candidates have 4 minutes to write a story for each. The 12th slide is blank, where you write an imaginative story of your choice.", slug: "tat" },
      { title: "Word Association Test (WAT)", text: "60 words are shown one after another. Each stays for 15 seconds, and candidates write the first sentence or thought that comes to mind.", slug: "wat" },
      { title: "Situation Reaction Test (SRT)", text: "A booklet with 60 everyday or crisis situations is provided. Candidates have 30 minutes to write how they would handle each one.", slug: "srt" },
      { title: "Self-Description Test (SDT)", text: "Candidates get 15 minutes to write five short paragraphs describing themselves from the view of their parents, friends and teachers, an honest self-assessment, and the qualities they want to improve.", slug: "sdt" },
    ],
  },
  {
    id: "day-3-4", day: "Day 3–4", name: "GTO Tasks & Personal Interviews", c: "#4a7a2e", fg: "#fff",
    intro: "Group Testing Officer (GTO) tasks are outdoor group activities that assess leadership, cooperation, stamina and group dynamics. Individual interviews may also fall across Days 2, 3 or 4.",
    items: [
      { title: "Group Discussion (GD)", text: "Two consecutive group discussions on general, social or current-affairs topics, where communication and logical arguments are observed.", slug: "gto/group-discussion" },
      { title: "Group Planning Exercise (GPE)", text: "The group is shown a map model with several emergency or crisis problems. Each candidate writes an individual plan first, then the group agrees on a practical solution within a time limit.", slug: "gto/group-planning-exercise" },
      { title: "Progressive Group Task (PGT)", text: "A series of four obstacles of increasing difficulty. The group moves a load and helping materials (planks, ropes, balli) across out-of-bound areas, following strict rules.", slug: "gto/progressive-group-task" },
      { title: "Snake Race / Group Obstacle Race", text: "Competing groups race through physical-tactical obstacles carrying a rolled-up tent-pole (the snake), to build competitive spirit and endurance.", slug: "gto/snake-race" },
      { title: "Half Group Task (HGT)", text: "Similar to PGT, but the group is split into smaller halves so each candidate gets more room to show individual leadership.", slug: "gto/half-group-task" },
      { title: "Lecturette", text: "Each candidate picks a slip with four topics, gets 3 minutes to prepare, and delivers a 3-minute speech in front of the group and the GTO.", slug: "gto/lecturette" },
      { title: "Individual Obstacles (IO)", text: "An individual test of 10 obstacles (such as the high wall, monkey crawl and commando walk), carrying points from 1 to 10, to be completed within 3 minutes.", slug: "gto/individual-obstacles" },
      { title: "Command Task", text: "Each candidate acts as the commander of a tactical obstacle task and chooses a few subordinates from the group to help carry out the plan.", slug: "gto/command-task" },
      { title: "Final Group Task (FGT)", text: "One last obstacle task that gives the GTO a final comparative look at the whole group's teamwork.", slug: "gto/final-group-task" },
      { title: "Personal Interview", text: "Conducted one-on-one by the Interviewing Officer (IO). It covers your PIQ form, family background, education, hobbies, achievements, general awareness and depth of character.", slug: "personal-interview" },
    ],
  },
  {
    id: "day-5", day: "Day 5", name: "Conference & Results", c: "#ff8f1f", fg: "#fff",
    intro: "The board meets, decides and announces the result.",
    items: [
      { title: "Board Conference", text: "All assessors (Psychologist, GTO, Interviewing Officer and Board President) sit together to discuss every candidate's performance. Borderline candidates are deliberated upon." },
      { title: "Result Declaration", text: "Results are announced by an SSB official." },
      { title: "Medical Examination", text: "Recommended candidates are retained and sent to a military hospital for a detailed medical checkup that can take 3 to 5 days." },
    ],
  },
];

export default function SSBProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b1020] text-white">
        <TaskBackdrop slug="gto" strength={0.4} />
        <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#3b9cff]/25 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-10 py-12 md:py-14 lg:grid-cols-[1fr_30rem] lg:gap-16">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/" className="hover:text-gold">Home</Link> / <span className="text-white">SSB Process</span>
            </nav>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              The SSB Selection
              <br />
              <span className="text-gold-gradient">Process.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              From reporting on Day 0 to the final conference on Day 5: exactly what happens, in what order, and what the board looks for.
            </p>
            <ul className="mt-7 grid max-w-xl grid-cols-3 gap-3">
              {[{ n: "5", l: "Days" }, { n: "2", l: "Stages" }, { n: "15", l: "Officer Like Qualities" }].map((x) => (
                <li key={x.l} className="rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 backdrop-blur">
                  <p className="text-3xl font-black text-gold">{x.n}</p>
                  <p className="text-xs font-semibold leading-tight text-white/75">{x.l}</p>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/ssb-tasks" className="btn-gold btn-shine !px-7 !py-3.5">Explore The Eight Tasks</Link>
              <Link href="/practice-tests" className="btn-ghost !px-7 !py-3.5">Practice Tests</Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/20 bg-[#07122e]/75 p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Jump To A Day</p>
            <ol className="mt-4 space-y-2.5">
              {days.map((d) => (
                <li key={d.id}>
                  <a href={`#${d.id}`} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-3 transition hover:border-gold/60 hover:bg-white/[0.1]">
                    <span className="w-[5rem] shrink-0 whitespace-nowrap rounded-lg px-2 py-2 text-center text-xs font-extrabold uppercase tracking-wider" style={{ background: d.c, color: d.fg }}>
                      {d.day}
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-extrabold">{d.name}</span>
                    <ArrowRight size={16} className="shrink-0 text-white/50" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="tristripe" />
      </section>

      {/* What is SSB */}
      <section className="bg-white">
        <div className="container-x py-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-black text-[#0c2556] md:text-4xl">What Is SSB?</h2>
              <p className="mt-4 text-base leading-relaxed text-[#4d5b76]">
                The Services Selection Board is a five-day assessment conducted by the Indian Armed Forces to measure 15 Officer Like
                Qualities and decide who walks into Officer Training Academy. It is not an exam you can pass with a syllabus. It is a
                structured evaluation of the qualities an officer carries into a room with 300 strangers.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {measures.map(({ Icon, title }, i) => {
                const col = ["#3b9cff", "#ffd21f", "#4a7a2e", "#ff8f1f"][i];
                const fg = i === 1 ? "#0c2556" : "#fff";
                return (
                  <li key={title} className="relative overflow-hidden rounded-2xl border border-[#dfe2e8] bg-[#f6f7f9] px-2 pb-4 pt-5 text-center">
                    <span className="absolute inset-x-0 top-0 h-1" style={{ background: col }} />
                    <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl" style={{ background: col, color: fg }}>
                      <Icon size={22} />
                    </span>
                    <p className="mt-2 text-sm font-extrabold text-[#0c2556]">{title}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Days */}
      <section className="bg-dots relative bg-[#f3f4f7]">
        <div className="container-x space-y-8 py-14">
          {days.map((d) => (
            <article key={d.id} id={d.id} className="scroll-mt-24 overflow-hidden rounded-3xl border border-[#dfe2e8] bg-white shadow-[0_16px_40px_-28px_rgba(12,37,86,0.5)]">
              <span className="block h-1.5" style={{ background: d.c }} />
              <header className="flex flex-wrap items-center gap-3 px-6 pt-6 md:px-8">
                <span className="rounded-lg px-3 py-1.5 text-sm font-black uppercase tracking-wider" style={{ background: d.c, color: d.fg }}>
                  {d.day}
                </span>
                <h2 className="text-2xl font-black text-[#0c2556] md:text-3xl">{d.name}</h2>
              </header>
              <p className="px-6 pt-2 text-[#4d5b76] md:px-8">{d.intro}</p>
              <ol className="grid gap-3 p-6 md:grid-cols-2 md:p-8">
                {d.items.map((it, i) => (
                  <li key={it.title} className="flex gap-4 rounded-2xl border border-[#dfe2e8] bg-[#f6f7f9] p-5 md:last:odd:col-span-2">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-base font-black" style={{ background: d.c, color: d.fg }}>
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-extrabold text-[#0c2556]">{it.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#4d5b76]">{it.text}</p>
                      {it.slug && (
                        <Link href={`/ssb-tasks/${it.slug}`} className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#1c4cb0] hover:underline">
                          Read The Guide <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-gradient-to-br from-[#171b24] to-[#2b3140] p-8 text-white">
            <div>
              <h2 className="text-2xl font-black md:text-3xl">Ready To Prepare The Right Way?</h2>
              <p className="mt-1 text-sm text-white/70">Schedules can vary slightly by board. Always follow your call letter.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/practice-tests" className="btn-gold btn-shine">Practice Tests</Link>
              <Link href="/ssb-tasks" className="btn-ghost">All Eight Tasks</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
