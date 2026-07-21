import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { SiteFrame } from "@/components/layout/site-frame";
import { FadeIn } from "@/components/ui/fade-in";
import { getSessionUser } from "@/lib/auth/session";
import { createPageMetadata } from "@/lib/route-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Forgot Password",
  description: "Request a secure password reset link for your CloudOpsync account.",
  path: "/forgot-password",
  noIndex: true,
});

export default async function ForgotPasswordPage() {
  const user = await getSessionUser();

  if (user) {
    redirect("/");
  }

  return (
    <SiteFrame>
      <section className="relative overflow-hidden bg-[var(--background)] pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(14,165,183,0.09),transparent_32%),radial-gradient(circle_at_86%_20%,rgba(49,92,148,0.07),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.74),rgba(242,247,250,0.5))]" />
        <div className="relative z-10 mx-auto grid min-h-[78vh] max-w-6xl items-center gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.95fr_0.75fr] lg:px-8">
          <FadeIn>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">
              Account recovery
            </p>
            <h2 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--text-primary)] sm:text-6xl">
              Recover access without exposing project details.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
              Password reset links are delivered by email, expire quickly, and are invalidated after one successful use.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <ForgotPasswordForm />
          </FadeIn>
        </div>
      </section>
    </SiteFrame>
  );
}
