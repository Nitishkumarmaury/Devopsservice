"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Cloud, Cpu, Layers, MessageSquarePlus, Star, X } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

type ReviewCategory = "Cloud Infrastructure" | "Deployment Services" | "Cloud & Deployment";

type WriteReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedReviews: Testimonial[]) => void;
};

type ReviewSubmissionResponse = {
  success: boolean;
  error?: string;
  message?: string;
  reviews?: Testimonial[];
};

const categories: { id: ReviewCategory; label: string; Icon: typeof Cloud }[] = [
  { id: "Cloud Infrastructure", label: "Cloud", Icon: Cloud },
  { id: "Deployment Services", label: "Deployment", Icon: Cpu },
  { id: "Cloud & Deployment", label: "Both", Icon: Layers },
];

const inputClassName =
  "w-full rounded-lg border border-[#d6ebff]/12 bg-[#06111f]/80 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/15";

export function WriteReviewModal({ isOpen, onClose, onSuccess }: Readonly<WriteReviewModalProps>) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [project, setProject] = useState("");
  const [serviceCategory, setServiceCategory] = useState<ReviewCategory>("Cloud & Deployment");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const resetForm = () => {
    setName("");
    setPosition("");
    setCompany("");
    setProject("");
    setServiceCategory("Cloud & Deployment");
    setRating(5);
    setQuote("");
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !company.trim() || !quote.trim()) {
      setErrorMsg("Please fill out your name, company, and review message.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          position,
          company,
          project,
          serviceCategory,
          rating,
          quote,
          industry: "Software & Technology",
        }),
      });
      const data = (await response.json().catch(() => null)) as ReviewSubmissionResponse | null;

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Unable to submit your review right now.");
      }

      if (Array.isArray(data.reviews)) onSuccess(data.reviews);
      setSuccessMsg(data.message || "Thank you! Your review is now live.");

      window.setTimeout(() => {
        resetForm();
        onClose();
      }, 1600);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] grid place-items-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#06111f]/90 backdrop-blur-lg"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="write-review-title"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl max-h-[calc(100dvh-1rem)] overflow-y-auto overscroll-contain rounded-2xl border border-[#d6ebff]/14 bg-[#0d2338] p-4 shadow-[0_32px_120px_rgba(0,0,0,0.7)] sm:max-h-[calc(100dvh-2rem)] sm:p-5"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#d6ebff]/10 pb-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#4da3ff]/20 bg-[#4da3ff]/10 text-[#4da3ff]">
                  <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 id="write-review-title" className="text-lg font-semibold text-white">
                    Write a client review
                  </h3>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">A few details are all we need.</p>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close review form"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#d6ebff]/12 bg-[#06111f]/60 text-white/70 transition hover:bg-[#12304b] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#4da3ff]/50"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {successMsg ? (
              <div className="my-6 flex flex-col items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                <p className="mt-2 text-base font-semibold text-white">{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
                {errorMsg && (
                  <div role="alert" className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                  <fieldset>
                    <legend className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Service provided
                    </legend>
                    <div className="grid grid-cols-3 gap-2">
                      {categories.map(({ id, label, Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setServiceCategory(id)}
                          className={[
                            "inline-flex min-h-10 items-center justify-center gap-1 rounded-lg border px-2 py-2 text-[11px] font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#4da3ff]/50",
                            serviceCategory === id
                              ? "border-[#4da3ff] bg-[#4da3ff]/15 text-white"
                              : "border-[#d6ebff]/12 bg-[#06111f]/60 text-[var(--text-secondary)] hover:border-[#4da3ff]/30 hover:text-white",
                          ].join(" ")}
                        >
                          <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Rating
                    </legend>
                    <div className="flex h-10 items-center rounded-lg border border-[#d6ebff]/12 bg-[#06111f]/60 px-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          aria-label={`${star} star${star === 1 ? "" : "s"}`}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-0.5 transition-transform hover:scale-110 focus:outline-none"
                        >
                          <Star
                            className={[
                              "h-5 w-5",
                              star <= (hoverRating || rating) ? "fill-[#ffcf72] text-[#ffcf72]" : "fill-[#06111f] text-slate-600",
                            ].join(" ")}
                            aria-hidden="true"
                          />
                        </button>
                      ))}
                      <span className="ml-1 border-l border-[#d6ebff]/10 pl-2 font-mono text-xs text-[#ffcf72]">{rating}/5</span>
                    </div>
                  </fieldset>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-xs font-medium text-[var(--text-secondary)]">
                    Full name *
                    <input
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      placeholder="Alex Morgan"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className={`mt-1 ${inputClassName}`}
                    />
                  </label>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">
                    Position / title
                    <input
                      type="text"
                      maxLength={120}
                      placeholder="CTO"
                      value={position}
                      onChange={(event) => setPosition(event.target.value)}
                      className={`mt-1 ${inputClassName}`}
                    />
                  </label>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">
                    Company *
                    <input
                      type="text"
                      required
                      maxLength={120}
                      autoComplete="organization"
                      placeholder="Company name"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      className={`mt-1 ${inputClassName}`}
                    />
                  </label>
                  <label className="text-xs font-medium text-[var(--text-secondary)]">
                    Project delivered
                    <input
                      type="text"
                      maxLength={160}
                      placeholder="AWS migration"
                      value={project}
                      onChange={(event) => setProject(event.target.value)}
                      className={`mt-1 ${inputClassName}`}
                    />
                  </label>
                </div>

                <label className="text-xs font-medium text-[var(--text-secondary)]">
                  <span className="flex items-center justify-between gap-3">
                    Your feedback *
                    <span className="font-normal text-[var(--text-muted)]">{quote.length}/5000</span>
                  </span>
                  <textarea
                    required
                    rows={3}
                    maxLength={5000}
                    placeholder="Tell us about the work and results…"
                    value={quote}
                    onChange={(event) => setQuote(event.target.value)}
                    className={`mt-1 min-h-24 resize-y ${inputClassName}`}
                  />
                </label>

                <div className="flex items-center justify-end gap-2 border-t border-[#d6ebff]/10 pt-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-[#d6ebff]/12 bg-[#06111f]/60 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#12304b]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg border border-[#4da3ff]/50 bg-[#4da3ff] px-4 py-2 text-xs font-semibold text-[#06111f] shadow-[0_8px_20px_rgba(77,163,255,0.2)] transition hover:bg-[#b9ddff] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Submitting…" : "Submit review"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
