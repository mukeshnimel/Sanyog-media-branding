import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Portfolio from "@/components/Portfolio";
import ServicesGrid from "@/components/ServicesGrid";

import Priorities from "@/components/Priorities";

import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
// import ProductChamber from "@/components/ProductChamber";

export default function Home() {
  return (
    <main className="flex-1 bg-dark-bg overflow-hidden lg:overflow-visible">
      <Hero />
      <WhyChooseUs />
      <Portfolio />
      <ServicesGrid />
      {/* <Metrics /> */}
      <Priorities />
      {/* <ProductChamber /> */}
      {/* <Process /> */}
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
