import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";

export default function NotFound() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section
      className="py-5"
      style={{ minHeight: "600px", display: "flex", alignItems: "center" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center" data-aos="zoom-in">
            <div
              style={{
                fontSize: "150px",
                fontWeight: "bold",
                color: "#5FAEAD",
                marginBottom: "20px",
              }}
            >
              404
            </div>
            <h1 className="mb-3">Page Not Found</h1>
            <p className="mb-5">
              Sorry, the page you're looking for doesn't exist. It might have
              been moved or deleted.
            </p>
            <Link to="/" className="btn btn-primary btn-lg">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
