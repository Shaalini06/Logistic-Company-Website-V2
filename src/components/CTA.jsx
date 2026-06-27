import { Link } from "react-router-dom";

export default function CTA({
  ctaText = "Ready to Ship with AL ARSH FREIGHT CARRIER?",
  ctaSubtext = "Get a quote today and experience the difference in logistics excellence",
  buttonText = "Get Free Quote",
  link = "/quote",
}) {
  return (
    <section
      className="cta-section py-5"
      style={{ background: "linear-gradient(135deg, #1D3763, #2F5B8F, #5FAEAD)" }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8" data-aos="fade-right">
            <h2 className="text-white mb-3">{ctaText}</h2>
            <p className="text-white-50">{ctaSubtext}</p>
          </div>
          <div className="col-lg-4 text-lg-end" data-aos="fade-left">
            <Link to={link} className="btn btn-light btn-lg">
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
