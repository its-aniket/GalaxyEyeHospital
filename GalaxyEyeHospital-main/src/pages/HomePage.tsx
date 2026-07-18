import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Services from "../components/Services";
import AppointmentSection from "../components/AppointmentSection";
import WhyChooseUs from "../components/WhyChooseUs";
import CTABanner from "../components/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <AppointmentSection />
      <WhyChooseUs />
      <CTABanner />
    </>
  );
}
