import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { BreadcrumbJsonLd } from "@/components/ui/breadcrumb-json-ld";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/ui/contact-cta";
import { PageHero } from "@/components/ui/page-hero";
import { ProcessTimeline } from "@/components/sections/process-timeline";
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
  const processSteps = engagementProcess.map((stage, index) => ({
    ...stage,
    ...stageDetails[index],
  }));

  return (
    <SiteFrame>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Process", path: "/process" },
        ]}
      />
      <PageHero
        eyebrow="Process"
        title="A production-first workflow from discovery to support."
        dark
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

      <ProcessTimeline
        steps={processSteps}
        eyebrow="Engagement timeline"
        title="Every stage produces a practical deliverable."
        description="The flow keeps goals, access, risks, implementation work, validation, and handover visible from the first call through ongoing support."
        layout="detailed"
      />

      <ContactCta title="Move from unclear production risk to a scoped next step." />
    </SiteFrame>
  );
}
