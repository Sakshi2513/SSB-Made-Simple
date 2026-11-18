import { ssbStages } from "./ssbStages";
import { posts } from "./posts";
import { materials } from "./materials";

export type SearchItem = { title: string; text: string; href: string; type: string };

export const searchIndex: SearchItem[] = [
  ...ssbStages.map((s) => ({ title: s.title, text: `${s.summary} ${s.what.join(" ")}`, href: `/ssb-tasks/${s.slug}`, type: "SSB Task" })),
  ...materials.map((m) => ({ title: m.title, text: `${m.summary} ${m.body.join(" ")}`, href: `/study-material/${m.slug}`, type: "Study Material" })),
  ...posts.map((p) => ({ title: p.title, text: `${p.excerpt} ${p.body.join(" ")}`, href: `/blog/${p.slug}`, type: "Blog" })),
];
