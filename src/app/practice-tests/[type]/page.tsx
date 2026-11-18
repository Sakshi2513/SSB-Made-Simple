import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import TestRunner from "@/components/tests/TestRunner";
import { testMeta, type TestType } from "@/content/tests";

const types = Object.keys(testMeta) as TestType[];

export function generateStaticParams() {
  return types.map((type) => ({ type }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const m = testMeta[type as TestType];
  return m ? { title: m.title, description: m.blurb } : {};
}

function listTatImages(): string[] {
  try {
    return fs
      .readdirSync(path.join(process.cwd(), "public", "tat"))
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .map((f) => `/tat/${f}`);
  } catch {
    return [];
  }
}

export default async function TestPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!types.includes(type as TestType)) notFound();
  return <TestRunner type={type as TestType} tatImages={type === "tat" ? listTatImages() : []} />;
}
