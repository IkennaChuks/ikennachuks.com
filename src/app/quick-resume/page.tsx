import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { ActionLink } from "@/components/ui/action-link";
import { Reveal } from "@/components/ui/reveal";
import { QuickResumeForm } from "@/components/quick-resume-form";

export const metadata: Metadata = {
  title: "Quick Resume",
  description:
    "Paste a job description or URL and get an ATS-ready resume drafted from Ikenna Chuks Okolo's CV.",
};

export default function QuickResumePage() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-36">
      <div className="shell">
        <Reveal>
          <ActionLink href="/" variant="ghost" className="print:hidden px-4 py-2.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </ActionLink>
        </Reveal>

        <div className="print:hidden mt-12 max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="kicker text-signal/80">Quick Resume</span>
              <span className="h-px w-8 bg-signal/40" />
              <span className="kicker">ATS draft</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display-lg mt-6 text-text">
              Tailor a resume to the job in front of you.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Drop in a posting URL or the full description. The draft is written from
              the same CV as this site: real roles, dates and certifications, rewritten
              so the posting&apos;s checklist is covered without inventing experience.
            </p>
          </Reveal>
        </div>

        <div className="mt-12">
          <QuickResumeForm />
        </div>
      </div>
    </section>
  );
}
