export default function Features() {
  const features = [
    {
      icon: "fas fa-shipping-fast",
      title: "Fast Delivery",
      desc: "Quick and efficient shipping services ensuring timely delivery worldwide",
    },
    {
      icon: "fas fa-lock",
      title: "Secure Handling",
      desc: "Advanced security measures protecting your shipments during transit",
    },
    {
      icon: "fas fa-map-location-dot",
      title: "Real-time Tracking",
      desc: "GPS tracking system for complete visibility of your shipments",
    },
    {
      icon: "fas fa-headset",
      title: "24/7 Support",
      desc: "Round-the-clock customer support for all your logistics needs",
    },
  ];

  return (
    <section className="features-section py-5">
      <div className="container">
        <div className="section-header text-center mb-5" data-aos="fade-up">
          <h2 className="section-title">Why Choose AL ARSH FREIGHT CARRIER</h2>
          <p className="section-subtitle">
            Industry-leading logistics solutions with premium features
          </p>
          <div className="title-underline"></div>
        </div>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay={`${(index + 1) * 100}`}
            >
              <div className="feature-card">
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
