import Link from "next/link";
import PageHero from "./PageHero";

export default function ComingSoon({ title, note }: { title: string; note: string }) {
  return (
    <>
      <PageHero title={title} subtitle={note} />
      <section className="container-x py-16 text-center">
        <p className="text-muted">This section is being built and will be live soon.</p>
        <Link href="/" className="btn-primary mt-6">
          Back to Home
        </Link>
      </section>
    </>
  );
}
