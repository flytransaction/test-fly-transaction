import { ReactNode } from "react";

type Section = { title: string; body: ReactNode };

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <section className="container-custom py-16 md:py-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Last updated: {updated}
          </p>
        </div>

        {/* Intro */}
        <div className="card p-6 mb-8">
          <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {intro}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={s.title}>
              <h2 className="text-xl font-semibold mb-3">
                {i + 1}. {s.title}
              </h2>
              <div
                className="text-sm leading-relaxed space-y-3"
                style={{ color: "var(--text-muted)" }}
              >
                {s.body}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div
          className="mt-12 pt-6 text-sm"
          style={{
            borderTop: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}
        >
          Questions about this document? Email{" "}
          <a
            href="mailto:legal@flytransaction.com"
            className="text-brand hover:underline"
          >
            legal@flytransaction.com
          </a>
        </div>
      </div>
    </section>
  );
}