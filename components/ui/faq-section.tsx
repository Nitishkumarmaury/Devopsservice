import { CheckCircle2, HelpCircle } from "lucide-react";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { Container } from "@/components/ui/container";

type FaqItem = { readonly question: string; readonly answer: string };

export function FaqSection({ title, items }: Readonly<{ title: string; items: readonly FaqItem[] }>) {
  return (
    <section className="bg-[var(--background-soft)] py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">FAQ</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">{title}</h2>
        </div>
        <StaggerReveal className="mt-8 grid gap-4 lg:grid-cols-2">
          {items.map((item) => (
            <article key={item.question} className="flex h-full flex-col rounded-[22px] border border-[var(--border)] bg-white p-6">
              <HelpCircle className="h-5 w-5 text-[var(--rose-dark)]" aria-hidden="true" />
              <h3 className="mt-4 font-semibold text-[var(--text-primary)]">{item.question}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.answer}</p>
            </article>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}

type SectionItem = {
  readonly heading: string;
  readonly body: string;
  readonly bullets?: readonly string[];
};

export function BulletCardGrid({ title, eyebrow, items }: Readonly<{ title: string; eyebrow: string; items: readonly SectionItem[] }>) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">{eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">{title}</h2>
        </div>
        <StaggerReveal className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
          {items.map((section) => (
            <article key={section.heading} className="flex h-full flex-col rounded-[26px] border border-[var(--border)] bg-[var(--background-soft)] p-6">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{section.heading}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{section.body}</p>
              {section.bullets ? (
                <ul className="mt-4 grid content-start gap-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--success)]" aria-hidden="true" />
                      <span className="min-w-0">{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}

export function BuildFaqJsonLd(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "FAQPage" as const,
    mainEntity: items.map((item) => ({
      "@type": "Question" as const,
      name: item.question,
      acceptedAnswer: { "@type": "Answer" as const, text: item.answer },
    })),
  };
}
