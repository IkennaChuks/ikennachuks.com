import { Quote } from "lucide-react";
import { summary } from "@/lib/profile";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";

const principles = [
  {
    title: "Architecture before code",
    body: "The expensive mistakes are made in the first week, not the last sprint.",
  },
  {
    title: "Trust is the deliverable",
    body: "A pipeline nobody believes is a pipeline nobody uses. Quality and lineage are features.",
  },
  {
    title: "Simple scales",
    body: "Fewer moving parts, sharper contracts, and boring infrastructure that survives handover.",
  },
  {
    title: "Fluent in both rooms",
    body: "I can defend a design to staff engineers and explain the trade-off to the board.",
  },
];

export function About() {
  return (
    <section id="about" className="section-y relative scroll-mt-20">
      <div className="shell">
        <SectionHeading
          index="01"
          kicker="About"
          title="A decade of building the layer everything else depends on."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {summary.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-base leading-relaxed text-muted sm:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.24}>
              <figure className="panel mt-12 p-8">
                <Quote className="h-6 w-6 text-signal" />
                <blockquote className="mt-5 font-display text-xl leading-snug font-medium text-text sm:text-2xl">
                  Anyone can move data. The work is making an organisation agree on
                  what it means — and then keeping that true at scale.
                </blockquote>
              </figure>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <p className="kicker">Operating principles</p>
            </Reveal>
            <ul className="mt-6 space-y-px bg-line">
              {principles.map((principle, i) => (
                <Reveal as="li" key={principle.title} delay={0.06 * i}>
                  <div className="group relative bg-card p-6 transition-colors duration-500 hover:bg-tint">
                    <span className="absolute inset-y-0 left-0 w-px bg-signal opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.65rem] text-dim">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-text">
                          {principle.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {principle.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
