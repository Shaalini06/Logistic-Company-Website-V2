import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-5 py-5 border-bottom">
          <div className="col-lg-3 col-md-6">
            <div className="footer-column">
              <h5 className="footer-title">About AL ARSH FREIGHT CARRIER</h5>
              <p className="footer-text">
                Premium logistics solutions delivering excellence worldwide
                since 2010.
              </p>
              <div className="footer-social">
                <a href="#">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-column">
              <h5 className="footer-title">Our Services</h5>
              <ul className="footer-links">
                <li>
                  <Link to="/main/services">Full Truck Load (FTL)</Link>
                </li>
                <li>
                  <Link to="/main/services">Part Truck Load (PTL)</Link>
                </li>
                <li>
                  <Link to="/main/services">Trailer Transportation</Link>
                </li>
                <li>
                  <Link to="/main/services">Industrial Cargo</Link>
                </li>
                <li>
                  <Link to="/main/services">Dedicated Fleet</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-column">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-links">
                <li>
                  <Link to="/main">Home</Link>
                </li>
                <li>
                  <Link to="/main/about">About</Link>
                </li>

                <li>
                  <Link to="/main/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/main/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-column">
              <h5 className="footer-title">Contact Info</h5>
              <ul className="footer-contact">
                <li>
                  <i className="fas fa-map-marker-alt"></i> 186B lg 1 mndha mathur 3rd main road Chennai - 600068
                </li>
                <li>
                  <i className="fas fa-phone"></i> +91 6385328408
                </li>
                <li>
                  <i className="fas fa-envelope"></i> alarshfrightcarrier@gmail.com
                </li>
                <li>
                  <i className="fas fa-clock"></i> Mon - Sat: 9:00 - 18:00
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row py-4">
          <div className="col-md-6">
            <p className="footer-copyright">
              &copy; 2026 AL ARSH FREIGHT CARRIER. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <ul className="footer-legal">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
