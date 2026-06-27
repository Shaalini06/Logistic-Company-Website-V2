import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import PageHeader from "../components/PageHeader";
import Services from "../components/Services";
import CTA from "../components/CTA";

export default function ServicesPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive logistics solutions tailored to your needs"
      />
      <section className="py-5">
        <Services />
        <div className="container mt-5">
          <div className="row g-5 mb-5">
            <div className="col-lg-6" data-aos="fade-right">
              <video
                src="/ARSH_commercial.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="img-fluid rounded-3"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <h3 className="service-title mb-4">Road Freight Solutions</h3>
              <p className="mb-3">
                We offer end-to-end domestic road freight solutions including FTL, PTL, heavy trailers, and dedicated fleet options, delivering to all states and union territories across India with safety and reliability.
              </p>
              <ul className="service-features mb-4">
                <li>
                  <i className="fas fa-check"></i> Rapid dispatch and transit monitoring
                </li>
                <li>
                  <i className="fas fa-check"></i> Real-time digital tracking updates
                </li>
                <li>
                  <i className="fas fa-check"></i> Flatbed, lowbed, and multi-axle trailers
                </li>
                <li>
                  <i className="fas fa-check"></i> Highly secure and transit-insured cargo
                </li>
                <li>
                  <i className="fas fa-check"></i> Cost-effective competitive freight rates
                </li>
              </ul>
              <Link to="/main/quote" className="btn btn-primary">
                Get a Transport Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
