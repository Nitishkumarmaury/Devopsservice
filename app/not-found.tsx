import { ArrowRight, Home, Search } from "lucide-react";
import { SiteFrame } from "@/components/layout/site-frame";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SiteFrame>
      <section className="relative overflow-hidden px-5 py-32 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 soft-grid opacity-30" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-lg border border-[#4da3ff]/18 bg-[#4da3ff]/8 px-3 py-1.5 font-mono text-xs font-semibold uppercase text-[#b9ddff]">
            Page not found
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-[var(--text-primary)] sm:text-6xl">
            This route is not in the operating map.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
            The page may have moved, or the link may be incorrect. You can return to the overview, review the service
            menu, or contact CloudOpsync with a specific infrastructure question.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/">
              <Home className="h-4 w-4" aria-hidden="true" />
              Return Home
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              <Search className="h-4 w-4" aria-hidden="true" />
              Explore Services
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Contact CloudOpsync
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
