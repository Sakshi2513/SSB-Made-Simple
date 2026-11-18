import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

function findPhoto(slug: string): string | null {
  for (const ext of ["webp", "jpg", "jpeg", "png"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "tasks", `${slug}.${ext}`))) return `/tasks/${slug}.${ext}`;
  }
  return null;
}

// Photo on the right side of a hero, slightly blurred and faded into the dark background on its left edge.
export default function TaskBackdrop({ slug }: { slug: string; strength?: number }) {
  const photo = slug.split("|").map(findPhoto).find(Boolean) ?? null;
  return (
    <>
      {photo && (
        <div
          className="absolute inset-y-0 right-0 w-full opacity-40 lg:w-[60%] lg:opacity-100 [mask-image:linear-gradient(90deg,transparent,#000_42%)]"
          aria-hidden="true"
        >
          <Image src={photo} alt="" fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="scale-105 object-cover blur-[3px]" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1020] via-transparent to-[#0b1020]/40" aria-hidden="true" />
    </>
  );
}
