import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { StatsBand } from "@/components/StatsBand";
import { CaseStudy } from "@/components/CaseStudy";
import { Clients } from "@/components/Clients";
import { ContentLineup } from "@/components/ContentLineup";
import { B2BServices } from "@/components/B2BServices";
import { Testimonials } from "@/components/Testimonials";
import { Subscribe } from "@/components/Subscribe";
import { Careers } from "@/components/Careers";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <StatsBand />
        <CaseStudy />
        <Clients />
        <ContentLineup />
        <B2BServices />
        <Testimonials />
        <Subscribe />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
