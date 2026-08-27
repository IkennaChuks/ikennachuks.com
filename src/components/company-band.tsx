import { Reveal } from "./ui/reveal";

const companies = [
  "Google",
  "PwC Canada",
  "Deloitte",
  "Life360",
  "ATB Financial",
  "MedWatch",
  "Government of Alberta",
  "TradeDepot",
];

export function CompanyBand() {
  return (
    <section id="companies" className="border-y border-line bg-card/60">
      <div className="shell py-12 lg:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
          <Reveal>
            <p className="kicker shrink-0 lg:max-w-32">Built at</p>
          </Reveal>

          <ul className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:gap-x-12">
            {companies.map((company, i) => (
              <Reveal as="li" key={company} delay={i * 0.05}>
                <span className="font-display text-lg font-semibold tracking-tight text-dim transition-colors duration-500 hover:text-text sm:text-xl">
                  {company}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
