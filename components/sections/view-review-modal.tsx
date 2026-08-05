"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
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

function StarRating({ rating }: Readonly<{ rating: number }>) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={index < rating ? "h-5 w-5 fill-[#ffcf72] text-[#ffcf72]" : "h-5 w-5 fill-[#0d2338] text-[#8294aa]/40"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function CategoryBadge({ category }: Readonly<{ category?: string }>) {
  if (!category) return null;
  const Icon = category === "Cloud Infrastructure" ? Cloud : category === "Deployment Services" ? Cpu : Layers;
  const iconColor = category === "Cloud Infrastructure" ? "text-[#4da3ff]" : category === "Deployment Services" ? "text-[#7dd3fc]" : "text-[#ffcf72]";

  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-[#4da3ff]/20 bg-[#4da3ff]/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#b9ddff]">
      <Icon className={`h-3.5 w-3.5 ${iconColor}`} aria-hidden="true" />
      {category}
    </span>
  );
}

function AvatarCircle({ initials }: Readonly<{ initials: string }>) {
  return (
    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#4da3ff] to-[#7dd3fc] text-sm font-bold text-[#06111f] shadow-[0_8px_24px_rgba(77,163,255,0.3)]">
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (isOpen) contentRef.current?.scrollTo({ top: 0 });
  }, [isOpen, review?.quote]);

  if (!review) return null;

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
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-details-title"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl max-h-[calc(100dvh-1rem)] overflow-y-auto overscroll-contain rounded-2xl border border-[#d6ebff]/16 bg-[#0d2338] p-4 shadow-[0_32px_120px_rgba(0,0,0,0.7)] sm:max-h-[calc(100dvh-2rem)] sm:p-6"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#d6ebff]/10 pb-3">
              <div className="flex flex-wrap items-center gap-2">
                <h3 id="review-details-title" className="sr-only">Full client review</h3>
                {typeof currentIndex === "number" && typeof totalCount === "number" && (
                  <span className="rounded-lg border border-[#d6ebff]/12 bg-[#06111f]/60 px-2.5 py-1 font-mono text-xs font-semibold text-[#8294aa]">
                    Review {currentIndex + 1} of {totalCount}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Verified review
                </span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close review details"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#d6ebff]/12 bg-[#06111f]/60 text-white/70 transition hover:bg-[#12304b] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#4da3ff]/50"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <StarRating rating={review.rating} />
              <CategoryBadge category={review.serviceCategory} />
            </div>

            <div className="relative mt-5 rounded-xl border border-[#d6ebff]/8 bg-[#06111f]/50 p-4 sm:p-5">
              <Quote className="absolute -top-3 left-4 h-7 w-7 bg-[#0d2338] px-1 text-[#4da3ff]/30" aria-hidden="true" />
              <p className="mt-1 whitespace-pre-line text-base leading-7 text-[var(--text-primary)] sm:text-lg sm:leading-8">
                &ldquo;{review.quote}&rdquo;
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#d6ebff]/10 pt-4">
              <div className="flex min-w-0 items-center gap-3">
                <AvatarCircle initials={review.avatar} />
                <div className="min-w-0">
                  <p className="text-base font-semibold text-white">{review.name}</p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {review.position}, <span className="font-medium text-white">{review.company}</span>
                  </p>
                  <p className="mt-0.5 truncate font-mono text-xs text-[#4da3ff]">{review.project}</p>
                </div>
              </div>

              {onPrev && onNext && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onPrev}
                    aria-label="Previous review"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[#d6ebff]/14 bg-[#06111f]/60 text-white/80 transition hover:border-[#4da3ff]/40 hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Next review"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[#d6ebff]/14 bg-[#06111f]/60 text-white/80 transition hover:border-[#4da3ff]/40 hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
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
