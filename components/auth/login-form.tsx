"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useState } from "react";
import { LockKeyhole, LogIn } from "lucide-react";
import { AnimatedShinyButton } from "@/components/eldoraui/animated-shiny-button";

type LoginFormProps = {
  nextPath: string;
  resetSuccess?: boolean;
};

type LoginResponse = {
  success?: boolean;
  message?: string;
  redirectTo?: string;
};

const inputClass =
  "premium-focus mt-2 block w-full rounded-xl border border-[#d6ebff]/16 bg-[#06111f]/82 px-4 py-3.5 text-sm text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_32px_rgba(0,0,0,0.18)] outline-none transition placeholder:text-[var(--text-muted)]";

export function LoginForm({ nextPath, resetSuccess = false }: Readonly<LoginFormProps>) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "error">("idle");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, next: nextPath }),
      });
      const data = (await response.json()) as LoginResponse;

      if (!response.ok || !data.success) {
        setStatus("error");
        setMessage(data.message ?? "Login failed.");
        setSubmitting(false);
        return;
      }

      window.location.assign(data.redirectTo ?? "/");
    } catch {
      setStatus("error");
      setMessage("Login is not available right now.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-medium)] sm:p-8">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
        <LockKeyhole className="h-5 w-5" aria-hidden="true" />
      </div>
      <h1 className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">Login required</h1>
      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
        Sign in before booking a consultation, sending a request, or using the Cloud Architecture Advisor.
      </p>

      {resetSuccess ? (
        <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
          Your password has been updated. Please log in with the new password.
        </p>
      ) : null}

      <div className="mt-6">
        <label htmlFor="username" className="text-sm font-medium text-[var(--text-primary)]">Username</label>
        <input
          id="username"
          autoComplete="username"
          className={inputClass}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="password" className="text-sm font-medium text-[var(--text-primary)]">Password</label>
          <Link href="/forgot-password" className="text-sm font-semibold text-[var(--rose-dark)] hover:underline">
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className={inputClass}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      {status === "error" ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {message}
        </p>
      ) : null}

      <AnimatedShinyButton type="submit" className="mt-6 w-full" disabled={submitting} showArrow={false}>
        <LogIn className="h-4 w-4" aria-hidden="true" />
        {submitting ? "Logging in..." : "Login"}
      </AnimatedShinyButton>

      <p className="mt-5 text-center text-sm text-[var(--text-secondary)]">
        Need an account?{" "}
        <Link href={`/signup?next=${encodeURIComponent(nextPath)}`} className="font-semibold text-[var(--rose-dark)] hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
