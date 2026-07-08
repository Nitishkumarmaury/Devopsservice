import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { SiteFrame } from "@/components/layout/site-frame";
import { createPageMetadata } from "@/lib/route-metadata";

type ResetPasswordPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = createPageMetadata({
  title: "Reset Password",
  description: "Set a new password for your DevOps Service Studio account.",
  path: "/reset-password",
});

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams;
  const tokenValue = Array.isArray(params?.token) ? params?.token[0] : params?.token;

  return (
    <SiteFrame>
      <section className="relative overflow-hidden bg-[var(--background)] pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(214,107,154,0.14),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(118,103,216,0.12),transparent_30%)]" />
        <div className="relative z-10 mx-auto grid min-h-[78vh] max-w-6xl items-center gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.95fr_0.75fr] lg:px-8">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">
              Secure reset
            </p>
            <h2 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--text-primary)] sm:text-6xl">
              Set a new password and continue securely.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
              Use the link from your email to create a fresh password for consultation forms and the Cloud Architecture Advisor.
            </p>
          </div>
          <ResetPasswordForm token={tokenValue ?? ""} />
        </div>
      </section>
    </SiteFrame>
  );
}
