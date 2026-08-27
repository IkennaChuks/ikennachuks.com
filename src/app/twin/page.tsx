import type { Metadata } from "next";
import { DigitalTwin } from "@/components/digital-twin";

export const metadata: Metadata = {
  title: "Digital Twin",
  description:
    "Ask Ikenna's digital twin about his career, certifications and the platforms he has shipped.",
};

export default function TwinPage() {
  return <DigitalTwin />;
}
