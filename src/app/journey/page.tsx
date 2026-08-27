import type { Metadata } from "next";
import { Journey } from "@/components/journey";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "Twelve years across Google, PwC, Deloitte, Life360, ATB Financial, MedWatch and more.",
};

export default function JourneyPage() {
  return <Journey />;
}
