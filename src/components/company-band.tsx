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
  const track = [...companies, ...companies, ...companies, ...companies];
  const items = [...track, ...track];

  return (
    <section id="companies" className="border-y border-line bg-card/60">
      <div className="flex flex-col gap-5 py-8 lg:flex-row lg:items-center lg:gap-0 lg:py-0">
        <p className="kicker shrink-0 px-6 lg:px-12">Built at</p>

        <div
          className="flex min-w-0 flex-1 overflow-hidden lg:py-10"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <ul className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
            {items.map((company, i) => (
              <li
                key={`${company}-${i}`}
                className="flex shrink-0 items-center gap-10 font-display text-lg font-semibold tracking-tight whitespace-nowrap text-dim sm:text-xl"
              >
                {company}
                <span className="h-1 w-1 rounded-full bg-signal/50" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
