"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ChevronLeft, ChevronRight, Cloud, Cpu, Layers, MessageSquarePlus, Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { WriteReviewModal } from "@/components/sections/write-review-modal";
import type { Testimonial } from "@/data/testimonials";

type TestimonialsShowcaseProps = {
  testimonials: Testimonial[];
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={[
            "h-4 w-4",
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
    <span className="inline-flex items-center gap-1.5 rounded-md border border-[#4da3ff]/20 bg-[#4da3ff]/10 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#b9ddff]">
      {isCloud && <Cloud className="h-3 w-3 text-[#4da3ff]" />}
      {isDeployment && <Cpu className="h-3 w-3 text-[#7dd3fc]" />}
      {!isCloud && !isDeployment && <Layers className="h-3 w-3 text-[#ffcf72]" />}
      {category}
    </span>
  );
}

function AvatarCircle({ initials, index }: { initials: string; index: number }) {
  const colors = [
    "from-[#4da3ff] to-[#7dd3fc]",
    "from-[#ff8a7a] to-[#ffcf72]",
    "from-[#b8a5ff] to-[#7dd3fc]",
    "from-[#10b981] to-[#4da3ff]",
    "from-[#f59e0b] to-[#ff8a7a]",
    "from-[#3b82f6] to-[#b8a5ff]",
  ];
  const gradient = colors[index % colors.length];

  return (
    <div
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${gradient} text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.3)]`}
    >
      {initials}
    </div>
  );
}

export function TestimonialsShowcase({ testimonials: initialTestimonials }: Readonly<TestimonialsShowcaseProps>) {
  const [items, setItems] = useState<Testimonial[]>(initialTestimonials);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch live stored reviews on mount
  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setItems(data.reviews);
        }
      } catch (err) {
        console.error("Failed to load live reviews:", err);
      }
    }
    loadReviews();
  }, []);

  const filteredItems = filterCategory === "All"
    ? items
    : items.filter((item) => item.serviceCategory === filterCategory);

  const activeList = filteredItems.length > 0 ? filteredItems : items;

  const next = () => setActiveIndex((prev) => (prev + 1) % activeList.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + activeList.length) % activeList.length);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (activeList.length || 1));
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeList.length]);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (activeList.length || 1));
    }, 6000);
  };

  const handleReviewAdded = (updatedList: Testimonial[]) => {
    setItems(updatedList);
    setFilterCategory("All");
    setActiveIndex(0);
  };

  if (activeList.length === 0) return null;

  const current = activeList[activeIndex] || activeList[0];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-y border-[#d6ebff]/10 bg-[linear-gradient(135deg,#06111f_0%,#0d2338_100%)] py-16 sm:py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,207,114,0.06),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(77,163,255,0.08),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 soft-grid opacity-20" />

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <p className="inline-flex rounded-lg border border-[#ffcf72]/18 bg-[#ffcf72]/8 px-3 py-1.5 font-mono text-xs font-semibold uppercase leading-5 tracking-normal text-[#ffcf72]">
            Client Testimonials & Case Reviews
          </p>
          <h2 className="mt-5 text-3xl font-semibold tracking-normal text-[var(--text-primary)] sm:text-5xl">
            Cloud Infrastructure & Deployment Reviews.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
            Verified feedback from engineering leaders and founders who entrusted CloudOpsync with AWS cloud setup, CI/CD pipeline automation, Docker & Kubernetes deployment, and production support.
          </p>

          {/* Filter Pills & Write Review CTA */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "All", label: "All Reviews" },
              { id: "Cloud Infrastructure", label: "Cloud Services" },
              { id: "Deployment Services", label: "Deployment Services" },
              { id: "Cloud & Deployment", label: "Cloud & Deployment" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setFilterCategory(cat.id);
                  setActiveIndex(0);
                  resetInterval();
                }}
                className={[
                  "rounded-xl px-3.5 py-2 text-xs font-semibold transition-all",
                  filterCategory === cat.id
                    ? "border border-[#4da3ff]/40 bg-[#4da3ff]/15 text-[#e5f2ff] shadow-[0_0_20px_rgba(77,163,255,0.2)]"
                    : "border border-[#d6ebff]/10 bg-[#0d2338]/60 text-[var(--text-secondary)] hover:border-[#4da3ff]/20 hover:text-white",
                ].join(" ")}
              >
                {cat.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="ml-0 sm:ml-2 inline-flex items-center gap-2 rounded-xl border border-[#ffcf72]/40 bg-[#ffcf72]/12 px-4 py-2 text-xs font-semibold text-[#ffcf72] shadow-[0_0_20px_rgba(255,207,114,0.15)] transition hover:bg-[#ffcf72] hover:text-[#06111f]"
            >
              <MessageSquarePlus className="h-3.5 w-3.5" aria-hidden="true" />
              Write a Review
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="mx-auto mt-10 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${current.name}-${activeIndex}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[24px] border border-[#d6ebff]/12 bg-[#0d2338]/88 p-6 shadow-[0_34px_80px_rgba(0,0,0,0.32)] sm:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d6ebff]/10 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <StarRating rating={current.rating} />
                  <CategoryBadge category={current.serviceCategory} />
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Verified Review
                </span>
              </div>

              <div className="flex items-start gap-4">
                <Quote className="mt-1 h-8 w-8 shrink-0 text-[#4da3ff]/40" aria-hidden="true" />
                <div className="min-w-0">
                  <blockquote className="text-base leading-8 text-[var(--text-primary)] sm:text-lg sm:leading-8">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4 border-t border-[#d6ebff]/10 pt-5">
                    <AvatarCircle initials={current.avatar} index={activeIndex} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{current.name}</p>
                      <p className="mt-0.5 text-sm text-[var(--text-muted)]">
                        {current.position}, <span className="text-white font-medium">{current.company}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-[#4da3ff] font-mono">{current.project}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2 overflow-x-auto max-w-[200px] sm:max-w-none">
              {activeList.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    resetInterval();
                  }}
                  aria-label={`Show testimonial ${index + 1}`}
                  className={[
                    "h-2 rounded-full transition-all duration-300",
                    activeIndex === index
                      ? "w-8 bg-[#4da3ff] shadow-[0_0_12px_rgba(77,163,255,0.4)]"
                      : "w-2 bg-[#d6ebff]/20 hover:bg-[#d6ebff]/40",
                  ].join(" ")}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  prev();
                  resetInterval();
                }}
                aria-label="Previous testimonial"
                className="grid h-10 w-10 place-items-center rounded-lg border border-[#d6ebff]/14 bg-[#0d2338]/82 text-[var(--text-secondary)] transition hover:border-[#4da3ff]/36 hover:text-[var(--text-primary)]"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  next();
                  resetInterval();
                }}
                aria-label="Next testimonial"
                className="grid h-10 w-10 place-items-center rounded-lg border border-[#d6ebff]/14 bg-[#0d2338]/82 text-[var(--text-secondary)] transition hover:border-[#4da3ff]/36 hover:text-[var(--text-primary)]"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeList.map((testimonial, index) => (
            <button
              key={`${testimonial.name}-${testimonial.company}-${index}`}
              type="button"
              onClick={() => {
                setActiveIndex(index);
                resetInterval();
              }}
              className={[
                "group rounded-[18px] border p-5 text-left transition-all duration-300 flex flex-col justify-between",
                activeIndex === index
                  ? "border-[#4da3ff]/30 bg-[#0d2338] shadow-[0_0_32px_rgba(77,163,255,0.1)]"
                  : "border-[#d6ebff]/10 bg-[#0d2338]/60 hover:border-[#4da3ff]/20 hover:bg-[#12304b]",
              ].join(" ")}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <StarRating rating={testimonial.rating} />
                  <CategoryBadge category={testimonial.serviceCategory} />
                </div>
                <p className="line-clamp-3 text-sm leading-6 text-[var(--text-secondary)]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-[#d6ebff]/8 pt-3">
                <AvatarCircle initials={testimonial.avatar} index={index} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{testimonial.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {testimonial.position}, <span className="text-white/80">{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Container>

      {/* Review Submission Modal */}
      <WriteReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleReviewAdded}
      />
    </section>
  );
}
