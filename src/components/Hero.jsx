import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";

export default function Hero() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section id="hero">
      <div className="hero-grid"></div>
      <div className="hero-orb-1"></div>
      <div className="hero-orb-2"></div>
      <div className="hero-inner">
        <div className="hero-content" data-aos="fade-right">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>Premium Pan-India Logistics Carrier · ISO Certified</span>
          </div>
          <h1 className="hero-h1">
            Reliable Freight
            <br />
            <em>Without</em>
            <br />
            Borders
          </h1>
          <p className="hero-sub">
            Reliable road, FTL, PTL, and heavy trailer transport services connecting
            businesses across India. End-to-end logistics solutions.
          </p>
          <div className="hero-actions">
            <Link to="/quote" className="btn-primary">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10a19.79 19.79 0 01-3-8.59A2 2 0 012.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              Request a Quote
            </Link>
            <a href="#tracking" className="btn-outline">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Track Shipment
            </a>
          </div>
          <div className="hero-trust">
            <div className="hero-trust-avatars">
              <span>MA</span>
              <span>SK</span>
              <span>RJ</span>
              <span>+</span>
            </div>
            <p>
              <strong>2,500+ businesses</strong> trust AL ARSH
              <br />
              for mission-critical cargo
            </p>
          </div>
        </div>

        {/* Hero Visual - Spinning Globe SVG and Floating Cards */}
        <div className="hero-visual" data-aos="fade-left" data-aos-delay="200">
          <div className="globe-container">
            <svg
              className="globe-svg"
              viewBox="0 0 440 440"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="440"
              height="440"
            >
              <circle cx="220" cy="220" r="200" stroke="rgba(63,175,168,0.15)" strokeWidth="1" stroke-dasharray="4 6" />
              <circle cx="220" cy="220" r="170" stroke="rgba(63,175,168,0.1)" stroke-width="1" stroke-dasharray="2 8" />
              <circle cx="220" cy="220" r="140" stroke="rgba(63,175,168,0.08)" stroke-width="1" />
              
              <ellipse cx="220" cy="220" rx="200" ry="60" stroke="rgba(63,175,168,0.08)" stroke-width="0.8" />
              <ellipse cx="220" cy="220" rx="200" ry="120" stroke="rgba(63,175,168,0.06)" stroke-width="0.8" />
              
              <path d="M 220 20 Q 120 220 220 420" stroke="rgba(63,175,168,0.07)" stroke-width="0.8" fill="none" />
              <path d="M 220 20 Q 320 220 220 420" stroke="rgba(63,175,168,0.07)" stroke-width="0.8" fill="none" />
              <path d="M 20 220 Q 220 120 420 220" stroke="rgba(63,175,168,0.07)" stroke-width="0.8" fill="none" />
              
              <path
                d="M 220 180 Q 280 140 330 160"
                stroke="#3FAFA8"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="5 4"
                opacity="0.7"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="2s" repeatCount="indefinite" />
              </path>
              <path
                d="M 220 180 Q 160 130 110 155"
                stroke="#3FAFA8"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="5 4"
                opacity="0.6"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="2.5s" repeatCount="indefinite" />
              </path>
              <path
                d="M 220 180 Q 240 260 270 290"
                stroke="#6CC9C0"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="5 4"
                opacity="0.5"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="3s" repeatCount="indefinite" />
              </path>
              <path
                d="M 220 180 Q 190 250 155 270"
                stroke="#6CC9C0"
                strokeWidth="1.2"
                fill="none"
                strokeDasharray="4 5"
                opacity="0.45"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="2.8s" repeatCount="indefinite" />
              </path>
              
              <circle cx="220" cy="180" r="8" fill="#3FAFA8" opacity="0.9" />
              <circle cx="220" cy="180" r="14" fill="rgba(63,175,168,0.2)" />
              <circle cx="220" cy="180" r="22" fill="rgba(63,175,168,0.08)" />
              
              <circle cx="330" cy="160" r="5" fill="#6CC9C0" />
              <circle cx="110" cy="155" r="5" fill="#6CC9C0" />
              <circle cx="270" cy="290" r="5" fill="#6CC9C0" />
              <circle cx="155" cy="270" r="5" fill="#6CC9C0" />
              <circle cx="340" cy="250" r="4" fill="rgba(108,201,192,0.6)" />
              <circle cx="90" cy="200" r="3.5" fill="rgba(108,201,192,0.5)" />
              
              <circle cx="330" cy="160" r="10" fill="none" stroke="#3FAFA8" strokeWidth="1" opacity="0.5">
                <animate attributeName="r" from="6" to="14" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="110" cy="155" r="10" fill="none" stroke="#3FAFA8" strokeWidth="1" opacity="0.5">
                <animate attributeName="r" from="6" to="14" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" repeatCount="indefinite" />
              </circle>
              
              <text x="340" y="153" font-family="Inter" font-size="9" fill="rgba(255,255,255,0.5)">LONDON</text>
              <text x="76" y="148" font-family="Inter" font-size="9" fill="rgba(255,255,255,0.5)">NEW YORK</text>
              <text x="278" y="298" font-family="Inter" font-size="9" fill="rgba(255,255,255,0.5)">MUMBAI</text>
              <text x="100" y="268" font-family="Inter" font-size="9" fill="rgba(255,255,255,0.5)">NAIROBI</text>
              <text x="225" y="175" font-family="Inter" font-size="9" fill="white" font-weight="600">CHENNAI</text>
              <text x="265" y="156" font-size="14" fill="rgba(255,255,255,0.5)">✈</text>
            </svg>
            
            {/* Floating cards */}
            <div className="hero-cards">
              <div className="float-card fc-air">
                <div className="float-card-icon">🚜</div>
                <div className="float-card-label">Trailer Transport</div>
                <div className="float-card-value">Heavy / ODC</div>
                <div className="float-card-sub">Multi-axle fleet</div>
              </div>
              <div className="float-card fc-sea">
                <div className="float-card-icon">🏭</div>
                <div className="float-card-label">Industrial Cargo</div>
                <div className="float-card-value">Steel & Goods</div>
                <div className="float-card-sub">Secure handling</div>
              </div>
              <div className="float-card fc-land">
                <div className="float-card-icon">🚛</div>
                <div className="float-card-label">Land Transport</div>
                <div className="float-card-value">PAN-INDIA</div>
                <div className="float-card-sub">Door to door</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
