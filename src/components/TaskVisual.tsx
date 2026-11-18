import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import TaskIllustration from "./TaskIllustration";

// Shows your photo from public/tasks/<slug>.webp (or .jpg / .png) if it exists, otherwise the built-in illustration.
function findPhoto(slug: string): string | null {
  for (const ext of ["webp", "jpg", "jpeg", "png"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "tasks", `${slug}.${ext}`))) return `/tasks/${slug}.${ext}`;
  }
  return null;
}

export default function TaskVisual({ slug, alt }: { slug: string; alt: string }) {
  const photo = findPhoto(slug);
  if (!photo) return <TaskIllustration slug={slug} />;
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
      <Image src={photo} alt={alt} fill sizes="(min-width: 1024px) 28rem, 100vw" className="object-cover" />
    </div>
  );
}
