import { cacheLife } from "next/cache";
import { posts as builtinPosts, type Post } from "@/content/posts";
import { materials as builtinMaterials, type Material } from "@/content/materials";
import { builtinProducts, type Product } from "@/content/products";
import { downloads as builtinDownloads, type DownloadItem } from "@/content/downloads";

type Row = Record<string, string | number | boolean>;

// Reads a public Firestore collection through the REST API (no admin SDK, no secrets).
// Cached for a minute so edits made in /admin appear quickly without a redeploy.
async function fetchCollection(col: string): Promise<Row[] | null> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });
  const pid = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!pid || !key) return null;
  try {
    const res = await fetch(`https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/${col}?pageSize=300&key=${key}`);
    if (!res.ok) return null;
    const json = (await res.json()) as { documents?: { name: string; fields?: Record<string, Record<string, string | number | boolean>> }[] };
    return (json.documents ?? []).map((d) => {
      const row: Row = { _id: d.name.split("/").pop() ?? "" };
      for (const [k, v] of Object.entries(d.fields ?? {})) {
        const val = v.stringValue ?? v.integerValue ?? v.doubleValue ?? v.booleanValue;
        if (val !== undefined) row[k] = typeof val === "string" && v.integerValue !== undefined ? Number(val) : val;
      }
      return row;
    });
  } catch {
    return null;
  }
}

const csv = (v: unknown) => String(v ?? "").split(",").map((x) => x.trim()).filter(Boolean);
const todayStr = () => new Date().toISOString().slice(0, 10);
// Drafts stay hidden. A post dated in the future is scheduled and appears on that day.
const visible = (r: Row) => r.status !== "draft";

// If you have added anything in /admin, Firestore is the source of truth.
// If a collection is empty or unreachable, the built-in content is shown instead.
export async function getPosts(): Promise<Post[]> {
  "use cache"; // today's date is used for scheduled posts, so this must be cached, not rendered per request
  cacheLife({ stale: 30, revalidate: 60, expire: 3600 });
  const rows = await fetchCollection("posts");
  if (!rows || rows.length === 0) return builtinPosts;
  return rows
    .filter(visible)
    .map((r) => ({
      slug: String(r._id),
      title: String(r.title ?? ""),
      tags: csv(r.tags),
      updatedAt: r.updatedAt ? String(r.updatedAt) : undefined,
      excerpt: String(r.excerpt ?? ""),
      category: String(r.category ?? "General"),
      date: String(r.date ?? ""),
      readMins: Number(r.readMins ?? 3),
      author: String(r.author ?? "SSBMadeSimple"),
      body: String(r.body ?? "").split("\n").map((l) => l.trim()).filter(Boolean),
    }))
    .filter((p) => p.title && (!p.date || p.date <= todayStr()))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.slug === slug);
}

export async function getDownloads(): Promise<DownloadItem[]> {
  const rows = await fetchCollection("downloads");
  if (!rows || rows.length === 0) return builtinDownloads;
  return rows
    .map((r) => ({ title: String(r.title ?? ""), description: String(r.description ?? ""), file: r.file ? String(r.file) : undefined, order: Number(r.order ?? 0) }))
    .filter((d) => d.title)
    .sort((a, b) => a.order - b.order)
    .map(({ title, description, file }) => ({ title, description, file }));
}

export async function getMaterials(): Promise<Material[]> {
  const rows = await fetchCollection("materials");
  if (!rows || rows.length === 0) return builtinMaterials;
  return rows
    .filter(visible)
    .map((r) => ({
      slug: String(r._id),
      title: String(r.title ?? ""),
      tags: csv(r.tags),
      updatedAt: r.updatedAt ? String(r.updatedAt) : undefined,
      category: String(r.category ?? "General"),
      summary: String(r.summary ?? ""),
      body: String(r.body ?? "").split("\n").map((l) => l.trim()).filter(Boolean),
    }))
    .filter((m) => m.title)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getMaterial(slug: string): Promise<Material | undefined> {
  return (await getMaterials()).find((m) => m.slug === slug);
}

export type SiteSettings = {
  announceEnabled: boolean;
  announceText: string;
  announceLink: string;
  bookPrice: string;
  bookUrl: string;
};

// Site-wide settings edited in /admin (document settings/site).
export async function getSettings(): Promise<SiteSettings> {
  const rows = await fetchCollection("settings");
  const r = rows?.find((x) => x._id === "site");
  return {
    announceEnabled: r?.announceEnabled === true,
    announceText: String(r?.announceText ?? ""),
    announceLink: String(r?.announceLink ?? ""),
    bookPrice: String(r?.bookPrice ?? ""),
    bookUrl: String(r?.bookUrl ?? ""),
  };
}

// Catalogue shown on /subscription. Firestore `products` (edited in /admin) overrides the built-in defaults.
export async function getProducts(): Promise<Product[]> {
  const map = new Map(builtinProducts.map((p) => [p.id, p]));
  const rows = await fetchCollection("products");
  rows?.forEach((r) => {
    const id = String(r._id);
    const b = map.get(id);
    map.set(id, {
      id,
      name: String(r.name ?? b?.name ?? id),
      price: Number(r.price ?? b?.price ?? 0),
      type: (r.type ?? b?.type ?? "pack") as Product["type"],
      durationDays: Number(r.durationDays ?? b?.durationDays ?? 0),
      includes: typeof r.includesText === "string" ? r.includesText.split(",").map((x) => x.trim()).filter(Boolean) : b?.includes ?? [],
      features: typeof r.featuresText === "string" ? r.featuresText.split("\n").map((x) => x.trim()).filter(Boolean) : b?.features ?? [],
      accent: String(r.accent ?? b?.accent ?? "#3b9cff"),
      order: Number(r.order ?? b?.order ?? 0),
      active: r.active !== false,
    });
  });
  return [...map.values()].filter((p) => p.active && p.price > 0).sort((a, b) => a.order - b.order);
}
