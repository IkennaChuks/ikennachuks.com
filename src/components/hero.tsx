"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { profile, stats } from "@/lib/profile";
import { ActionLink } from "./ui/action-link";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease },
        };

  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
      <div className="shell">
        <div className="grid items-end gap-14 xl:grid-cols-12 xl:gap-10">
          <div className="xl:col-span-7">
            <motion.div {...rise(0)} className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="flex items-center gap-2.5 border border-line bg-card px-3 py-1.5 shadow-[0_1px_2px_rgb(8_23_46_/_0.04)]">
                <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-signal" />
                <span className="font-mono text-[0.65rem] tracking-[0.18em] text-muted uppercase">
                  Open to select advisory work
                </span>
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.18em] text-dim uppercase">
                <MapPin className="h-3 w-3" />
                {profile.location}
              </span>
            </motion.div>

            <h1 className="display-xl mt-8">
              <motion.span {...rise(0.08)} className="block text-text">
                Ikenna
              </motion.span>
              <motion.span {...rise(0.16)} className="block text-text">
                Chuks
              </motion.span>
              <motion.span {...rise(0.24)} className="block">
                <span className="text-gradient">Okolo</span>
                <span className="ml-4 align-super font-mono text-sm tracking-[0.2em] text-signal sm:text-base">
                  MSc
                </span>
              </motion.span>
            </h1>

            <motion.div {...rise(0.34)} className="mt-9 max-w-xl">
              <p className="font-display text-lg leading-snug font-medium text-text sm:text-2xl">
                {profile.tagline}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
                Senior Manager for Cloud, Data &amp; AI Engineering at{" "}
                <span className="text-text">PwC Canada</span>. Formerly data
                engineering lead at <span className="text-text">Google</span>. Twelve years
                moving mission-critical estates onto GCP, AWS and Azure — with the
                certifications to match.
              </p>
            </motion.div>

            <motion.div {...rise(0.42)} className="mt-10 flex flex-wrap items-center gap-3">
              <ActionLink href="/#twin" variant="signal">
                <Sparkles className="h-3.5 w-3.5" />
                Ask my digital twin
              </ActionLink>
              <ActionLink href="/#journey" variant="ghost">
                Career journey
                <ArrowDown className="h-3.5 w-3.5" />
              </ActionLink>
              <ActionLink href="/#contact" variant="ghost">
                Get in touch
                <ArrowUpRight className="h-3.5 w-3.5" />
              </ActionLink>
            </motion.div>
          </div>

          <motion.div
            {...rise(0.3)}
            className="max-w-lg xl:col-span-5 xl:max-w-none"
          >
            <div className="panel glow-accent relative p-7 sm:p-9">
              <span className="absolute top-0 left-0 h-8 w-8 border-t border-l border-signal/60" />
              <span className="absolute right-0 bottom-0 h-8 w-8 border-r border-b border-signal/60" />

              <div className="flex items-start justify-between gap-4">
                <div className="relative grid h-16 w-16 shrink-0 place-items-center border border-line bg-tint font-display text-2xl font-bold text-signal">
                  {profile.initials}
                </div>
                <span className="kicker pt-2">Currently</span>
              </div>

              <p className="mt-7 font-display text-2xl leading-tight font-semibold text-text">
                Senior Manager
                <span className="block text-muted">Cloud, Data &amp; AI Engineering</span>
              </p>
              <p className="mt-4 font-mono text-xs tracking-[0.16em] text-signal uppercase">
                {profile.company}
              </p>

              <div className="hairline my-7 h-px" />

              <dl className="space-y-4">
                {[
                  ["Focus", "Agentic AI · Lakehouse · MLOps"],
                  ["Clouds", "GCP · AWS · Azure · Databricks"],
                  ["Based", "Edmonton, Canada"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-6">
                    <dt className="kicker shrink-0">{label}</dt>
                    <dd className="text-right text-sm text-text">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>

        <motion.dl
          {...rise(0.5)}
          className="mt-20 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="group bg-card p-6 transition-colors duration-500 hover:bg-tint">
              <dt className="font-display text-4xl font-bold tracking-tight text-text transition-colors duration-500 group-hover:text-signal sm:text-5xl">
                {stat.value}
              </dt>
              <dd className="mt-3 font-mono text-[0.65rem] tracking-[0.16em] text-dim uppercase">
                {stat.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
