import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "signal";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3.5 font-mono text-[0.7rem] tracking-[0.16em] uppercase transition-all duration-300";

const variants: Record<Variant, string> = {
  primary:
    "bg-text text-white hover:bg-signal hover:shadow-[0_16px_44px_-16px] hover:shadow-signal/50",
  signal:
    "bg-signal text-white hover:bg-text hover:shadow-[0_16px_44px_-16px] hover:shadow-text/40",
  ghost:
    "border border-line bg-card text-text hover:border-signal/50 hover:bg-tint hover:text-signal",
};

type ActionLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  children: ReactNode;
};

export function ActionLink({
  variant = "primary",
  className,
  children,
  ...props
}: ActionLinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} {...props}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Link>
  );
}
