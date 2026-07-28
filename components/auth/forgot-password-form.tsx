"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, MailCheck, Send } from "lucide-react";
import { AnimatedShinyButton } from "@/components/eldoraui/animated-shiny-button";

type ForgotPasswordResponse = {
  success?: boolean;
  message?: string;
};

const inputClass =
  "premium-focus mt-2 block w-full rounded-xl border border-[#d6ebff]/16 bg-[#06111f]/82 px-4 py-3.5 text-sm text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_32px_rgba(0,0,0,0.18)] outline-none transition placeholder:text-[var(--text-muted)]";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as ForgotPasswordResponse;

      if (!response.ok || !data.success) {
        setStatus("error");
        setMessage(data.message ?? "Password reset email could not be sent.");
        setSubmitting(false);
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "If an account exists for that email, a reset link has been sent.");
    } catch {
      setStatus("error");
      setMessage("Password reset is not available right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-medium)] sm:p-8">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
        <MailCheck className="h-5 w-5" aria-hidden="true" />
      </div>
      <h1 className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">Reset password</h1>
      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
        Enter your account email and we will send a secure, time-limited reset link.
      </p>

      <div className="mt-6">
        <label htmlFor="reset-email" className="text-sm font-medium text-[var(--text-primary)]">Account email</label>
        <input
          id="reset-email"
          type="email"
          autoComplete="email"
          className={inputClass}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
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

      <AnimatedShinyButton type="submit" className="mt-6 w-full" disabled={submitting} showArrow={false}>
        <Send className="h-4 w-4" aria-hidden="true" />
        {submitting ? "Sending reset link..." : "Send Reset Link"}
      </AnimatedShinyButton>

      <p className="mt-5 text-center text-sm text-[var(--text-secondary)]">
        <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-[var(--rose-dark)] hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to login
        </Link>
      </p>
    </form>
  );
}
