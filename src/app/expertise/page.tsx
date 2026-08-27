import type { Metadata } from "next";
import { Expertise } from "@/components/expertise";
import { Marquee } from "@/components/ui/marquee";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Cloud data platforms, streaming, agentic AI, warehousing, platform engineering and delivery leadership.",
};

export default function ExpertisePage() {
  return (
    <>
      <Expertise />
      <Marquee />
    </>
  );
}
