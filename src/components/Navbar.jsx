import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Click outside to close user dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const isLanding = location.pathname === "/";
  const isAuth = location.pathname === "/auth";

  // Render ONLY logo on Auth page
  if (isAuth) {
    return (
      <nav style={{ position: "relative", display: "flex", justifyContent: "flex-start", background: "var(--color-dark)", padding: "18px 5%", zIndex: 10 }}>
        <Link className="nav-logo" to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="AL ARSH Logo" style={{ height: "45px", width: "45px", borderRadius: "50%", backgroundColor: "#ffffff", objectFit: "cover" }} />
        </Link>
      </nav>
    );
  }

  return (
    <nav className={`${scrolled ? "scrolled" : ""} ${isLanding ? "landing-nav" : ""}`}>
      
      <Link className="nav-logo" to={isLanding ? "/" : "/main"} style={{ display: "flex", alignItems: "center" }}>
        <img src="/logo.png" alt="AL ARSH Logo" style={{ height: "45px", width: "45px", borderRadius: "50%", backgroundColor: "#ffffff", objectFit: "cover" }} />
      </Link>

      <ul className={`nav-links ${isOpen ? "active-mobile" : ""}`}>
        <li>
          {isLanding ? (
            <a href="#hero" className="nav-link" onClick={handleScrollTo("hero")}>
              Home
            </a>
          ) : (
            <Link to="/main" className={location.pathname === "/main" ? "active" : ""}>
              Home
            </Link>
          )}
        </li>
        <li>
          {isLanding ? (
            <a href="#about" className="nav-link" onClick={handleScrollTo("about")}>
              About Us
            </a>
          ) : (
            <Link to="/main/about" className={location.pathname === "/main/about" ? "active" : ""}>
              About Us
            </Link>
          )}
        </li>
        <li>
          {isLanding ? (
            <a href="#services" className="nav-link" onClick={handleScrollTo("services")}>
              Services
            </a>
          ) : (
            <Link to="/main/services" className={location.pathname.startsWith("/main/services") ? "active" : ""}>
              Services
            </Link>
          )}
        </li>
        {isLanding && (
          <li>
            <a href="#industries" className="nav-link" onClick={handleScrollTo("industries")}>
              Industries
            </a>
          </li>
        )}
        <li>
          {isLanding ? (
            <a href="#contact" className="nav-link" onClick={handleScrollTo("contact")}>
              Contact
            </a>
          ) : (
            <Link to="/main/contact" className={location.pathname === "/main/contact" ? "active" : ""}>
              Contact
            </Link>
          )}
        </li>
      </ul>

      <div className="nav-actions-wrapper">
        {isLanding ? (
          <Link to="/auth" className="btn-glass">
            Sign In <i className="fa-solid fa-arrow-right"></i>
          </Link>
        ) : (
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button className="nav-avatar-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {user ? user.name.split(" ").map(n => n[0]).join("") : "U"}
            </button>
            {dropdownOpen && (
              <div className="nav-user-dropdown">
                <div className="nav-dropdown-user-info">
                  <p>{user ? user.name : "User"}</p>
                  <span>{user ? user.role : "Client"}</span>
                </div>
                <button className="nav-dropdown-logout-btn" onClick={logout}>
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="nav-burger" onClick={() => setIsOpen(!isOpen)}>
        <span style={isLanding ? { background: "white" } : {}}></span>
        <span style={isLanding ? { background: "white" } : {}}></span>
        <span style={isLanding ? { background: "white" } : {}}></span>
      </div>
    </nav>
  );
}
