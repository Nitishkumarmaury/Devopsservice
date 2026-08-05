"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ChevronLeft, ChevronRight, Cloud, Cpu, Layers, Quote, Star, X } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

type ViewReviewModalProps = {
  review: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  totalCount?: number;
  currentIndex?: number;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={[
            "h-5 w-5",
            i < rating ? "fill-[#ffcf72] text-[#ffcf72]" : "fill-[#0d2338] text-[#8294aa]/40",
          ].join(" ")}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function CategoryBadge({ category }: { category?: string }) {
  if (!category) return null;
  const isCloud = category === "Cloud Infrastructure";
  const isDeployment = category === "Deployment Services";

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-[#4da3ff]/20 bg-[#4da3ff]/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#b9ddff]">
      {isCloud && <Cloud className="h-3.5 w-3.5 text-[#4da3ff]" />}
      {isDeployment && <Cpu className="h-3.5 w-3.5 text-[#7dd3fc]" />}
      {!isCloud && !isDeployment && <Layers className="h-3.5 w-3.5 text-[#ffcf72]" />}
      {category}
    </span>
  );
}

function AvatarCircle({ initials }: { initials: string }) {
  return (
    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#4da3ff] to-[#7dd3fc] text-base font-bold text-[#06111f] shadow-[0_8px_24px_rgba(77,163,255,0.3)]">
      {initials}
    </div>
  );
}

export function ViewReviewModal({
  review,
  isOpen,
  onClose,
  onPrev,
  onNext,
  totalCount,
  currentIndex,
}: Readonly<ViewReviewModalProps>) {
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!review) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] grid place-items-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#06111f]/90 backdrop-blur-lg"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[28px] border border-[#d6ebff]/16 bg-[#0d2338] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.7)] sm:p-8"
          >
            {/* Header controls */}
            <div className="flex items-center justify-between border-b border-[#d6ebff]/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                {typeof currentIndex === "number" && typeof totalCount === "number" && (
                  <span className="rounded-lg border border-[#d6ebff]/12 bg-[#06111f]/60 px-3 py-1 font-mono text-xs font-semibold text-[#8294aa]">
                    Review {currentIndex + 1} of {totalCount}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Verified Review
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close review details"
                className="grid h-9 w-9 place-items-center rounded-xl border border-[#d6ebff]/12 bg-[#06111f]/60 text-white/70 hover:bg-[#12304b] hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Badges & Rating */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <StarRating rating={review.rating} />
              <CategoryBadge category={review.serviceCategory} />
            </div>

            {/* Full Quote */}
            <div className="relative my-4 rounded-2xl border border-[#d6ebff]/8 bg-[#06111f]/50 p-5 sm:p-6">
              <Quote className="absolute -top-3 left-4 h-8 w-8 text-[#4da3ff]/30 bg-[#0d2338] px-1" aria-hidden="true" />
              <p className="mt-2 text-base leading-8 text-[var(--text-primary)] sm:text-lg sm:leading-9 whitespace-pre-line font-normal">
                &ldquo;{review.quote}&rdquo;
              </p>
            </div>

            {/* Author details */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#d6ebff]/10 pt-6">
              <div className="flex items-center gap-4">
                <AvatarCircle initials={review.avatar} />
                <div>
                  <h4 className="text-base font-semibold text-white">{review.name}</h4>
                  <p className="text-sm text-[var(--text-muted)]">
                    {review.position}, <span className="text-white font-medium">{review.company}</span>
                  </p>
                  <p className="mt-1 font-mono text-xs text-[#4da3ff]">{review.project}</p>
                </div>
              </div>

              {/* Prev / Next navigation inside modal */}
              {onPrev && onNext && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onPrev}
                    aria-label="Previous review"
                    className="grid h-10 w-10 place-items-center rounded-xl border border-[#d6ebff]/14 bg-[#06111f]/60 text-white/80 hover:border-[#4da3ff]/40 hover:text-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Next review"
                    className="grid h-10 w-10 place-items-center rounded-xl border border-[#d6ebff]/14 bg-[#06111f]/60 text-white/80 hover:border-[#4da3ff]/40 hover:text-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
