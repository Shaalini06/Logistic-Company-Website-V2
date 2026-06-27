export default function Newsletter() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
    e.target.reset();
  };

  return (
    <section className="newsletter-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8" data-aos="zoom-in">
            <div className="newsletter-content text-center">
              <h3 className="newsletter-title">Subscribe to Our Newsletter</h3>
              <p className="newsletter-subtitle">
                Get the latest shipping tips and industry updates delivered to
                your inbox
              </p>
              <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    required
                  />
                  <button className="btn btn-primary" type="submit">
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="newsletter-notice">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
