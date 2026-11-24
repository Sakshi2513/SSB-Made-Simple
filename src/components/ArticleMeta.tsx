import { CalendarCheck } from "lucide-react";

// "Last updated" + tags shown under an article's title.
export default function ArticleMeta({ updatedAt, tags }: { updatedAt?: string; tags?: string[] }) {
  if (!updatedAt && !tags?.length) return null;
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
      {updatedAt && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e4f1dc] px-3 py-1 font-bold text-[#3d6b24]">
          <CalendarCheck size={14} /> Last updated {new Date(updatedAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
        </span>
      )}
      {tags?.map((t) => <span key={t} className="rounded-full bg-[#eef3fb] px-3 py-1 font-bold text-[#1c4cb0]">#{t}</span>)}
    </div>
  );
}
