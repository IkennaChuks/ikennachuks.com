import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Construction } from "lucide-react";
import { profile } from "@/lib/profile";
import { Reveal } from "@/components/ui/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Case studies on cloud data platforms, streaming architecture and agentic AI systems — currently in preparation.",
};

const planned = [
  {
    title: "HIPAA lakehouse for wearable and EHR data",
    domain: "Health tech",
    body: "A GCP lakehouse that unified high-frequency biosensing telemetry with clinical EHR data, with sub-second Pub/Sub and Dataflow alerting and an FDA-ready provenance trail.",
    themes: ["Databricks", "Pub/Sub", "HIPAA"],
  },
  {
    title: "Real-time fraud detection on Kinesis",
    domain: "Commerce",
    body: "A streaming fraud pipeline over transactional Kinesis feeds and custom models that cut fraud losses by more than 40% in the first six months after a Redshift migration.",
    themes: ["Kinesis", "Redshift", "ML"],
  },
  {
    title: "Warehouse migration without downtime",
    domain: "Banking",
    body: "Moving a bank's analytics estate from on-prem SQL Server onto Azure Databricks and SSIS while availability for downstream reporting jumped 90%.",
    themes: ["Migration", "Databricks", "Azure"],
  },
  {
    title: "Fortune 500 migrations at hyperscale",
    domain: "Big tech",
    body: "Three years at Google leading Dataflow and BigQuery programs for Fortune 500 customers, including a cost-inventory tool that cut GCP spend 30% in three months.",
    themes: ["GCP", "BigQuery", "Terraform"],
  },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-44">
        <div className="shell">
          <Reveal>
            <ActionLink href="/" variant="ghost" className="px-4 py-2.5">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </ActionLink>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="kicker text-signal/80">Portfolio</span>
                  <span className="h-px w-8 bg-signal/40" />
                  <span className="kicker">In preparation</span>
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="display-xl mt-6 text-text">
                  Selected
                  <span className="text-gradient block w-fit">work</span>
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  Much of what I build sits behind NDAs and inside regulated
                  environments. I am writing up the parts I can share as proper case
                  studies — architecture decisions, trade-offs, and what I would do
                  differently.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <ActionLink href={`mailto:${profile.email}`} variant="signal">
                    Request a walkthrough
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </ActionLink>
                  <ActionLink
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    variant="ghost"
                  >
                    LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </ActionLink>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.12}>
                <div className="panel relative overflow-hidden p-8">
                  <span
                    aria-hidden
                    className="animate-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-signal/10 to-transparent"
                  />
                  <Construction className="h-6 w-6 text-signal" strokeWidth={1.6} />
                  <p className="mt-6 font-display text-xl leading-snug font-semibold text-text">
                    Four case studies in the pipeline
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    Publishing progressively through 2026. Want early access, or a
                    private walkthrough of relevant work? Email is fastest.
                  </p>
                  <div className="hairline my-7 h-px" />
                  <p className="font-mono text-[0.62rem] tracking-[0.16em] text-dim uppercase">
                    Status · Drafting
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-28 lg:pb-40">
        <div className="shell">
          <Reveal>
            <p className="kicker">What is coming</p>
          </Reveal>

          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-2">
            {planned.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 0.08}>
                <SpotlightCard className="p-8 lg:p-10">
                  <div className="flex items-center justify-between">
                    <span className="kicker">{item.domain}</span>
                    <span className="font-mono text-[0.65rem] text-dim">
                      0{i + 1}
                    </span>
                  </div>

                  <h2 className="mt-6 font-display text-2xl leading-tight font-semibold text-text">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {item.themes.map((theme) => (
                      <li
                        key={theme}
                        className="rounded-md border border-line px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.12em] text-dim uppercase"
                      >
                        {theme}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
