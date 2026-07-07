import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function AdvisorPrivacyNotice() {
  return (
    <div className="rounded-lg border border-rose-100 bg-white/72 p-4 text-sm leading-6 text-[var(--text-secondary)]">
      <div className="flex gap-3">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" aria-hidden="true" />
        <p>
          Do not enter passwords, API keys, access tokens, private infrastructure addresses, customer data, or other
          confidential information. The generated blueprint is preliminary guidance and must be reviewed before
          production use. Submitted technical details are processed through secure server-side systems for planning
          purposes.
          See our{" "}
          <Link href="/privacy" className="font-semibold text-rose-700 underline-offset-4 hover:underline">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
