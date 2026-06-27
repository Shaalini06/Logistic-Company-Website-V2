import { useEffect } from "react";
import AOS from "aos";
import PageHeader from "../components/PageHeader";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";

export default function TestimonialPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <PageHeader
        title="What Our Clients Say"
        subtitle="Trusted by thousands of satisfied customers"
      />
      <section className="py-5">
        <div className="container">
          <div className="section-header text-center mb-5" data-aos="fade-up">
            <h2 className="section-title">Customer Testimonials</h2>
            <p className="section-subtitle">
              Real stories from our valued clients
            </p>
            <div className="title-underline"></div>
          </div>
          <Testimonials />
        </div>
      </section>
      <CTA
        ctaText="Ready to Join Our Happy Clients?"
        ctaSubtext="Experience the AL ARSH FREIGHT CARRIER difference today"
      />
    </>
  );
}
