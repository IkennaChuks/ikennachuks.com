"use client";

import { motion, useReducedMotion } from "motion/react";
import { experience } from "@/lib/profile";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;

function Rail({ current, last }: { current?: boolean; last: boolean }) {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-full w-3">
      <motion.span
        aria-hidden
        className={cn(
          "absolute top-4 bottom-0 left-1/2 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-signal/30 via-line",
          last ? "to-transparent" : "to-line",
        )}
        initial={reduced ? undefined : { scaleY: 0 }}
        whileInView={reduced ? undefined : { scaleY: 1 }}
        viewport={{ once: true, margin: "-120px 0px" }}
        transition={{ duration: 1, ease }}
      />
      <motion.span
        aria-hidden
        className={cn(
          "absolute top-2.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border",
          current
            ? "animate-pulse-dot border-signal bg-signal"
            : "border-dim bg-page",
        )}
        initial={reduced ? undefined : { scale: 0 }}
        whileInView={reduced ? undefined : { scale: 1 }}
        viewport={{ once: true, margin: "-120px 0px" }}
        transition={{ duration: 0.5, ease }}
      />
    </div>
  );
}

export function Journey() {
  return (
    <section id="journey" className="section-y relative scroll-mt-20">
      <div className="shell">
        <SectionHeading
          index="03"
          kicker="Career journey"
          title="Twelve years, four countries, one throughline."
          lede="From data analyst to senior manager — banking, betting, commerce, big tech, health tech and consulting. Every step added a layer to how I build."
        />

        <ol className="mt-16">
          {experience.map((position, i) => (
            <li
              key={position.company}
              className="grid grid-cols-[0.75rem_1fr] gap-x-5 sm:gap-x-7 lg:grid-cols-[9rem_0.75rem_1fr]"
            >
              <div className="hidden pt-1 text-right lg:block">
                <Reveal>
                  <span
                    className={cn(
                      "font-mono text-[0.7rem] tracking-[0.1em] whitespace-nowrap uppercase",
                      position.current ? "text-signal" : "text-dim",
                    )}
                  >
                    {position.span}
                  </span>
                </Reveal>
              </div>

              <Rail current={position.current} last={i === experience.length - 1} />

              <div className="max-w-4xl pb-14 lg:pb-16">
                <Reveal>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
                      {position.company}
                    </h3>
                    {position.current ? (
                      <span className="border border-signal/40 bg-signal/10 px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.16em] text-signal uppercase">
                        Present
                      </span>
                    ) : null}
                  </div>
                  <span className="mt-2 block font-mono text-[0.7rem] tracking-[0.14em] text-dim uppercase lg:hidden">
                    {position.span}
                  </span>
                </Reveal>

                <Reveal delay={0.06}>
                  <ul className="mt-6 space-y-px bg-line">
                    {position.roles.map((role) => (
                      <li
                        key={role.title + role.period}
                        className="flex flex-col gap-1 bg-card px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                      >
                        <span className="font-display text-base font-semibold text-text">
                          {role.title}
                        </span>
                        <span className="shrink-0 font-mono text-[0.65rem] tracking-[0.1em] text-dim uppercase">
                          {role.period}
                          {role.location ? ` · ${role.location}` : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={0.12}>
                  <ul className="mt-6 space-y-3">
                    {position.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal/70" />
                        <span className="text-sm leading-relaxed text-muted">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
