export default function Services() {
  const services = [
    {
      icon: "fas fa-truck-moving",
      title: "Full Truck Load (FTL)",
      desc: "Dedicated vehicles for your high-volume cargo, ensuring direct, safe, and faster delivery across India.",
      link: "/main/services#ftl",
    },
    {
      icon: "fas fa-boxes",
      title: "Part Truck Load (PTL)",
      desc: "Cost-effective transportation solutions for smaller consignments with shared truck capacity.",
      link: "/main/services#ptl",
    },
    {
      icon: "fas fa-trailer",
      title: "Trailer Transportation",
      desc: "Flatbeds, lowbeds, and specialized multi-axle trailers for over-dimensional (ODC) cargo.",
      link: "/main/services#trailer",
    },
    {
      icon: "fas fa-industry",
      title: "Industrial Cargo",
      desc: "Specialized shipping solutions tailored for steel, machinery, construction, and heavy engineering goods.",
      link: "/main/services#industrial",
    },
    {
      icon: "fas fa-shield-halved",
      title: "Dedicated Fleet",
      desc: "Customized fleet outsourcing options to meet your long-term business logistics requirements.",
      link: "/main/services#fleet",
    },
  ];

  return (
    <section className="services-section py-5">
      <div className="container">
        <div className="section-header text-center mb-5" data-aos="fade-up">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive logistics solutions tailored to your needs
          </p>
          <div className="title-underline"></div>
        </div>
        <div className="row g-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={`${(index + 1) * 100}`}
            >
              <div className="service-card">
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h4 className="service-title">{service.title}</h4>
                <p className="service-desc">{service.desc}</p>
                <a href={service.link} className="read-more">
                  Read More <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
