import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/data/faqs";

export function FaqSection() {
  return (
    <section className="py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <FadeIn>
            <SectionHeading title="Common questions" eyebrow="FAQ">
              <p>
                Concise answers for teams planning deployments, migrations, monitoring, or production recovery work.
              </p>
            </SectionHeading>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Accordion items={faqs} />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
