import PageHero from "./PageHero";

export default function LegalPage({
  title,
  sections,
}: {
  title: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <PageHero title={title} subtitle="Last updated: November 2026 (draft, to be reviewed before launch)" />
      <section className="container-x max-w-3xl space-y-6 py-12">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="font-display text-2xl font-semibold">{s.heading}</h2>
            <p className="mt-2 text-muted">{s.body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
