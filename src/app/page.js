import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Portfolio from "@/components/Portfolio";
import ServicesGrid from "@/components/ServicesGrid";
import Metrics from "@/components/Metrics";
import Priorities from "@/components/Priorities";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
// import ProductChamber from "@/components/ProductChamber";

export default function Home() {
  return (
    <main className="flex-1 bg-dark-bg">
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
