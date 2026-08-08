"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { AnimatedShinyButton } from "@/components/eldoraui/animated-shiny-button";

type SignupFormProps = {
  nextPath: string;
};

type SignupResponse = {
  success?: boolean;
  message?: string;
  redirectTo?: string;
};

const inputClass =
  "premium-focus mt-2 block w-full rounded-xl border border-[#d6ebff]/16 bg-[#06111f]/82 px-4 py-3.5 text-sm text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_32px_rgba(0,0,0,0.18)] outline-none transition placeholder:text-[var(--text-muted)]";

export function SignupForm({ nextPath }: Readonly<SignupFormProps>) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
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
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, username, password, next: nextPath }),
      });
      const data = (await response.json()) as SignupResponse;

      if (!response.ok || !data.success) {
        setStatus("error");
        setMessage(data.message ?? "Signup failed.");
        setSubmitting(false);
        return;
      }

      window.location.assign(data.redirectTo ?? "/");
    } catch {
      setStatus("error");
      setMessage("Signup is not available right now.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-medium)] sm:p-8">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
        <UserPlus className="h-5 w-5" aria-hidden="true" />
      </div>
      <h1 className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-[var(--text-primary)]">Create account</h1>
      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
        Sign up to access consultation requests and the Cloud Architecture Advisor.
      </p>

      <div className="mt-6">
        <label htmlFor="signup-full-name" className="text-sm font-medium text-[var(--text-primary)]">Full name</label>
        <input
          id="signup-full-name"
          autoComplete="name"
          className={inputClass}
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
        />
      </div>

      <div className="mt-5">
        <label htmlFor="signup-email" className="text-sm font-medium text-[var(--text-primary)]">Email</label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          className={inputClass}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="mt-5">
        <label htmlFor="signup-username" className="text-sm font-medium text-[var(--text-primary)]">Username</label>
        <input
          id="signup-username"
          autoComplete="username"
          className={inputClass}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          pattern="[a-zA-Z0-9._-]+"
          minLength={3}
          maxLength={40}
          required
        />
      </div>

      <div className="mt-5">
        <label htmlFor="signup-password" className="text-sm font-medium text-[var(--text-primary)]">Password</label>
        <input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          className={inputClass}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={8}
          required
        />
      </div>

      {status === "error" ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {message}
        </p>
      ) : null}

      <AnimatedShinyButton type="submit" className="mt-6 w-full" disabled={submitting} showArrow={false}>
        <UserPlus className="h-4 w-4" aria-hidden="true" />
        {submitting ? "Creating account..." : "Create Account"}
      </AnimatedShinyButton>

      <p className="mt-5 text-center text-sm text-[var(--text-secondary)]">
        Already have an account?{" "}
        <Link href={`/login?next=${encodeURIComponent(nextPath)}`} className="font-semibold text-[var(--rose-dark)] hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
