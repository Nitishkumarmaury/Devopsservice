import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SiteFrame } from "@/components/layout/site-frame";
import { LoginForm } from "@/components/auth/login-form";
import { getSessionUser } from "@/lib/auth/session";
import { createPageMetadata } from "@/lib/route-metadata";

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = createPageMetadata({
  title: "Login",
  description: "Login to access contact requests and the Cloud Architecture Advisor.",
  path: "/login",
});

function safeNextPath(value: string | string[] | undefined) {
  const next = Array.isArray(value) ? value[0] : value;
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath = safeNextPath(params?.next);
  const resetValue = Array.isArray(params?.reset) ? params?.reset[0] : params?.reset;
  const user = await getSessionUser();

  if (user) {
    redirect(nextPath);
  }

  return (
    <SiteFrame>
      <section className="relative overflow-hidden bg-[var(--background)] pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(214,107,154,0.14),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(118,103,216,0.12),transparent_30%)]" />
        <div className="relative z-10 mx-auto grid min-h-[78vh] max-w-6xl items-center gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.95fr_0.75fr] lg:px-8">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[var(--rose-dark)]">
              Secure access
            </p>
            <h2 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--text-primary)] sm:text-6xl">
              Login before sharing project details or using the advisor.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
              This keeps consultation requests and AI planning access limited to approved test users while the site is in review.
            </p>
          </div>
          <LoginForm nextPath={nextPath} resetSuccess={resetValue === "success"} />
        </div>
      </section>
    </SiteFrame>
  );
}
