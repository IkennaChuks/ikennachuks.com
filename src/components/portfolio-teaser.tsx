import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { ActionLink } from "./ui/action-link";
import { SpotlightCard } from "./ui/spotlight-card";

const placeholders = [
  {
    label: "Case study",
    title: "HIPAA lakehouse for wearable and EHR data",
    note: "Write-up in progress",
  },
  {
    label: "Case study",
    title: "Real-time fraud detection on Kinesis",
    note: "Write-up in progress",
  },
  {
    label: "Case study",
    title: "Fortune 500 GCP migrations",
    note: "Write-up in progress",
  },
];

export function PortfolioTeaser() {
  return (
    <section id="portfolio" className="section-y relative scroll-mt-20">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="06"
            kicker="Portfolio"
            title="Selected work, coming soon."
            lede="A set of deep-dive case studies on the platforms, pipelines and AI systems I have shipped. Currently being written up with the detail they deserve."
            className="max-w-2xl"
          />
          <Reveal delay={0.12}>
            <ActionLink href="/portfolio" variant="ghost">
              Portfolio
              <ArrowUpRight className="h-3.5 w-3.5" />
            </ActionLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px bg-line md:grid-cols-3">
          {placeholders.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <SpotlightCard className="min-h-64 p-8">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <span className="kicker">{item.label}</span>
                    <h3 className="mt-5 font-display text-xl leading-snug font-semibold text-muted transition-colors duration-500 group-hover:text-text">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-8 flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.16em] text-dim uppercase">
                    <span className="h-1 w-1 rounded-full bg-ember" />
                    {item.note}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
