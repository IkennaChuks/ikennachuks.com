import { marqueeItems } from "@/lib/profile";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative border-y border-line bg-card/60 py-5">
      <div
        className="flex overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <ul className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {items.map((item, i) => (
            <li
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-10 font-mono text-xs tracking-[0.18em] whitespace-nowrap text-dim uppercase"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-signal/50" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
