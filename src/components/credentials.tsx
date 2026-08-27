import { BadgeCheck, GraduationCap } from "lucide-react";
import { certifications, education, type Certification } from "@/lib/profile";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";

function groupedCerts() {
  const groups: { issuer: string; items: Certification[] }[] = [];
  for (const cert of certifications) {
    const existing = groups.find((group) => group.issuer === cert.issuer);
    if (existing) existing.items.push(cert);
    else groups.push({ issuer: cert.issuer, items: [cert] });
  }
  return groups;
}

export function Credentials() {
  const groups = groupedCerts();

  return (
    <section id="credentials" className="section-y relative scroll-mt-20">
      <div className="shell">
        <SectionHeading
          index="05"
          kicker="Credentials"
          title="Certified across the stack, formally trained for AI."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3">
                <BadgeCheck className="h-4 w-4 text-signal" strokeWidth={1.8} />
                <p className="kicker">Certifications</p>
              </div>
            </Reveal>

            <ul className="mt-6 overflow-hidden rounded-xl space-y-px bg-line">
              {groups.map((group, i) => (
                <Reveal as="li" key={group.issuer} delay={i * 0.05}>
                  <article className="bg-card px-5 py-5 transition-colors duration-500 hover:bg-tint">
                    <p className="font-mono text-[0.62rem] tracking-[0.14em] text-signal uppercase">
                      {group.issuer}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {group.items.map((cert) => (
                        <li
                          key={cert.name}
                          className="font-display text-sm font-medium text-text sm:text-base"
                        >
                          {cert.name}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-signal" strokeWidth={1.8} />
                <p className="kicker">Education</p>
              </div>
            </Reveal>

            <div className="mt-6 overflow-hidden rounded-xl space-y-px bg-line">
              {education.map((item, i) => (
                <Reveal key={item.school} delay={i * 0.08}>
                  <article className="bg-card p-6">
                    <p className="font-mono text-[0.62rem] tracking-[0.16em] text-signal uppercase">
                      {item.period}
                    </p>
                    <h3 className="mt-3 font-display text-lg font-semibold text-text">
                      {item.school}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.qualification}
                    </p>
                    <p className="mt-3 font-mono text-[0.62rem] tracking-[0.14em] text-dim uppercase">
                      {item.place}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
