import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  index,
  kicker,
  title,
  lede,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <span className="kicker text-signal/80">{index}</span>
          <span className="h-px w-8 bg-signal/40" />
          <span className="kicker">{kicker}</span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="display-lg mt-5 text-text">{title}</h2>
      </Reveal>

      {lede ? (
        <Reveal delay={0.12}>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
