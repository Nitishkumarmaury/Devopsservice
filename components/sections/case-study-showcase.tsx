import { CaseStudyCard } from "@/components/ui/case-study-card";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { TechnologyTag } from "@/components/ui/technology-tag";
import type { caseStudies, caseStudyCategories } from "@/data/case-studies";

type CaseStudyShowcaseProps = {
  studies: typeof caseStudies;
  categories?: typeof caseStudyCategories;
  title?: string;
  description?: string;
};

export function CaseStudyShowcase({
  studies,
  categories,
  title = "Project patterns built for measurable production improvement.",
  description = "Realistic engagement patterns without invented client identities, fake metrics, or unsupported claims.",
}: Readonly<CaseStudyShowcaseProps>) {
  const [featured, ...supporting] = studies;

  return (
    <section className="border-b border-border bg-canvas-soft py-16 sm:py-24 lg:py-32">
      <Container className="relative">
        <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader eyebrow="Featured case studies" title={title}>
            {description}
          </SectionHeader>
          {categories ? (
            <div className="flex max-w-xl flex-wrap gap-2 lg:justify-end">
              {categories.map((category) => (
                <TechnologyTag key={category}>{category}</TechnologyTag>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-10 grid gap-5">
          {featured ? (
            <ScrollReveal from="left">
              <CaseStudyCard study={featured} featured />
            </ScrollReveal>
          ) : null}
          <StaggerReveal className="grid gap-5 lg:grid-cols-3" itemClassName="h-full" from="up">
            {supporting.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </StaggerReveal>
        </div>
      </Container>
    </section>
  );
}
