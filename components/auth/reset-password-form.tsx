"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useState } from "react";
import { KeyRound, LogIn } from "lucide-react";
import { AnimatedShinyButton } from "@/components/eldoraui/animated-shiny-button";

type ResetPasswordFormProps = {
  token: string;
};

type ResetPasswordResponse = {
  success?: boolean;
  message?: string;
  redirectTo?: string;
};

const inputClass =
  "premium-focus mt-2 block w-full rounded-xl border border-rose-200/70 bg-white px-4 py-3.5 text-sm text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_32px_rgba(65,39,71,0.08)] outline-none transition placeholder:text-[var(--text-muted)]";

export function ResetPasswordForm({ token }: Readonly<ResetPasswordFormProps>) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const hasToken = token.trim().length > 0;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasToken) {
      setStatus("error");
      setMessage("This reset link is missing a secure token.");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = (await response.json()) as ResetPasswordResponse;

      if (!response.ok || !data.success) {
        setStatus("error");
        setMessage(data.message ?? "Password could not be reset.");
        setSubmitting(false);
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "Your password has been updated.");
      window.setTimeout(() => {
        window.location.assign(data.redirectTo ?? "/login?reset=success");
      }, 900);
    } catch {
      setStatus("error");
      setMessage("Password reset is not available right now.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-medium)] sm:p-8">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
        <KeyRound className="h-5 w-5" aria-hidden="true" />
      </div>
      <h1 className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">Choose new password</h1>
      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
        Create a new password with at least 8 characters. The reset link works once and then expires.
      </p>

      {!hasToken ? (
        <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          This reset link is missing or incomplete. Please request a new password reset email.
        </p>
      ) : null}

      <div className="mt-6">
        <label htmlFor="new-password" className="text-sm font-medium text-[var(--text-primary)]">New password</label>
        <input
          id="new-password"
          type="password"
          autoComplete="new-password"
          data-lpignore="true"
          data-1p-ignore="true"
          suppressHydrationWarning
          className={inputClass}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={8}
          required
          disabled={!hasToken || status === "success"}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="confirm-password" className="text-sm font-medium text-[var(--text-primary)]">Confirm password</label>
        <input
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          data-lpignore="true"
          data-1p-ignore="true"
          suppressHydrationWarning
          className={inputClass}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          minLength={8}
          required
          disabled={!hasToken || status === "success"}
        />
      </div>

      {status !== "idle" ? (
        <p
          className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
            status === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"
          }`}
          role={status === "success" ? "status" : "alert"}
        >
          {message}
        </p>
      ) : null}

      <AnimatedShinyButton type="submit" className="mt-6 w-full" disabled={submitting || !hasToken || status === "success"} showArrow={false}>
        <KeyRound className="h-4 w-4" aria-hidden="true" />
        {submitting ? "Updating password..." : "Update Password"}
      </AnimatedShinyButton>

      <p className="mt-5 text-center text-sm text-[var(--text-secondary)]">
        <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-[var(--rose-dark)] hover:underline">
          <LogIn className="h-4 w-4" aria-hidden="true" />
          Back to login
        </Link>
      </p>
    </form>
  );
}
