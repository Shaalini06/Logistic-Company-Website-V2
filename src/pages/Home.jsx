import { useEffect } from "react";
import AOS from "aos";
import Hero from "../components/Hero";
import TrackingSimulator from "../components/TrackingSimulator";
import Features from "../components/Features";
import About from "../components/About";
import Counter from "../components/Counter";
import Services from "../components/Services";
import Workflow from "../components/Workflow";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import CTA from "../components/CTA";

export default function Home() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 600,
      easing: "ease-in-out",
      delay: 0,
      once: true,
    });
  }, []);

  return (
    <>
      <Hero />
      <TrackingSimulator />
      <Features />
      <About />
      <Counter />
      <Services />
      <Workflow />
      <Testimonials />
      <Newsletter />
      <CTA />
    </>
  );
}
