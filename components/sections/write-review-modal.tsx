"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Cloud, Cpu, Layers, MessageSquarePlus, Star, X } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

type WriteReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedReviews: Testimonial[]) => void;
};

export function WriteReviewModal({ isOpen, onClose, onSuccess }: Readonly<WriteReviewModalProps>) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [project, setProject] = useState("");
  const [serviceCategory, setServiceCategory] = useState<"Cloud Infrastructure" | "Deployment Services" | "Cloud & Deployment">("Cloud & Deployment");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [quote, setQuote] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !quote) {
      setErrorMsg("Please fill out your name, company, and review message.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          position: position || "Client Partner",
          company,
          project: project || "Cloud & Deployment Engagement",
          serviceCategory,
          rating,
          quote,
          industry: "Software & Technology",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit review");
      }

      setSuccessMsg(data.message || "Thank you! Your review has been formatted and published.");
      if (data.reviews) {
        onSuccess(data.reviews);
      }

      setTimeout(() => {
        setName("");
        setPosition("");
        setCompany("");
        setProject("");
        setRating(5);
        setQuote("");
        setSuccessMsg("");
        onClose();
      }, 1800);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#06111f]/90 backdrop-blur-lg"
          />

          {/* Centering wrapper — scrolls when content exceeds the viewport */}
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative z-10 w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-[28px] border border-[#d6ebff]/14 bg-[#0d2338] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.7)] sm:p-8"
            >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-xl border border-[#d6ebff]/12 bg-[#06111f]/60 text-white/70 hover:bg-[#12304b] hover:text-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#4da3ff]/20 bg-[#4da3ff]/10 text-[#4da3ff]">
                <MessageSquarePlus className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-white">Write a Client Review</h3>
                <p className="text-xs text-[var(--text-muted)]">Share feedback on Cloud Services or Deployment Services delivered</p>
              </div>
            </div>

            {successMsg ? (
              <div className="my-8 flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                <p className="mt-3 text-lg font-semibold text-white">{successMsg}</p>
                <p className="mt-1 text-xs text-emerald-200/80">Your review is formatted & verified live on the website.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {errorMsg && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
                    {errorMsg}
                  </div>
                )}

                {/* Service Category Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    Select Service Provided *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: "Cloud Infrastructure", label: "Cloud Services", Icon: Cloud },
                        { id: "Deployment Services", label: "Deployment", Icon: Cpu },
                        { id: "Cloud & Deployment", label: "Both Services", Icon: Layers },
                      ] as const
                    ).map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setServiceCategory(cat.id)}
                        className={[
                          "flex flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all",
                          serviceCategory === cat.id
                            ? "border-[#4da3ff] bg-[#4da3ff]/15 text-white shadow-[0_0_16px_rgba(77,163,255,0.2)]"
                            : "border-[#d6ebff]/12 bg-[#06111f]/60 text-[var(--text-secondary)] hover:border-[#4da3ff]/30 hover:text-white",
                        ].join(" ")}
                      >
                        <cat.Icon className={`h-4 w-4 mb-1 ${serviceCategory === cat.id ? "text-[#4da3ff]" : "text-gray-400"}`} />
                        <span className="text-xs font-semibold">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Select */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    Rating *
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          className={`h-7 w-7 ${
                            star <= (hoverRating || rating)
                              ? "fill-[#ffcf72] text-[#ffcf72]"
                              : "fill-[#06111f] text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 font-mono text-sm text-[#ffcf72]">{rating}.0 / 5.0</span>
                  </div>
                </div>

                {/* Grid Inputs */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="review-name" className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Full Name *
                    </label>
                    <input
                      id="review-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-[#d6ebff]/12 bg-[#06111f]/80 px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:border-[#4da3ff] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="review-position" className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Position / Title
                    </label>
                    <input
                      id="review-position"
                      type="text"
                      placeholder="e.g. CTO / Engineering Lead"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full rounded-xl border border-[#d6ebff]/12 bg-[#06111f]/80 px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:border-[#4da3ff] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="review-company" className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Company / Organization *
                    </label>
                    <input
                      id="review-company"
                      type="text"
                      required
                      placeholder="e.g. TechCorp"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full rounded-xl border border-[#d6ebff]/12 bg-[#06111f]/80 px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:border-[#4da3ff] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="review-project" className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Project Delivered
                    </label>
                    <input
                      id="review-project"
                      type="text"
                      placeholder="e.g. AWS Migration & CI/CD Pipeline"
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      className="w-full rounded-xl border border-[#d6ebff]/12 bg-[#06111f]/80 px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:border-[#4da3ff] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label htmlFor="review-quote" className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                    Your Feedback & Detailed Review *
                  </label>
                  <textarea
                    id="review-quote"
                    required
                    rows={4}
                    placeholder="Describe how CloudOpsync executed your cloud architecture, server deployment, CI/CD pipeline, monitoring, or production support..."
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full rounded-xl border border-[#d6ebff]/12 bg-[#06111f]/80 px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:border-[#4da3ff] focus:outline-none resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-[#d6ebff]/12 bg-[#06111f]/60 px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#12304b]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl border border-[#4da3ff]/50 bg-[#4da3ff] px-5 py-2.5 text-xs font-semibold text-[#06111f] shadow-[0_12px_32px_rgba(77,163,255,0.25)] transition hover:bg-[#b9ddff] disabled:opacity-50"
                  >
                    {loading ? "Formatting & Submitting..." : "Submit Review"}
                  </button>
                </div>
              </form>
            )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
