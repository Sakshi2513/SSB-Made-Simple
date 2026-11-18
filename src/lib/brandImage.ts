import fs from "node:fs";
import path from "node:path";

// Returns "/brand/<name>.<ext>" if a banner image exists in public/brand, otherwise null.
export function brandImage(name: string): string | null {
  for (const ext of ["webp", "jpg", "jpeg", "png"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "brand", `${name}.${ext}`))) return `/brand/${name}.${ext}`;
  }
  return null;
}
