import Hero from "./components/Hero";
import WhyChooseUs from "./components/WhyChooseUs";
import WhyJavaGNP from "./components/WhyJavaGNP";
import Services from "./components/Services";
import Process from "./components/Process";
import Faq from "./components/Faq";
import Cta from "./components/Cta";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-brand-background">
      <Hero />
      <WhyChooseUs />
      <WhyJavaGNP />
      <Services />
      <Process />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
