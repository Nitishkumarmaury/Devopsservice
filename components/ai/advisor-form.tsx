"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm, useWatch, type Path } from "react-hook-form";
import { AdvisorPrivacyNotice } from "@/components/ai/advisor-privacy-notice";
import { Button } from "@/components/ui/button";
import Strands from "@/components/visuals/strands";
import {
  advisorRequestSchema,
  applicationTypeOptions,
  challengePromptOptions,
  cloudPlatformOptions,
  environmentOptions,
  requirementOptions,
  type AdvisorRequest,
} from "@/lib/ai/advisor-schema";
import { cn } from "@/lib/utils";

type AdvisorFormProps = {
  initialValues?: AdvisorRequest;
  isSubmitting: boolean;
  onSubmit: (values: AdvisorRequest) => void;
};

type Step = 0 | 1 | 2 | 3;

const steps = ["Application", "Infrastructure", "Requirements", "Challenges"] as const;
const stepAccentClass = [
  "border-cyan-200 bg-[linear-gradient(135deg,rgba(18,169,199,0.12),rgba(244,249,251,0.9))] text-cyan-800 shadow-[0_14px_34px_rgba(18,169,199,0.1)]",
  "border-blue-200 bg-[linear-gradient(135deg,rgba(85,104,255,0.12),rgba(244,249,251,0.9))] text-blue-800 shadow-[0_14px_34px_rgba(85,104,255,0.1)]",
  "border-violet-200 bg-[linear-gradient(135deg,rgba(49,92,148,0.12),rgba(244,249,251,0.9))] text-violet-800 shadow-[0_14px_34px_rgba(49,92,148,0.1)]",
  "border-rose-200 bg-[linear-gradient(135deg,rgba(14,165,183,0.14),rgba(244,249,251,0.9))] text-rose-800 shadow-[0_14px_34px_rgba(14,165,183,0.1)]",
] as const;

const defaultValues: AdvisorRequest = {
  projectName: "",
  applicationType: "SaaS Platform",
  technologyStack: "",
  database: "",
  currentHostingProvider: "",
  expectedMonthlyUsers: "",
  expectedConcurrentUsers: "",
  currentServerConfiguration: "",
  preferredCloudPlatform: "No preference",
  environments: "Development, staging, and production",
  requirements: ["CI/CD automation", "Docker containerization", "Monitoring and alerts", "Automatic backups"],
  challenges: "",
  privacyAccepted: false,
  website: "",
};

const stepFields: Record<Step, Path<AdvisorRequest>[]> = {
  0: ["projectName", "applicationType", "technologyStack", "database", "currentHostingProvider"],
  1: [
    "expectedMonthlyUsers",
    "expectedConcurrentUsers",
    "currentServerConfiguration",
    "preferredCloudPlatform",
    "environments",
  ],
  2: ["requirements"],
  3: ["challenges", "privacyAccepted"],
};

const inputClass =
  "premium-focus mt-2 block w-full min-w-0 rounded-xl border border-rose-200/70 !bg-white/86 px-4 py-3.5 text-sm text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_32px_rgba(15,34,48,0.08)] outline-none transition placeholder:text-[var(--text-muted)]";

const labelClass = "block text-sm font-medium text-[var(--text-primary)]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-amber-700">
      {message}
    </p>
  );
}

