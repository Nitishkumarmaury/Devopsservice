"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type AdvisorErrorProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
};

export function AdvisorError({ title = "Blueprint generation paused", message, onRetry }: Readonly<AdvisorErrorProps>) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-amber-800 shadow-[0_20px_70px_rgba(15,34,48,0.1)]"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-200 bg-white/70">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-base font-semibold text-amber-950">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-amber-800">{message}</p>
          {onRetry ? (
            <Button type="button" variant="secondary" className="mt-4" onClick={onRetry}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Retry
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
