"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatedShinyButton } from "@/components/eldoraui/animated-shiny-button";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionGlow } from "@/components/ui/section-glow";
import { budgetOptions, projectTypes, requestTypes, siteConfig, timelineOptions } from "@/lib/constants";
import { contactSchema, type ContactFormValues } from "@/lib/schemas";
import { cn } from "@/lib/utils";

type ApiResponse = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

const inputClass =
  "premium-focus mt-2 block w-full rounded-xl border border-rose-200/70 !bg-white/85 px-4 py-3.5 text-sm text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_32px_rgba(15,34,48,0.08)] outline-none transition placeholder:text-[var(--text-muted)]";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm font-medium text-amber-700">{message}</p>;
}

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      requestType: "Project Inquiry",
      fullName: "",
      workEmail: "",
      company: "",
      projectWebsite: "",
      projectType: "DevOps Consulting and Production Support",
      cloudProvider: "",
      currentInfrastructure: "",
      estimatedBudget: "Not decided",
      projectTimeline: "Not decided",
      projectDetails: "",
      website: "",
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestType = params.get("requestType");
    const projectType = params.get("projectType");
    const estimatedBudget = params.get("estimatedBudget");
    const projectTimeline = params.get("projectTimeline");
    const currentInfrastructure = params.get("currentInfrastructure");
    const projectDetails = params.get("projectDetails");
    const projectWebsite = params.get("projectWebsite");
    const cloudProvider = params.get("cloudProvider");

    if (requestTypes.includes(requestType as ContactFormValues["requestType"])) {
      setValue("requestType", requestType as ContactFormValues["requestType"], { shouldDirty: true, shouldValidate: true });
    }

    if (projectTypes.includes(projectType as ContactFormValues["projectType"])) {
      setValue("projectType", projectType as ContactFormValues["projectType"], { shouldDirty: true, shouldValidate: true });
    }

    if (budgetOptions.includes(estimatedBudget as ContactFormValues["estimatedBudget"])) {
      setValue("estimatedBudget", estimatedBudget as ContactFormValues["estimatedBudget"], {
        shouldDirty: true,
        shouldValidate: true,
      });
    }

    if (timelineOptions.includes(projectTimeline as ContactFormValues["projectTimeline"])) {
      setValue("projectTimeline", projectTimeline as ContactFormValues["projectTimeline"], {
        shouldDirty: true,
        shouldValidate: true,
      });
    }

    if (currentInfrastructure) {
      setValue("currentInfrastructure", currentInfrastructure.slice(0, 1200), { shouldDirty: true, shouldValidate: true });
    }

    if (projectDetails) {
      setValue("projectDetails", projectDetails.slice(0, 2500), { shouldDirty: true, shouldValidate: true });
    }

    if (projectWebsite) {
      setValue("projectWebsite", projectWebsite.slice(0, 220), { shouldDirty: true, shouldValidate: true });
    }

    if (cloudProvider) {
      setValue("cloudProvider", cloudProvider.slice(0, 120), { shouldDirty: true, shouldValidate: true });
    }
  }, [setValue]);

  useEffect(() => {
    const handleContactPrepare = (event: Event) => {
      const detail = (
        event as CustomEvent<{
          requestType?: ContactFormValues["requestType"];
          projectType?: ContactFormValues["projectType"];
          currentInfrastructure?: string;
          estimatedBudget?: ContactFormValues["estimatedBudget"];
          projectTimeline?: ContactFormValues["projectTimeline"];
          projectDetails?: string;
        }>
      ).detail;

      setValue("requestType", detail?.requestType ?? "Book Consultation", { shouldDirty: true, shouldValidate: true });
      setValue("projectType", detail?.projectType ?? "DevOps Consulting and Production Support", {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("estimatedBudget", detail?.estimatedBudget ?? "Not decided", { shouldDirty: true, shouldValidate: true });
      setValue("projectTimeline", detail?.projectTimeline ?? "This week", { shouldDirty: true, shouldValidate: true });
      setValue(
        "currentInfrastructure",
        detail?.currentInfrastructure ?? "To be discussed during the consultation.",
        { shouldDirty: true, shouldValidate: true },
      );
      setValue(
        "projectDetails",
        detail?.projectDetails ??
          "I would like to book a consultation to review production risks, deployment workflow, infrastructure priorities, and the safest next steps.",
        { shouldDirty: true, shouldValidate: true },
      );
      setStatus("idle");
      setStatusMessage("");
      window.setTimeout(() => setFocus("fullName"), 260);
    };

    const handleBlueprintTransfer = (event: Event) => {
      const detail = (event as CustomEvent<{ projectName?: string; summary?: string; requirements?: string }>).detail;
      if (!detail) return;

      setValue("requestType", "Production Audit", { shouldDirty: true, shouldValidate: true });
      setValue("projectType", "Cloud Infrastructure", { shouldDirty: true, shouldValidate: true });
      setValue("currentInfrastructure", detail.requirements?.slice(0, 1200) ?? "", {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue(
        "projectDetails",
        [
          detail.summary ? `Please review this preliminary infrastructure blueprint: ${detail.summary}` : "",
          detail.projectName ? `Project/application: ${detail.projectName}` : "",
          "I would like a professional validation and implementation plan.",
        ]
          .filter(Boolean)
          .join("\n\n")
          .slice(0, 2500),
        { shouldDirty: true, shouldValidate: true },
      );
      setStatus("idle");
      setStatusMessage("");
    };

    window.addEventListener("contact:prepare", handleContactPrepare);
    window.addEventListener("ai-blueprint:send-to-contact", handleBlueprintTransfer);
    return () => {
      window.removeEventListener("contact:prepare", handleContactPrepare);
      window.removeEventListener("ai-blueprint:send-to-contact", handleBlueprintTransfer);
    };
  }, [setFocus, setValue]);

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as ApiResponse;

      if (!response.ok || !data.success) {
        Object.entries(data.errors ?? {}).forEach(([name, messages]) => {
          const message = messages?.[0];
          if (message) setError(name as keyof ContactFormValues, { type: "server", message });
        });
        setStatus("error");
        setStatusMessage(data.message ?? "Please review the form and try again.");
        return;
      }

      setStatus("success");
      setStatusMessage(data.message ?? "Your inquiry has been received.");
      reset();
    } catch {
      setStatus("error");
      setStatusMessage("The message could not be sent right now. Please email the project details directly.");
    }
  };

  return (
    <section id="contact" className="aurora-section border-t border-[#d6ebff]/10 bg-[linear-gradient(180deg,#06111f_0%,#081a2e_100%)] section-rhythm">
      <SectionGlow className="h-[560px] bg-[radial-gradient(ellipse_at_45%_0%,rgba(77,163,255,0.12),transparent_60%)]" />
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <FadeIn className="min-w-0">
            <SectionHeading title="Tell us where production needs to be stronger." eyebrow="Contact">
              <p>
                Share the current state, risk level, budget range, and timeline. You will receive a practical next step rather than an inflated proposal.
              </p>
            </SectionHeading>
            <div className="aurora-panel mt-8 rounded-[24px] p-6">
              <p className="text-sm font-semibold text-[var(--text-primary)]">What to expect</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                {[
                  "Share your requirements and current stack",
                  "Review production risks, access, and delivery path",
                  "Discuss a practical scope and recommended next step",
                  "Confirm response expectations, remote availability, and engagement type during review",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[var(--success)]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {siteConfig.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-3 rounded-lg border border-rose-200 bg-white/72 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-400"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {email}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="min-w-0">
          <form onSubmit={handleSubmit(onSubmit)} className="aurora-panel min-w-0 rounded-[24px] p-5 shadow-glow sm:p-7" noValidate>
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              {...register("website")}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="requestType" className="block text-sm font-medium text-[var(--text-primary)]">Request Type</label>
                <select id="requestType" className={inputClass} {...register("requestType")}>
                  {requestTypes.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <FieldError message={errors.requestType?.message} />
              </div>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[var(--text-primary)]">Name</label>
                <input id="fullName" autoComplete="name" className={inputClass} {...register("fullName")} />
                <FieldError message={errors.fullName?.message} />
              </div>
              <div>
                <label htmlFor="workEmail" className="block text-sm font-medium text-[var(--text-primary)]">Work Email</label>
                <input id="workEmail" type="email" autoComplete="email" className={inputClass} {...register("workEmail")} />
                <FieldError message={errors.workEmail?.message} />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[var(--text-primary)]">Company</label>
                <input id="company" autoComplete="organization" className={inputClass} {...register("company")} />
                <FieldError message={errors.company?.message} />
              </div>
              <div>
                <label htmlFor="projectWebsite" className="block text-sm font-medium text-[var(--text-primary)]">Website</label>
                <input id="projectWebsite" type="url" inputMode="url" autoComplete="url" className={inputClass} placeholder="https://example.com" {...register("projectWebsite")} />
                <FieldError message={errors.projectWebsite?.message} />
              </div>
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-[var(--text-primary)]">Service Needed</label>
                <select id="projectType" className={inputClass} {...register("projectType")}>
                  {projectTypes.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <FieldError message={errors.projectType?.message} />
              </div>
              <div>
                <label htmlFor="cloudProvider" className="block text-sm font-medium text-[var(--text-primary)]">Cloud Provider</label>
                <input id="cloudProvider" className={inputClass} placeholder="AWS, Azure, Google Cloud, DigitalOcean, on-prem..." {...register("cloudProvider")} />
                <FieldError message={errors.cloudProvider?.message} />
              </div>
              <div>
                <label htmlFor="estimatedBudget" className="block text-sm font-medium text-[var(--text-primary)]">Estimated Budget</label>
                <select id="estimatedBudget" className={inputClass} {...register("estimatedBudget")}>
                  {budgetOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <FieldError message={errors.estimatedBudget?.message} />
              </div>
              <div>
                <label htmlFor="projectTimeline" className="block text-sm font-medium text-[var(--text-primary)]">Project Timeline</label>
                <select id="projectTimeline" className={inputClass} {...register("projectTimeline")}>
                  {timelineOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <FieldError message={errors.projectTimeline?.message} />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="currentInfrastructure" className="block text-sm font-medium text-[var(--text-primary)]">Current Stack</label>
              <textarea
                id="currentInfrastructure"
                rows={4}
                className={inputClass}
                placeholder="AWS EC2, DigitalOcean droplet, Nginx, PM2, Docker, Kubernetes, GitHub Actions, Prometheus, Grafana..."
                {...register("currentInfrastructure")}
              />
              <FieldError message={errors.currentInfrastructure?.message} />
            </div>

            <div className="mt-5">
              <label htmlFor="projectDetails" className="block text-sm font-medium text-[var(--text-primary)]">Delivery Goal and Risk</label>
              <textarea
                id="projectDetails"
                rows={6}
                className={inputClass}
                placeholder="Describe what you need to ship or stabilize, what feels risky, deadline constraints, access boundaries, and the outcome you want."
                {...register("projectDetails")}
              />
              <FieldError message={errors.projectDetails?.message} />
            </div>

            <div
              role="status"
              aria-live="polite"
              className={cn(
                "mt-5 rounded-xl border px-4 py-3 text-sm",
                status === "success" && "border-emerald-200 bg-emerald-50 text-emerald-800",
                status === "error" && "border-amber-200 bg-amber-50 text-amber-800",
                status === "idle" && "hidden",
              )}
            >
              <span className="inline-flex items-start gap-2">
                {status === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4" aria-hidden="true" /> : <AlertCircle className="mt-0.5 h-4 w-4" aria-hidden="true" />}
                {statusMessage}
              </span>
            </div>

            <AnimatedShinyButton type="submit" className="mt-7 w-full" disabled={isSubmitting} showArrow={false}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
              {isSubmitting ? "Sending request" : "Request Consultation"}
            </AnimatedShinyButton>
            <p className="mt-4 text-xs leading-6 text-[var(--text-muted)]">
              Your project details are used only to prepare a practical response and next-step recommendation. You can also email {siteConfig.supportEmail} or {siteConfig.infoEmail}.
            </p>
          </form>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
