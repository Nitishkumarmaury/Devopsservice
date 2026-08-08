import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { NumberTicker } from "@/components/ui/number-ticker";
import { metrics, showMetricsSection } from "@/data/metrics";

export function MetricsSection() {
  if (!showMetricsSection) return null;

  return (
    <section aria-label="Editable business metrics" className="border-y border-white/10 bg-[#090d14]/62 py-12">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <FadeIn key={metric.label} delay={index * 0.04} as="article">
              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                <p className="text-3xl font-semibold text-white">
                  <NumberTicker value={metric.value} numericValue={metric.numericValue} />
                </p>
                <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
