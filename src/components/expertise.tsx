import {
  Activity,
  ChartNoAxesColumn,
  Cloud,
  Database,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { capabilities, type Capability } from "@/lib/profile";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { SpotlightCard } from "./ui/spotlight-card";

const icons: Record<Capability["icon"], LucideIcon> = {
  cloud: Cloud,
  activity: Activity,
  sparkles: Sparkles,
  database: Database,
  chart: ChartNoAxesColumn,
  users: Users,
};

export function Expertise() {
  return (
    <section id="expertise" className="section-y relative scroll-mt-20">
      <div className="shell">
        <SectionHeading
          index="02"
          kicker="Expertise"
          title="Where I do my best work."
          lede="Six disciplines that show up in every engagement, sharpened across banking, betting, commerce, big tech, health tech and consulting."
        />

        <div className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, i) => {
            const Icon = icons[capability.icon];
            return (
              <Reveal key={capability.title} delay={(i % 3) * 0.08}>
                <SpotlightCard className="p-8">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center border border-line bg-tint text-signal transition-colors duration-500 group-hover:border-signal/50">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-[0.65rem] text-dim">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 font-display text-xl font-semibold text-text">
                    {capability.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {capability.body}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {capability.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-line px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.12em] text-dim uppercase transition-colors duration-500 group-hover:border-dim/40 group-hover:text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
