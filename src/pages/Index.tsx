import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChoose from "@/components/WhyChoose";
import CoreFeatures from "@/components/CoreFeatures";
import HowItWorks from "@/components/HowItWorks";
import IndustryUseCases from "@/components/IndustryUseCases";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <WhyChoose />
      <CoreFeatures />
      <HowItWorks />
      <IndustryUseCases />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
