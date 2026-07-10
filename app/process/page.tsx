import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { engagementProcess } from "@/data/landing";
import { createPageMetadata } from "@/lib/route-metadata";

const stageDetails = [
  {
    objective: "Understand goals, risks, technical context, and delivery constraints.",
    input: "Business goal, application overview, timeline, and known production concerns.",
    work: "Clarify scope, access needs, current stack, risk level, and first recommendations.",
    next: "Decide whether an audit, implementation, or urgent support path is appropriate.",
  },
  {
    objective: "Find gaps in infrastructure, deployment, monitoring, security, and operations.",
    input: "Server/cloud access summary, deployment process, DNS/proxy details, and incident history.",
    work: "Review servers, release flow, process manager, SSL, firewall, logs, and monitoring coverage.",
    next: "Prioritize the highest-impact improvements and delivery order.",
  },
  {
    objective: "Turn findings into a practical implementation plan.",
    input: "Budget range, acceptable downtime, preferred tooling, and support expectations.",
    work: "Define architecture, release strategy, validation, rollback, monitoring, and handover steps.",
    next: "Confirm scope, timeline, access requirements, and responsibilities.",
  },
  {
    objective: "Configure infrastructure and automate the agreed production workflow.",
    input: "Repository, server/cloud access, environment variables, domain access, and approval windows.",
    work: "Implement server setup, proxy, SSL, PM2/Docker, CI/CD, monitoring, and validation steps.",
    next: "Run checks and prepare documentation for handover.",
  },
  {
    objective: "Confirm the system works and the team understands operational steps.",
    input: "Test cases, release window availability, and acceptance criteria.",
    work: "Validate deployment, uptime, logs, rollback notes, monitoring, and operational documentation.",
    next: "Move into support, maintenance, or follow-up improvements.",
  },
  {
    objective: "Keep production visible and easier to maintain after delivery.",
    input: "Support window, communication channel, alert expectations, and release rhythm.",
    work: "Review dashboards, alerts, patches, incidents, release support, and improvement backlog.",
    next: "Adjust support scope as production needs change.",
  },
] as const;

export const metadata: Metadata = createPageMetadata({
  title: "DevOps Engagement Process",
  description:
    "A complete DevOps and cloud infrastructure engagement workflow from discovery and audit to implementation, validation, handover, monitoring, and support.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <SiteFrame>
      <PageHero
        eyebrow="Process"
        title="A production-first workflow from discovery to support."
        actions={
          <ButtonLink href="/contact?requestType=Production%20Audit">
            Start with an audit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        }
      >
        Each stage keeps business goals, technical risks, access requirements, validation, and handover visible before
        changes reach production.
      </PageHero>

      <section className="bg-[var(--background-soft)] py-16 sm:py-24">
        <Container>
          <div className="relative grid gap-6">
            <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-rose-300 via-violet-300 to-cyan-300 md:block" />
            {engagementProcess.map((stage, index) => {
              const detail = stageDetails[index];
              return (
                <article key={stage.title} className="relative grid gap-5 rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)] md:grid-cols-[0.45fr_1fr] md:p-8">
                  <div>
                    <span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 font-mono text-sm font-semibold text-rose-800">
                      0{index + 1}
                    </span>
                    <h2 className="mt-5 text-2xl font-semibold tracking-[-0.025em] text-[var(--text-primary)]">{stage.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{stage.deliverable}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Detail title="Objective" text={detail.objective} />
                    <Detail title="Client input required" text={detail.input} />
                    <Detail title="Work performed" text={detail.work} />
                    <Detail title="Next step" text={detail.next} />
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <ContactCta title="Move from unclear production risk to a scoped next step." />
    </SiteFrame>
  );
}

function Detail({ title, text }: Readonly<{ title: string; text: string }>) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
      <p className="text-sm font-semibold text-[var(--text-primary)]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{text}</p>
    </div>
  );
}
