"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const loadingMessages = [
  "Reviewing application context",
  "Selecting a practical architecture",
  "Preparing implementation priorities",
  "Finalising the client-ready brief",
] as const;

export function AdvisorProgress() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % loadingMessages.length);
    }, 1250);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="aurora-panel relative min-w-0 overflow-hidden rounded-2xl p-4 shadow-[0_28px_90px_rgba(15,34,48,0.12)] [overflow-wrap:anywhere] sm:p-5"
    >
      <div className="absolute inset-0 soft-grid opacity-45" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300/80 to-transparent" />
      <div className="relative">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 shadow-[0_0_34px_rgba(14,165,183,0.12)]">
            <span className="signal-dot absolute h-3 w-3 rounded-full bg-rose-300/80" aria-hidden="true" />
            <Loader2 className="h-5 w-5 animate-spin text-rose-700" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase leading-6 tracking-[0.14em] text-rose-700 sm:tracking-[0.18em]">Cloud Architecture Advisor</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{loadingMessages[messageIndex]}</p>
          </div>
        </div>

        <div className="mt-6 space-y-2.5">
          {loadingMessages.map((message, index) => (
            <div
              key={message}
              className={cn(
                "rounded-xl border px-4 py-3 transition",
                index === messageIndex
                  ? "border-rose-200 bg-rose-50 text-rose-800 shadow-[0_0_24px_rgba(14,165,183,0.08)]"
                  : "border-rose-100 bg-white/72 text-[var(--text-muted)]",
              )}
            >
              <span className="flex min-w-0 items-center gap-3 text-sm">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    index === messageIndex ? "bg-rose-400" : "bg-rose-200",
                  )}
                  aria-hidden="true"
                />
                <span className="min-w-0">{message}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 min-w-0 rounded-xl border border-rose-100 bg-white/72 p-4 font-mono text-xs leading-6 text-[var(--text-muted)]">
          <span className="text-rose-700">advisor</span>
          <span className="text-rose-300">:</span> preparing concise implementation brief
          <span className="ml-1 inline-block h-3 w-1 animate-pulse bg-rose-400 align-middle" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
