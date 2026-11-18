export default function Article({ body }: { body: string[] }) {
  const out: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flush = (key: string) => {
    if (bullets.length) {
      out.push(
        <ul key={key} className="list-disc space-y-1 pl-5">
          {bullets.map((b, j) => (
            <li key={j}>{b}</li>
          ))}
        </ul>,
      );
      bullets = [];
    }
  };

  body.forEach((line, i) => {
    if (line.startsWith("- ")) {
      bullets.push(line.slice(2));
      return;
    }
    flush(`ul-${i}`);
    out.push(
      line.startsWith("## ") ? (
        <h2 key={i} className="pt-2 font-display text-2xl font-semibold text-foreground">
          {line.slice(3)}
        </h2>
      ) : (
        <p key={i}>{line}</p>
      ),
    );
  });
  flush("ul-end");

  return <div className="space-y-4 leading-relaxed text-muted">{out}</div>;
}
