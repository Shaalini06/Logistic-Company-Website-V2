import { useEffect } from "react";
import AOS from "aos";
import PageHeader from "../components/PageHeader";
import About from "../components/About";
import CTA from "../components/CTA";

export default function AboutPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  const values = [
    {
      icon: "fas fa-shield-alt",
      title: "Reliability",
      desc: "We deliver on our promises every single time, building trust with every shipment.",
    },
    {
      icon: "fas fa-rocket",
      title: "Innovation",
      desc: "We continuously invest in technology to provide cutting-edge logistics solutions.",
    },
    {
      icon: "fas fa-handshake",
      title: "Integrity",
      desc: "We operate with transparency and honesty in all our business relationships.",
    },
    {
      icon: "fas fa-leaf",
      title: "Sustainability",
      desc: "We're committed to eco-friendly logistics and reducing our environmental impact.",
    },
  ];

  return (
    <>
      <PageHeader
        title="About AL ARSH FREIGHT CARRIER"
        subtitle="Building trust through excellence and reliability"
      />
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5 mb-5">
            <div className="col-lg-6" data-aos="fade-right">
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80"
                alt="Our Story"
                className="img-fluid rounded-3"
              />
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="section-header mb-4">
                <h2 className="section-title text-start">Our Story</h2>
                <div
                  className="title-underline"
                  style={{ width: "80px" }}
                ></div>
              </div>
              <p className="about-text mb-3">
                Founded in 2010, AL ARSH FREIGHT CARRIER began with a simple vision: to
                revolutionize the logistics industry by providing faster, more
                reliable, and cost-effective shipping solutions. What started as
                a small operation has grown into a reliable logistics powerhouse.
              </p>
              <p className="about-text mb-3">
                Our commitment to excellence, innovation, and customer
                satisfaction has been the driving force behind our success.
                Today, we're proud to serve over 2,500 clients with high
                reliability.
              </p>
              <ul className="about-features">
                <li>
                  <i className="fas fa-check"></i> Founded in 2010
                </li>
                <li>
                  <i className="fas fa-check"></i> Serving with utmost reliability
                </li>
                <li>
                  <i className="fas fa-check"></i> 50,000+ shipments delivered
                </li>
                <li>
                  <i className="fas fa-check"></i> ISO 9001:2015 certified
                </li>
              </ul>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-12">
              <div
                className="section-header text-center mb-5"
                data-aos="fade-up"
              >
                <h2 className="section-title">Our Core Values</h2>
                <div className="title-underline"></div>
              </div>
            </div>
            {values.map((value, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay={`${(index + 1) * 100}`}
              >
                <div className="value-card text-center">
                  <div className="value-icon">
                    <i className={value.icon}></i>
                  </div>
                  <h4>{value.title}</h4>
                  <p>{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
