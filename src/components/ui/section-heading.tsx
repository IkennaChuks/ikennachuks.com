import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  index,
  kicker,
  title,
  lede,
  align = "left",
  className,
  as = "h1",
}: SectionHeadingProps) {
  const Title = as;
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
        <Title className="display-lg mt-5 text-text">{title}</Title>
      </Reveal>

      {lede ? (
        <Reveal delay={0.12}>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
