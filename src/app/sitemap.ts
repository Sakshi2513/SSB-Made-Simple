import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { ssbStages } from "@/content/ssbStages";
import { posts } from "@/content/posts";
import { materials } from "@/content/materials";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const fixed = ["", "/ssb-tasks", "/study-material", "/practice-tests", "/book", "/blog", "/downloads", "/about", "/contact", "/privacy-policy", "/terms", "/refund-policy"];
  return [
    ...fixed.map((p) => ({ url: `${base}${p}` })),
    ...ssbStages.map((s) => ({ url: `${base}/ssb-tasks/${s.slug}` })),
    ...materials.map((m) => ({ url: `${base}/study-material/${m.slug}` })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.date })),
  ];
}
