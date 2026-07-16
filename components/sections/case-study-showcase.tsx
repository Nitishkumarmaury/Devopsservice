import { CaseStudyCard } from "@/components/ui/case-study-card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
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
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#edf3f6_100%)] py-16 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(14,165,183,0.08),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(139,108,255,0.07),transparent_28%)]" />
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
          {featured ? <CaseStudyCard study={featured} featured /> : null}
          <div className="grid gap-5 lg:grid-cols-3">
            {supporting.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
