import { useEffect } from "react";
import AOS from "aos";
import PageHeader from "../components/PageHeader";

export default function ContactPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We will respond soon.");
    e.target.reset();
  };

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Get in touch with our team" />
      <section className="py-5">
        <div className="container">
          <div className="row g-5 mb-5">
            <div className="col-lg-4" data-aos="fade-up">
              <div className="contact-info-card">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h5>Address</h5>
                <p style={{ fontSize: "0.95rem" }}>
                  186B lg 1 mndha mathur 3rd main road Chennai - 600068
                </p>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="contact-info-card">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <h5>Phone</h5>
                <p>
                  <a href="tel:+916385328408">+91 6385328408</a>
                </p>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="contact-info-card">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <h5>Email</h5>
                <p>
                  <a href="mailto:info.alarshfreightcarriers@gmail.com">info.alarshfreightcarriers@gmail.com</a>
                </p>
              </div>
            </div>
          </div>

          <div className="row g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="contact-form">
                <h3 className="mb-4">Send us a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Message"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="contact-hours">
                <h3 className="mb-4">Business Hours</h3>
                <ul className="hours-list">
                  <li>
                    <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                  </li>
                  <li>
                    <strong>Saturday:</strong> 10:00 AM - 4:00 PM
                  </li>
                  <li>
                    <strong>Sunday:</strong> Closed
                  </li>
                  <li className="mt-3">
                    <strong>Emergency Support:</strong> Available 24/7
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
