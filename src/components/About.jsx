export default function About() {
  return (
    <section className="about-section py-5">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80"
                alt="About AL ARSH FREIGHT CARRIER"
                className="img-fluid rounded-3"
              />
              <a
                href="/ARSH_commercial.mp4"
                className="play-btn video-popup"
                data-glightbox
              >
                <i className="fas fa-play"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-left">
            <div className="about-content">
              <div className="section-header mb-4">
                <h2 className="section-title text-start">
                  About AL ARSH FREIGHT CARRIER
                </h2>
                <p className="section-subtitle text-start">
                  Delivering excellence since 2010
                </p>
                <div
                  className="title-underline"
                  style={{ width: "80px" }}
                ></div>
              </div>
              <p className="about-text">
                AL ARSH FREIGHT CARRIER is a leading logistics company dedicated to providing
                exceptional shipping and transportation services. With over a
                decade of experience, we've built a reputation for reliability,
                speed, and customer satisfaction.
              </p>
              <ul className="about-features">
                <li>
                  <i className="fas fa-check"></i> Reliability in every single shipment
                </li>
                <li>
                  <i className="fas fa-check"></i> State-of-the-art tracking
                  technology
                </li>
                <li>
                  <i className="fas fa-check"></i> Professional and trained team
                </li>
                <li>
                  <i className="fas fa-check"></i> Competitive pricing and
                  transparent rates
                </li>
                <li>
                  <i className="fas fa-check"></i> Eco-friendly logistics
                  solutions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
