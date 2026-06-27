import { useEffect } from "react";
import AOS from "aos";
import PageHeader from "../components/PageHeader";

export default function QuotePage() {
  useEffect(() => {
    AOS.init();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We will contact you soon with your quote.");
    e.target.reset();
  };

  return (
    <>
      <PageHeader
        title="Get a Free Quote"
        subtitle="Tell us about your shipping needs"
      />
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2" data-aos="fade-up">
              <div className="quote-form">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="fullName" className="form-label">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          name="fullName"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="company" className="form-label">
                          Company Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="company"
                          name="company"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="origin" className="form-label">
                          Pickup Location *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="origin"
                          placeholder="City, Country"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="destination" className="form-label">
                          Destination *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="destination"
                          placeholder="City, Country"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="weight" className="form-label">
                          Weight (kg) *
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="weight"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="serviceType" className="form-label">
                          Service Type *
                        </label>
                        <select
                          className="form-control"
                          id="serviceType"
                          required
                        >
                          <option value="">Select Service</option>
                          <option value="Air Freight">Air Freight</option>
                          <option value="Sea Freight">Sea Freight</option>
                          <option value="Land Transport">Land Transport</option>
                          <option value="Warehousing">Warehousing</option>
                          <option value="International">
                            International Shipping
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="form-group">
                      <label htmlFor="shipmentType" className="form-label">
                        Shipment Type *
                      </label>
                      <select
                        className="form-control"
                        id="shipmentType"
                        required
                      >
                        <option value="">Select Shipment Type</option>
                        <option value="General Cargo">General Cargo</option>
                        <option value="Hazardous Materials">
                          Hazardous Materials
                        </option>
                        <option value="Fragile Items">Fragile Items</option>
                        <option value="Perishables">Perishables</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="form-group">
                      <label htmlFor="description" className="form-label">
                        Additional Information
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        rows="5"
                        placeholder="Describe your shipment and any special requirements..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="agreeTerms"
                        required
                      />
                      <label className="form-check-label" htmlFor="agreeTerms">
                        I agree to the terms and conditions
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                  >
                    Get Quote
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
