import { useState } from "react";

export default function TrackingSimulator() {
  const [trackingId, setTrackingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const mockShipments = {
    "AA-123456": {
      id: "AA-123456",
      status: "In Transit",
      step: 3, // 0 to 4
      type: "Air Freight",
      origin: "Dubai, UAE (DXB)",
      destination: "London, UK (LHR)",
      estDelivery: "June 18, 2026",
      weight: "1,250 kg",
      volume: "6.2 CBM",
      carrier: "AL ARSH Flight AA-294",
      history: [
        { title: "Booking Confirmed", date: "June 14, 2026 - 10:00 AM", location: "Dubai Hub", completed: true },
        { title: "Cargo Picked Up", date: "June 14, 2026 - 04:30 PM", location: "Jebel Ali, Dubai", completed: true },
        { title: "Customs Clearance Passed", date: "June 15, 2026 - 09:15 AM", location: "DXB Customs Office", completed: true },
        { title: "In Transit", date: "June 15, 2026 - 02:00 PM", location: "En-route to London", completed: true, active: true },
        { title: "Delivered", date: "Pending Est. June 18", location: "London Terminal 4", completed: false },
      ],
    },
    "AA-789012": {
      id: "AA-789012",
      status: "Delivered",
      step: 4,
      type: "Sea Freight",
      origin: "Shanghai, China (CNSHA)",
      destination: "Jebel Ali, Dubai (AEJEA)",
      estDelivery: "June 12, 2026",
      weight: "18,400 kg",
      volume: "40ft Container",
      carrier: "AL ARSH Ocean Voyager V-109",
      history: [
        { title: "Booking Confirmed", date: "May 25, 2026 - 08:00 AM", location: "Shanghai Office", completed: true },
        { title: "Cargo Picked Up", date: "May 26, 2026 - 11:00 AM", location: "Shanghai Port", completed: true },
        { title: "Customs Clearance Passed", date: "May 28, 2026 - 02:45 PM", location: "Shanghai Customs", completed: true },
        { title: "In Transit", date: "June 10, 2026 - 08:30 AM", location: "Arabian Sea", completed: true },
        { title: "Delivered", date: "June 12, 2026 - 04:10 PM", location: "Jebel Ali Freezone, Dubai", completed: true, active: true },
      ],
    },
  };

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    setTimeout(() => {
      const cleanId = trackingId.trim().toUpperCase();
      if (mockShipments[cleanId]) {
        setResult(mockShipments[cleanId]);
      } else {
        // Generate a random dynamic shipment for any input to make it interactive and fun!
        setResult({
          id: cleanId,
          status: "In Transit",
          step: 2,
          type: "Land Transport",
          origin: "Dubai, UAE",
          destination: "Riyadh, Saudi Arabia",
          estDelivery: "June 17, 2026",
          weight: "4,500 kg",
          volume: "18 CBM",
          carrier: "AL ARSH Trucking T-801",
          history: [
            { title: "Booking Confirmed", date: "June 14, 2026", location: "Dubai Hub", completed: true },
            { title: "Cargo Picked Up", date: "June 14, 2026", location: "Al Aweer, Dubai", completed: true },
            { title: "Customs Clearance Passed", date: "June 15, 2026", location: "Ghuwaifat Border", completed: true, active: true },
            { title: "In Transit", date: "June 16, 2026", location: "En-route to Riyadh", completed: false },
            { title: "Delivered", date: "Est. June 17, 2026", location: "Riyadh Logistics Park", completed: false },
          ],
        });
      }
      setLoading(false);
    }, 1000);
  };

  const steps = ["Booking", "Pickup", "Customs", "Transit", "Delivered"];

  return (
    <section id="tracking" className="section bg-light-gray">
      <div className="container">
        <div className="section-header text-center mb-5" data-aos="fade-up">
          <span className="section-label">Real-Time Tracking</span>
          <h2 className="section-title">Track Your Shipment</h2>
          <div className="title-underline"></div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
            {/* Tracking Search Input Card */}
            <div className="tracking-search-card">
              <form onSubmit={handleTrack} className="tracking-form">
                <div className="tracking-input-wrapper">
                  <i className="fas fa-search tracking-icon"></i>
                  <input
                    type="text"
                    placeholder="Enter Tracking ID (e.g., AA-123456 or AA-789012)"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="form-control tracking-input"
                  />
                </div>
                <button type="submit" className="btn-track-submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Locating...
                    </>
                  ) : (
                    "Track Cargo"
                  )}
                </button>
              </form>
              <div className="tracking-suggestions">
                <span>Try:</span>
                <button type="button" onClick={() => setTrackingId("AA-123456")} className="btn-suggest">AA-123456</button>
                <button type="button" onClick={() => setTrackingId("AA-789012")} className="btn-suggest">AA-789012</button>
              </div>
            </div>

            {/* Tracking Result Card */}
            {result && (
              <div className="tracking-result-card mt-5" data-aos="fade-up">
                <div className="result-header">
                  <div>
                    <span className="result-id-badge">{result.id}</span>
                    <span className="result-type-text">{result.type}</span>
                  </div>
                  <div className={`status-pill ${result.status.toLowerCase().replace(" ", "-")}`}>
                    <span className="status-dot"></span>
                    {result.status}
                  </div>
                </div>

                <div className="result-details-grid mt-4">
                  <div className="detail-item">
                    <span className="detail-label">Origin</span>
                    <span className="detail-val">{result.origin}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Destination</span>
                    <span className="detail-val">{result.destination}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Est. Delivery</span>
                    <span className="detail-val">{result.estDelivery}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Carrier / Vessel</span>
                    <span className="detail-val">{result.carrier}</span>
                  </div>
                </div>

                {/* Progress Visual Bar */}
                <div className="tracking-progress-wrapper mt-5">
                  <div className="progress-bar-line">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${(result.step / (steps.length - 1)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="progress-steps">
                    {steps.map((step, idx) => {
                      const isCompleted = idx <= result.step;
                      const isActive = idx === result.step && result.status !== "Delivered";
                      return (
                        <div key={idx} className={`progress-step-node ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}>
                          <div className="node-circle">
                            {idx === 4 && result.status === "Delivered" ? (
                              <i className="fas fa-check"></i>
                            ) : idx < result.step ? (
                              <i className="fas fa-check"></i>
                            ) : (
                              idx + 1
                            )}
                          </div>
                          <span className="node-label">{step}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tracking Milestones History */}
                <div className="tracking-history-wrapper mt-5">
                  <h4 className="history-title">Milestone History</h4>
                  <div className="history-timeline">
                    {result.history.map((item, idx) => (
                      <div key={idx} className={`history-timeline-item ${item.completed ? "completed" : ""} ${item.active ? "active" : ""}`}>
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <h5 className="timeline-step-title">{item.title}</h5>
                          <p className="timeline-step-info">
                            <span><i className="far fa-clock"></i> {item.date}</span>
                            <span className="ms-3"><i className="fas fa-map-marker-alt"></i> {item.location}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