function StepHeader({ step }: { step: Step }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-xs uppercase leading-6 tracking-[0.14em] text-rose-700 sm:tracking-[0.18em]">Step {step + 1} of 4</p>
        <h3 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">{steps[step]}</h3>
      </div>
      <div className="grid w-full grid-cols-4 gap-2 sm:w-auto" aria-label="Advisor progress">
        {steps.map((label, index) => (
          <span
            key={label}
            className={cn(
              "h-2.5 min-w-0 rounded-full transition sm:w-10",
              index <= step ? "aurora-gradient shadow-[0_0_18px_rgba(14,165,183,0.18)]" : "bg-rose-100",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function AdvisorForm({ initialValues, isSubmitting, onSubmit }: Readonly<AdvisorFormProps>) {
  const [step, setStep] = useState<Step>(0);
  const [direction, setDirection] = useState(1);
  const formDefaults = useMemo(() => initialValues ?? defaultValues, [initialValues]);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    setValue,
    formState: { errors },
  } = useForm<AdvisorRequest>({
    resolver: zodResolver(advisorRequestSchema),
    defaultValues: formDefaults,
    mode: "onBlur",
  });

  const requirements = useWatch({ control, name: "requirements" }) ?? [];
  const challenges = useWatch({ control, name: "challenges" }) ?? "";

  const goToStep = async (targetStep: Step) => {
    if (targetStep <= step) {
      setDirection(-1);
      setStep(targetStep);
      return;
    }

    const valid = await trigger(stepFields[step], { shouldFocus: true });
    if (!valid) return;

    setDirection(1);
    setStep(targetStep);
  };

  const nextStep = async () => {
    if (step === 3) return;
    await goToStep((step + 1) as Step);
  };

  const previousStep = () => {
    if (step === 0) return;
    setDirection(-1);
    setStep((step - 1) as Step);
  };

  const toggleRequirement = (requirement: (typeof requirementOptions)[number]) => {
    const selected = requirements.includes(requirement);
    setValue(
      "requirements",
      selected ? requirements.filter((item) => item !== requirement) : [...requirements, requirement],
      { shouldDirty: true, shouldValidate: true },
    );
  };

  const addPrompt = (prompt: string) => {
    const nextValue = challenges.trim() ? `${challenges.trim()}\n${prompt}` : prompt;
    setValue("challenges", nextValue, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative min-w-0" noValidate>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register("website")} />

      <div className="min-w-0 rounded-2xl border border-rose-100 bg-white/68 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
        <div role="tablist" aria-label="Advisor steps" className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={step === index}
              aria-controls={`advisor-step-${index}`}
              onClick={() => goToStep(index as Step)}
              className={cn(
                "min-h-11 min-w-0 rounded-xl border px-3 py-2 text-sm font-semibold leading-tight transition [overflow-wrap:anywhere] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400",
                step === index
                  ? stepAccentClass[index]
                  : "border-rose-100 bg-white/72 text-[var(--text-muted)] hover:bg-rose-50 hover:text-[var(--text-primary)]",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-5 min-h-[360px] min-w-0 overflow-hidden rounded-2xl border border-rose-100 bg-white/74 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:min-h-[430px] sm:p-6">
        <div className="advisor-mobile-strands pointer-events-none absolute left-1/2 top-1 h-56 w-full -translate-x-1/2 overflow-hidden opacity-[0.78] sm:hidden" aria-hidden="true">
          <div className="absolute inset-0 -translate-x-[19%] opacity-90">
            <Strands
              className="h-full w-full"
              colors={["#0EA5B7", "#7C5CFF", "#F04493", "#D5A645"]}
              count={4}
              speed={0.44}
              amplitude={0.86}
              waviness={0.92}
              thickness={0.72}
              glow={2.45}
              taper={3.2}
              spread={0.9}
              intensity={0.58}
              saturation={1.8}
              opacity={0.92}
              scale={1.28}
              glass={false}
              refraction={1}
              dispersion={1}
              glassSize={1}
              hueShift={0.08}
            />
          </div>
          <div className="absolute inset-0 -translate-x-[19%] scale-x-[-1] opacity-90">
            <Strands
              className="h-full w-full"
              colors={["#0EA5B7", "#7C5CFF", "#F04493", "#D5A645"]}
              count={4}
              speed={0.44}
              amplitude={0.86}
              waviness={0.92}
              thickness={0.72}
              glow={2.45}
              taper={3.2}
              spread={0.9}
              intensity={0.58}
              saturation={1.8}
              opacity={0.92}
              scale={1.28}
              glass={false}
              refraction={1}
              dispersion={1}
              glassSize={1}
              hueShift={0.08}
            />
          </div>
        </div>
        <div className="relative">
          <StepHeader step={step} />

          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={step}
              id={`advisor-step-${step}`}
              role="tabpanel"
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 24 : -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -24 : 24 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="mt-6 min-w-0"
            >
            {step === 0 ? (
              <div className="grid min-w-0 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="advisor-project-name" className={labelClass}>
                    Project or application name
                  </label>
                  <input
                    id="advisor-project-name"
                    className={inputClass}
                    aria-describedby="advisor-project-name-error"
                    {...register("projectName")}
                  />
                  <FieldError id="advisor-project-name-error" message={errors.projectName?.message} />
                </div>
                <div>
                  <label htmlFor="advisor-application-type" className={labelClass}>
                    Application type
                  </label>
                  <select id="advisor-application-type" className={inputClass} {...register("applicationType")}>
                    {applicationTypeOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <FieldError id="advisor-application-type-error" message={errors.applicationType?.message} />
                </div>
                <div>
                  <label htmlFor="advisor-stack" className={labelClass}>
                    Technology stack
                  </label>
                  <input
                    id="advisor-stack"
                    className={inputClass}
                    placeholder="Next.js, Node, Laravel, Django, React Native..."
                    aria-describedby="advisor-stack-error"
                    {...register("technologyStack")}
                  />
                  <FieldError id="advisor-stack-error" message={errors.technologyStack?.message} />
                </div>
                <div>
                  <label htmlFor="advisor-database" className={labelClass}>
                    Database
                  </label>
                  <input
                    id="advisor-database"
                    className={inputClass}
                    placeholder="PostgreSQL, MySQL, MongoDB, Redis..."
                    aria-describedby="advisor-database-error"
                    {...register("database")}
                  />
                  <FieldError id="advisor-database-error" message={errors.database?.message} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="advisor-hosting" className={labelClass}>
                    Current hosting provider
                  </label>
                  <input
                    id="advisor-hosting"
                    className={inputClass}
                    placeholder="AWS, DigitalOcean, shared hosting, on-prem, no hosting yet..."
                    aria-describedby="advisor-hosting-error"
                    {...register("currentHostingProvider")}
                  />
                  <FieldError id="advisor-hosting-error" message={errors.currentHostingProvider?.message} />
                </div>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="grid min-w-0 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="advisor-monthly-users" className={labelClass}>
                    Expected monthly users
                  </label>
                  <input
                    id="advisor-monthly-users"
                    className={inputClass}
                    placeholder="10k now, 100k in six months"
                    aria-describedby="advisor-monthly-users-error"
                    {...register("expectedMonthlyUsers")}
                  />
                  <FieldError id="advisor-monthly-users-error" message={errors.expectedMonthlyUsers?.message} />
                </div>
                <div>
                  <label htmlFor="advisor-concurrent-users" className={labelClass}>
                    Expected concurrent users
                  </label>
                  <input
                    id="advisor-concurrent-users"
                    className={inputClass}
                    placeholder="200 peak users"
                    aria-describedby="advisor-concurrent-users-error"
                    {...register("expectedConcurrentUsers")}
                  />
                  <FieldError id="advisor-concurrent-users-error" message={errors.expectedConcurrentUsers?.message} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="advisor-server" className={labelClass}>
                    Current server configuration
                  </label>
                  <textarea
                    id="advisor-server"
                    rows={3}
                    className={inputClass}
                    placeholder="One Ubuntu VM, Nginx, PM2, managed database, manual deploys..."
                    aria-describedby="advisor-server-error"
                    {...register("currentServerConfiguration")}
                  />
                  <FieldError id="advisor-server-error" message={errors.currentServerConfiguration?.message} />
                </div>
                <div>
                  <label htmlFor="advisor-cloud" className={labelClass}>
                    Preferred cloud platform
                  </label>
                  <select id="advisor-cloud" className={inputClass} {...register("preferredCloudPlatform")}>
                    {cloudPlatformOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <FieldError id="advisor-cloud-error" message={errors.preferredCloudPlatform?.message} />
                </div>
                <div>
                  <label htmlFor="advisor-environments" className={labelClass}>
                    Number of environments
                  </label>
                  <select id="advisor-environments" className={inputClass} {...register("environments")}>
                    {environmentOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <FieldError id="advisor-environments-error" message={errors.environments?.message} />
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <div className="grid min-w-0 gap-3 sm:grid-cols-2">
                  {requirementOptions.map((requirement) => {
                    const selected = requirements.includes(requirement);
                    return (
                      <button
                        key={requirement}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleRequirement(requirement)}
                        className={cn(
                          "flex min-h-12 min-w-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm leading-6 transition [overflow-wrap:anywhere] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400",
                          selected
                            ? "border-violet-200 bg-violet-50 text-violet-800 shadow-[0_14px_34px_rgba(49,92,148,0.1)]"
                            : "border-rose-100 bg-white/72 text-[var(--text-muted)] hover:bg-rose-50 hover:text-[var(--text-primary)]",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                            selected ? "border-violet-300 bg-violet-200 text-violet-900" : "border-rose-200 bg-white",
                          )}
                          aria-hidden="true"
                        >
                          {selected ? <Check className="h-3.5 w-3.5" /> : null}
                        </span>
                        {requirement}
                      </button>
                    );
                  })}
                </div>
                <FieldError id="advisor-requirements-error" message={errors.requirements?.message} />
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-5">
                <div>
                  <label htmlFor="advisor-challenges" className={labelClass}>
                    What infrastructure or deployment problems are you trying to solve?
                  </label>
                  <textarea
                    id="advisor-challenges"
                    rows={5}
                    className={inputClass}
                    aria-describedby="advisor-challenges-error"
                    {...register("challenges")}
                  />
                  <FieldError id="advisor-challenges-error" message={errors.challenges?.message} />
                </div>

                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Suggested prompts</p>
                  <div className="mt-3 flex min-w-0 flex-wrap gap-2">
                    {challengePromptOptions.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => addPrompt(prompt)}
                        className="max-w-full rounded-lg border border-rose-100 bg-white/72 px-3 py-2 text-left text-xs leading-5 text-[var(--text-secondary)] transition [overflow-wrap:anywhere] hover:border-rose-300 hover:bg-rose-50 hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                <AdvisorPrivacyNotice />

                <label className="flex min-w-0 gap-3 rounded-lg border border-rose-100 bg-white/72 p-4 text-sm leading-6 text-[var(--text-secondary)]">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 shrink-0 rounded border-rose-300 bg-white text-rose-500 focus:ring-rose-400"
                    {...register("privacyAccepted")}
                  />
                  <span>
                    I understand that this tool provides preliminary recommendations and I will not submit confidential
                    credentials or sensitive data.
                  </span>
                </label>
                <FieldError id="advisor-privacy-error" message={errors.privacyAccepted?.message} />
              </div>
            ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-5 flex min-w-0 flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" variant="ghost" onClick={previousStep} disabled={step === 0 || isSubmitting}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Button>

        {step < 3 ? (
          <Button type="button" onClick={nextStep} disabled={isSubmitting}>
            Continue
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
            {isSubmitting ? "Generating Blueprint" : "Start Your Blueprint"}
          </Button>
        )}
      </div>
    </form>
  );
}
