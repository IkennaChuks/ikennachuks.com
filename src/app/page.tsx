import { Hero } from "@/components/hero";
import { CompanyBand } from "@/components/company-band";
import { About } from "@/components/about";
import { Expertise } from "@/components/expertise";
import { Marquee } from "@/components/ui/marquee";
import { Journey } from "@/components/journey";
import { DigitalTwin } from "@/components/digital-twin";
import { Credentials } from "@/components/credentials";
import { PortfolioTeaser } from "@/components/portfolio-teaser";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <CompanyBand />
      <About />
      <Expertise />
      <Marquee />
      <Journey />
      <DigitalTwin />
      <Credentials />
      <PortfolioTeaser />
      <Contact />
    </>
  );
}
