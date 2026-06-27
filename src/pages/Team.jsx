import { useEffect } from "react";
import AOS from "aos";
import PageHeader from "../components/PageHeader";
import Team from "../components/Team";
import CTA from "../components/CTA";

export default function TeamPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <PageHeader title="Our Team" subtitle="Meet the experts behind AL ARSH FREIGHT CARRIER" />
      <section className="py-5">
        <Team />
      </section>
      <CTA
        ctaText="Join Our Growing Team"
        ctaSubtext="We're always looking for talented individuals to join AL ARSH FREIGHT CARRIER"
      />
    </>
  );
}
