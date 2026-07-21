import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SiteFrame } from "@/components/layout/site-frame";
import { SignupForm } from "@/components/auth/signup-form";
import { FadeIn } from "@/components/ui/fade-in";
import { getSessionUser } from "@/lib/auth/session";
import { createPageMetadata } from "@/lib/route-metadata";

type SignupPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = createPageMetadata({
  title: "Sign Up",
  description: "Create an account to access contact requests and the Cloud Architecture Advisor.",
  path: "/signup",
  noIndex: true,
});

function safeNextPath(value: string | string[] | undefined) {
  const next = Array.isArray(value) ? value[0] : value;
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  const nextPath = safeNextPath(params?.next);
  const user = await getSessionUser();

  if (user) {
    redirect(nextPath);
  }

  return (
    <SiteFrame>
      <section className="relative overflow-hidden bg-[var(--background)] pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(14,165,183,0.09),transparent_32%),radial-gradient(circle_at_86%_20%,rgba(49,92,148,0.07),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.74),rgba(242,247,250,0.5))]" />
        <div className="relative z-10 mx-auto grid min-h-[78vh] max-w-6xl items-center gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.95fr_0.75fr] lg:px-8">
          <FadeIn>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">
              Secure signup
            </p>
            <h2 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--text-primary)] sm:text-6xl">
              Create an account before sending project requests.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
              New accounts can access the consultation form and AI planning workspace immediately after signup.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <SignupForm nextPath={nextPath} />
          </FadeIn>
        </div>
      </section>
    </SiteFrame>
  );
}
