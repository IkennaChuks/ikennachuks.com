import type { Metadata } from "next";
import { About } from "@/components/about";
import { Credentials } from "@/components/credentials";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ikenna Chuks Okolo, MSc: a decade of cloud, data and AI engineering across Google, PwC and the three hyperscalers.",
};

export default function AboutPage() {
  return (
    <>
      <About />
      <Credentials />
    </>
  );
}
