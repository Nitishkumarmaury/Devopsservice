import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-y border-white/10 bg-[#090d14]/62 py-14 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading title="Client testimonials" eyebrow="Testimonials">
          <p>Client testimonials will be added after approval.</p>
        </SectionHeading>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={`${testimonial.name}-${testimonial.company}`} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <blockquote className="text-sm leading-7 text-slate-200">{testimonial.quote}</blockquote>
              <figcaption className="mt-5 text-sm text-slate-400">
                {testimonial.name}, {testimonial.position}, {testimonial.company}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
