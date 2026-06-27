import { useEffect } from "react";
import AOS from "aos";
import PageHeader from "../components/PageHeader";
import CTA from "../components/CTA";

export default function Features() {
  useEffect(() => {
    AOS.init();
  }, []);

  const features = [
    {
      icon: "fas fa-satellite",
      title: "Real-Time GPS Tracking",
      desc: "Track your shipments in real-time with our advanced GPS tracking system. Know exactly where your cargo is at all times.",
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Mobile App",
      desc: "Access your shipments on the go with our mobile app available for iOS and Android devices.",
    },
    {
      icon: "fas fa-bell",
      title: "Smart Notifications",
      desc: "Receive instant notifications at every stage of your shipment with customizable alerts.",
    },
    {
      icon: "fas fa-chart-bar",
      title: "Analytics & Reports",
      desc: "Detailed analytics and customizable reports to optimize your shipping strategy.",
    },
    {
      icon: "fas fa-lock-alt",
      title: "Bank-Level Security",
      desc: "Your data is protected with enterprise-grade encryption and security protocols.",
    },
    {
      icon: "fas fa-code",
      title: "REST API",
      desc: "Powerful REST API for seamless integration with your existing systems and workflows.",
    },
  ];

  return (
    <>
      <PageHeader
        title="Our Features"
        subtitle="Why businesses choose AL ARSH FREIGHT CARRIER"
      />
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="section-header text-center mb-5"
                data-aos="fade-up"
              >
                <h2 className="section-title">Premium Features</h2>
                <p className="section-subtitle">
                  Advanced tools designed for modern logistics
                </p>
                <div className="title-underline"></div>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="col-lg-6"
                data-aos="fade-up"
                data-aos-delay={`${(index + 1) * 100}`}
              >
                <div className="feature-detail">
                  <div className="feature-icon-large">
                    <i className={feature.icon}></i>
                  </div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="row mt-5">
            <div className="col-12" data-aos="fade-up">
              <div className="section-header text-center mb-5">
                <h3 className="section-title">What Sets Us Apart</h3>
                <div className="title-underline"></div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="comparison-card">
                <h5>
                  <i className="fas fa-check text-success"></i> AL ARSH FREIGHT CARRIER
                </h5>
                <ul>
                  <li>24/7 customer support</li>
                  <li>Real-time tracking</li>
                  <li>Reliability</li>
                  <li>Competitive pricing</li>
                  <li>Advanced technology</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="comparison-card">
                <h5>
                  <i className="fas fa-times text-danger"></i> Traditional
                  Logistics
                </h5>
                <ul>
                  <li>Business hours support</li>
                  <li>Manual tracking</li>
                  <li>Limited coverage</li>
                  <li>Higher costs</li>
                  <li>Legacy systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
