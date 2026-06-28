import { useEffect, useState } from "react";
import AOS from "aos";
import PageHeader from "../components/PageHeader";
import { Send } from "lucide-react";

export default function ContactPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !subject || !message) {
      setStatusMsg("Please fill in all fields.");
      setIsSuccess(false);
      return;
    }

    const mailtoUrl = `mailto:alarshfrightcarrier@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoUrl;

    setIsSuccess(true);
    setStatusMsg("Opening your email client to send the email...");
    setFullName("");
    setEmail("");
    setSubject("");
    setMessage("");
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
                  <a href="mailto:alarshfrightcarrier@gmail.com">alarshfrightcarrier@gmail.com</a>
                </p>
              </div>
            </div>
          </div>

          <div className="row g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="contact-form">
                <h3 className="mb-4">Send us an Email</h3>
                <form onSubmit={handleSubmit}>
                  {statusMsg && (
                    <div className="mb-4">
                      <div 
                        style={{
                          padding: "10px 15px",
                          borderRadius: "6px",
                          background: isSuccess ? "rgba(37, 211, 102, 0.1)" : "rgba(220, 53, 69, 0.1)",
                          border: isSuccess ? "1px solid #25D366" : "1px solid #dc3545",
                          color: isSuccess ? "#25D366" : "#dc3545",
                          fontSize: "0.9rem",
                          textAlign: "center"
                        }}
                      >
                        {statusMsg}
                      </div>
                    </div>
                  )}
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <Send size={16} /> Send Email
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
