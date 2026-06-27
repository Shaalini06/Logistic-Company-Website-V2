export default function Workflow() {
  const steps = [
    {
      num: 1,
      icon: "📋",
      title: "Request a Quote",
      desc: "Submit your cargo details. Receive a competitive quote within 2 hours.",
      delay: "0",
    },
    {
      num: 2,
      icon: "🚚",
      title: "Pickup & Collection",
      desc: "We coordinate door pickup or port/depot collection at your convenience.",
      delay: "100",
    },
    {
      num: 3,
      icon: "📄",
      title: "Customs Clearance",
      desc: "Our licensed brokers handle all documentation and compliance on both ends.",
      delay: "200",
    },
    {
      num: 4,
      icon: "🌐",
      title: "Transit & Tracking",
      desc: "Real-time updates as your cargo moves. Any delays flagged immediately.",
      delay: "300",
    },
    {
      num: 5,
      icon: "🏁",
      title: "Delivery & Confirmation",
      desc: "Final delivery with proof of receipt. POD documents issued within 24 hours.",
      delay: "400",
    },
  ];

  return (
    <section id="workflow" className="section bg-white">
      <div className="section-inner">
        <div className="section-header text-center mb-5" data-aos="fade-up">
          <span className="section-label">Our Process</span>
          <h2 className="section-title">How we deliver peace of mind</h2>
          <div className="title-underline"></div>
        </div>
        <div className="wf-grid">
          {steps.map((step) => (
            <div
              key={step.num}
              className="wf-step"
              data-aos="fade-up"
              data-aos-delay={step.delay}
            >
              <div className="wf-step-num">{step.num}</div>
              <div className="wf-step-icon">{step.icon}</div>
              <h4 className="wf-step-title">{step.title}</h4>
              <p className="wf-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
