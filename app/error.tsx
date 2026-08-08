"use client";

import { RotateCcw } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="relative min-h-screen overflow-hidden px-5 py-32 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 soft-grid opacity-30" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="inline-flex rounded-lg border border-[#ff8a7a]/18 bg-[#ff8a7a]/8 px-3 py-1.5 font-mono text-xs font-semibold uppercase text-[#ffb8ae]">
          System error
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-tight text-[var(--text-primary)] sm:text-6xl">
          This view did not load cleanly.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
          Try loading the page again. If the issue repeats, contact CloudOpsync with the page URL and what you were
          trying to do.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={reset}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try Again
          </Button>
          <ButtonLink href="/contact" variant="secondary">
            Contact CloudOpsync
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
