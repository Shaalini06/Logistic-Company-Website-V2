import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, FileText, Send, HelpCircle, ArrowRight, MessageSquare, Plus, Lock, Star, Clock } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Navbar from "../components/Navbar";
import IntroVideo from "../components/IntroVideo";

// Statistics Counter Component
function StatCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target.replace(/,/g, ""), 10);
    if (start === end) return;

    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} style={{ fontSize: "2.5rem", fontWeight: "800", color: "var(--color-accent)", display: "block" }}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// FAQ Accordion Item Component
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", marginBottom: "12px", overflow: "hidden", transition: "all 0.3s ease" }}>
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: "100%", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", color: "white", textAlign: "left", fontWeight: "600", fontSize: "1rem", outline: "none", cursor: "pointer" }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <HelpCircle size={18} style={{ color: "var(--color-accent)" }} />
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus size={20} style={{ color: "var(--color-accent)" }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div style={{ padding: "0 24px 20px 54px", color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: "1.6", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function LandingPage() {
  // Intro video state
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  // Section refs for scroll animations
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const industriesRef = useRef(null);
  const quoteRef = useRef(null);
  const contactRef = useRef(null);

  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const industriesInView = useInView(industriesRef, { once: true, margin: "-100px" });
  const quoteInView = useInView(quoteRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

  // Floating button scroll progress
  const [showFloating, setShowFloating] = useState(false);
  useEffect(() => {
    const handleScrollVisibility = () => {
      setShowFloating(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScrollVisibility);
    return () => window.removeEventListener("scroll", handleScrollVisibility);
  }, []);

  // WhatsApp Quote Form States
  const [quoteCompany, setQuoteCompany] = useState("");
  const [quoteContact, setQuoteContact] = useState("");
  const [quotePhone, setQuotePhone] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quotePickup, setQuotePickup] = useState("");
  const [quoteDelivery, setQuoteDelivery] = useState("");
  const [quoteLoad, setQuoteLoad] = useState("");
  const [quoteProduct, setQuoteProduct] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");

  const handleWhatsAppQuoteSubmit = (e) => {
    e.preventDefault();
    if (!quoteCompany || !quoteContact || !quotePhone || !quotePickup || !quoteDelivery || !quoteProduct) {
      alert("Please fill in all required fields marked with *");
      return;
    }
    const message = `*AL ARSH FREIGHT CARRIERS - TRANSPORTATION QUOTE*
----------------------------------------
*Company:* ${quoteCompany}
*Contact Person:* ${quoteContact}
*Phone:* ${quotePhone}
*Email:* ${quoteEmail || "N/A"}
*Pickup Location:* ${quotePickup}
*Delivery Location:* ${quoteDelivery}
*Monthly Load Req:* ${quoteLoad || "N/A"}
*Product/Commodity:* ${quoteProduct}
*Message/Notes:* ${quoteMessage || "None"}`;

    const waUrl = `https://wa.me/916385328408?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  // Dynamic Reviews State
  const [publicReviews, setPublicReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/reviews/public")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.reviews) setPublicReviews(data.reviews);
      })
      .catch(() => { /* silently fail — show fallback */ });
  }, []);

  const displayReviews = publicReviews.length > 0 ? publicReviews : [
    {
      id: 1,
      customer_name: "Rajesh Kumar",
      company_name: "Logistics Head, Steel Ind.",
      rating: 5,
      review_message: "Al Arsh Freight Carriers has completely streamlined our supply chain. Their FTL services are always on time, giving us perfect peace of mind."
    },
    {
      id: 2,
      customer_name: "Sandeep Singh",
      company_name: "Operations Manager, Mfg.",
      rating: 5,
      review_message: "Finding a reliable partner for heavy trailer transport was tough until we found Al Arsh. Their competitive pricing and safety standards are unmatched."
    },
    {
      id: 3,
      customer_name: "Amit Patel",
      company_name: "Supply Chain Director",
      rating: 4.5,
      review_message: "Excellent dedicated support. Whenever we have urgent dispatch requirements, their part-load transportation services deliver consistently."
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const floor = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < floor) {
        stars.push(<i key={i} className="fa-solid fa-star" style={{ color: "var(--color-accent)", marginRight: "3px" }}></i>);
      } else if (i === floor && hasHalf) {
        stars.push(<i key={i} className="fa-solid fa-star-half-stroke" style={{ color: "var(--color-accent)", marginRight: "3px" }}></i>);
      } else {
        stars.push(<i key={i} className="fa-regular fa-star" style={{ color: "rgba(255, 255, 255, 0.2)", marginRight: "3px" }}></i>);
      }
    }
    return stars;
  };

  return (
    <>
      {/* Intro Video Overlay — plays before landing page is revealed */}
      {!introComplete && <IntroVideo onComplete={handleIntroComplete} />}

      <div
        style={{
          background: "var(--color-dark)",
          color: "white",
          minHeight: "100vh",
          overflowX: "hidden",
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
        }}
      >
      {/* Header / Navbar */}
      <Navbar />

      {/* SECTION 1 — HERO */}
      <header id="hero" className="mesh-bg" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 20px 60px 20px" }}>
        
        {/* Subtle grid overlay */}
        <div className="grid-overlay" />

        {/* Ambient background particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
            }}
            animate={{
              y: ["0vh", "100vh"],
              x: ["0vw", `${Math.random() * 6 - 3}vw`]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * -20
            }}
          />
        ))}

        <div style={{ position: "relative", zIndex: 10, maxWidth: "900px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: "rgba(63, 175, 168, 0.12)",
              border: "1px solid rgba(63, 175, 168, 0.3)",
              padding: "8px 24px",
              borderRadius: "50px",
              fontSize: "0.85rem",
              fontWeight: "600",
              letterSpacing: "1.5px",
              marginBottom: "30px",
              color: "var(--color-accent)",
              textTransform: "uppercase"
            }}
          >
            🇮🇳 Premium Pan-India Logistics Gateway
          </motion.div>

          {/* Heading */}
          <h1 style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
            fontFamily: "Syne, sans-serif",
            fontWeight: "800",
            lineHeight: "1.15",
            color: "white",
            marginBottom: "24px"
          }}>
            Reliable Road Transportation <br/>
            <span style={{ color: "var(--color-accent)" }}>Across India</span>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "680px",
              lineHeight: "1.6",
              marginBottom: "40px"
            }}
          >
            Safe, Timely, and Cost-Effective Freight Solutions for Businesses of Every Size.
            We bridge the gap between industries and markets nationwide.
          </motion.p>

          {/* Call-to-action buttons (Sign In replacing Get Free Quote on left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}
          >
            <Link to="/auth" className="btn-glass" style={{ padding: "16px 40px", fontSize: "1.05rem" }}>
              <Lock size={18} style={{ marginRight: "8px" }} /> Sign In to Platform
            </Link>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn btn-outline" 
              style={{ padding: "16px 40px", fontSize: "1.05rem", color: "white", borderColor: "rgba(255, 255, 255, 0.3)", borderRadius: "12px", background: "rgba(255, 255, 255, 0.03)" }}
            >
              <Phone size={18} style={{ marginRight: "8px", display: "inline-block" }} /> Contact Us
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)", cursor: "pointer", zIndex: 10 }}
          onClick={() => document.getElementById("features-banner")?.scrollIntoView({ behavior: "smooth" })}
        >
          <i className="fa-solid fa-chevron-down" style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "1.5rem" }}></i>
        </motion.div>
      </header>

      {/* SECTION 2 — FEATURES BANNER STRIP */}
      <section 
        id="features-banner"
        style={{
          background: "var(--color-accent)",
          color: "var(--color-dark)",
          padding: "24px 0",
          boxShadow: "0 10px 30px rgba(63, 175, 168, 0.15)"
        }}
      >
        <div className="container">
          <div className="row g-4 text-center">
            {/* Feature 1 */}
            <div className="col-md-3 col-6">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <i className="fa-solid fa-map-location-dot" style={{ fontSize: "1.6rem" }}></i>
                <span style={{ fontWeight: "700", fontSize: "0.95rem", letterSpacing: "0.5px" }}>PAN INDIA SERVICE</span>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="col-md-3 col-6">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <i className="fa-solid fa-business-time" style={{ fontSize: "1.6rem" }}></i>
                <span style={{ fontWeight: "700", fontSize: "0.95rem", letterSpacing: "0.5px" }}>ON-TIME DELIVERY</span>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="col-md-3 col-6">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <i className="fa-solid fa-tags" style={{ fontSize: "1.6rem" }}></i>
                <span style={{ fontWeight: "700", fontSize: "0.95rem", letterSpacing: "0.5px" }}>COMPETITIVE PRICING</span>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="col-md-3 col-6">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <i className="fa-solid fa-headset" style={{ fontSize: "1.6rem" }}></i>
                <span style={{ fontWeight: "700", fontSize: "0.95rem", letterSpacing: "0.5px" }}>DEDICATED SUPPORT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — ABOUT US */}
      <section 
        id="about" 
        ref={aboutRef}
        style={{
          padding: "120px 0",
          background: "linear-gradient(180deg, var(--color-dark) 0%, #0c182b 100%)"
        }}
      >
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left side: Image and experience tag */}
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                style={{ position: "relative", paddingRight: "20px" }}
              >
                <div style={{
                  background: "linear-gradient(220deg, rgba(63, 175, 168, 0.1) 0%, rgba(11, 59, 110, 0.4) 100%)",
                  borderRadius: "24px",
                  padding: "12px",
                  border: "1px solid rgba(255,255,255,0.06)"
                }}>
                  {/* Intro Video */}
                  <video 
                    src="/Al_Arsh_Freight_Carrier_intro_202606202117.mp4"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: "100%", height: "420px", objectFit: "cover", borderRadius: "18px" }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Right side: text and info */}
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <span style={{ color: "var(--color-accent)", fontWeight: "700", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "2px", display: "block", marginBottom: "12px" }}>ABOUT US</span>
                <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontFamily: "Syne, sans-serif", fontWeight: 800, color: "white", marginBottom: "20px", lineHeight: "1.2" }}>
                  Your Trusted Partner in Indian Logistics
                </h2>
                <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "20px" }}>
                  At Al Arsh Freight Carriers, we bring deep industry expertise to road transportation and freight forwarding. We specialize in providing customer-focused transportation solutions tailored to the unique demands of manufacturers, warehouses, and heavy industries across India.
                </p>
                <div style={{ background: "rgba(63, 175, 168, 0.05)", borderLeft: "4px solid var(--color-accent)", padding: "16px 20px", borderRadius: "0 12px 12px 0", marginBottom: "24px" }}>
                  <p style={{ margin: 0, fontStyle: "italic", color: "rgba(255,255,255,0.9)", fontSize: "0.95rem" }}>
                    "To deliver unparalleled safety and reliability in cargo movement, bridging the gap between industries and markets with cost-effective, timely logistics."
                  </p>
                </div>
                
                {/* Bullet Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <CheckCircle size={18} style={{ color: "var(--color-accent)" }} />
                    <span style={{ fontWeight: "600" }}>Safety and Reliability Commitment</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <CheckCircle size={18} style={{ color: "var(--color-accent)" }} />
                    <span style={{ fontWeight: "600" }}>Custom Industrial Cargo Movement</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <CheckCircle size={18} style={{ color: "var(--color-accent)" }} />
                    <span style={{ fontWeight: "600" }}>Dedicated Client Support Team</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — OUR SERVICES */}
      <section 
        id="services" 
        ref={servicesRef}
        style={{
          padding: "120px 0",
          background: "#08101c"
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <span style={{ color: "var(--color-accent)", fontWeight: "700", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "2px" }}>OUR SERVICES</span>
            <h2 className="section-title" style={{ color: "white", fontSize: "clamp(2rem, 4vw, 2.8rem)", marginTop: "10px" }}>
              Comprehensive Freight Solutions
            </h2>
            <div className="title-underline" style={{ background: "linear-gradient(90deg, var(--color-accent), transparent)" }}></div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="row g-4"
          >
            {/* Card 1: FTL */}
            <div className="col-md-4">
              <motion.div variants={fadeUp} className="glass-card text-center" style={{ height: "100%" }}>
                <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "rgba(63, 175, 168, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto", color: "var(--color-accent)" }}>
                  <i className="fa-solid fa-truck-moving" style={{ fontSize: "2rem" }}></i>
                </div>
                <h4 style={{ color: "white", fontSize: "1.3rem", fontWeight: "700", marginBottom: "15px" }}>Full Truck Load (FTL)</h4>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
                  Dedicated vehicles for your high-volume cargo, ensuring direct, safe, and faster delivery to manufacturing sites.
                </p>
              </motion.div>
            </div>

            {/* Card 2: PTL */}
            <div className="col-md-4">
              <motion.div variants={fadeUp} className="glass-card text-center" style={{ height: "100%" }}>
                <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "rgba(63, 175, 168, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto", color: "var(--color-accent)" }}>
                  <i className="fa-solid fa-boxes-stacked" style={{ fontSize: "2rem" }}></i>
                </div>
                <h4 style={{ color: "white", fontSize: "1.3rem", fontWeight: "700", marginBottom: "15px" }}>Part Truck Load (PTL)</h4>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
                  Cost-effective solutions for smaller consignments without compromising on delivery speed and handling.
                </p>
              </motion.div>
            </div>

            {/* Card 3: Trailer */}
            <div className="col-md-4">
              <motion.div variants={fadeUp} className="glass-card text-center" style={{ height: "100%" }}>
                <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "rgba(63, 175, 168, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto", color: "var(--color-accent)" }}>
                  <i className="fa-solid fa-trailer" style={{ fontSize: "2rem" }}></i>
                </div>
                <h4 style={{ color: "white", fontSize: "1.3rem", fontWeight: "700", marginBottom: "15px" }}>Trailer Transport</h4>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
                  Flatbeds, lowbeds, and specialized multi-axle trailers for over-dimensional (ODC) and heavy engineering goods.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — INDUSTRIES & WHY CHOOSE US */}
      <section 
        id="industries" 
        ref={industriesRef}
        style={{
          padding: "120px 0",
          background: "linear-gradient(180deg, #08101c 0%, var(--color-dark) 100%)"
        }}
      >
        <div className="container">
          <div className="row g-5">
            {/* Industries Served */}
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={industriesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <span style={{ color: "var(--color-accent)", fontWeight: "700", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "2px", display: "block", marginBottom: "10px" }}>SECTORS WE EMPOWER</span>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontFamily: "Syne, sans-serif", fontWeight: 800, color: "white", marginBottom: "30px" }}>Industries Served</h2>
                
                {/* 2x4 grid of industry cards */}
                <div className="row g-3">
                  {[
                    { name: "Steel Industry", icon: "fa-cubes" },
                    { name: "Manufacturing", icon: "fa-industry" },
                    { name: "Warehousing", icon: "fa-warehouse" },
                    { name: "Construction", icon: "fa-trowel-bricks" },
                    { name: "FMCG Products", icon: "fa-basket-shopping" },
                    { name: "Engineering Goods", icon: "fa-gears" },
                    { name: "Auto Components", icon: "fa-car-rear" },
                    { name: "Industrial Equip.", icon: "fa-toolbox" }
                  ].map((ind, i) => (
                    <div className="col-6" key={i}>
                      <div style={{
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        padding: "16px 20px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        transition: "all 0.3s ease"
                      }}
                      className="industry-tile"
                      >
                        <i className={`fa-solid ${ind.icon}`} style={{ color: "var(--color-accent)", fontSize: "1.1rem" }}></i>
                        <span style={{ fontSize: "0.95rem", fontWeight: "600" }}>{ind.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Why Choose Us & Advantages */}
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={industriesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span style={{ color: "var(--color-accent)", fontWeight: "700", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "2px", display: "block", marginBottom: "10px" }}>THE AL ARSH ADVANTAGE</span>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontFamily: "Syne, sans-serif", fontWeight: 800, color: "white", marginBottom: "30px" }}>Why Choose Us</h2>
                
                {/* 2x2 stats block */}
                <div className="row g-4 mb-4">
                  <div className="col-6">
                    <div className="advantage-card" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--glass-border)", padding: "20px", borderRadius: "14px", textAlign: "center" }}>
                      <StatCounter target="500" suffix="+" />
                      <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>Deliveries Completed</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="advantage-card" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--glass-border)", padding: "20px", borderRadius: "14px", textAlign: "center" }}>
                      <StatCounter target="100" suffix="+" />
                      <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>Business Clients</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="advantage-card" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--glass-border)", padding: "20px", borderRadius: "14px", textAlign: "center" }}>
                      <StatCounter target="100" suffix="%" />
                      <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>PAN India Coverage</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="advantage-card" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--glass-border)", padding: "20px", borderRadius: "14px", textAlign: "center" }}>
                      <StatCounter target="24" suffix="/7" />
                      <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>Customer Support</span>
                    </div>
                  </div>
                </div>

                {/* Bullets */}
                <div className="row g-2">
                  <div className="col-md-6" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem" }}>
                    <CheckCircle size={16} style={{ color: "var(--color-accent)" }} />
                    <span>Experienced Driver Team</span>
                  </div>
                  <div className="col-md-6" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem" }}>
                    <CheckCircle size={16} style={{ color: "var(--color-accent)" }} />
                    <span>Safe Cargo Handling</span>
                  </div>
                  <div className="col-md-6" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem" }}>
                    <CheckCircle size={16} style={{ color: "var(--color-accent)" }} />
                    <span>Real-Time Dispatch Updates</span>
                  </div>
                  <div className="col-md-6" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem" }}>
                    <CheckCircle size={16} style={{ color: "var(--color-accent)" }} />
                    <span>Competitive Freight Rates</span>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — CLIENT REVIEWS (Format from user screenshot, dark coloring) */}
      <section 
        style={{
          padding: "120px 0",
          background: "#08101c"
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <span style={{ color: "var(--color-accent)", fontWeight: "700", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "2px" }}>CLIENT REVIEWS</span>
            <h2 className="section-title" style={{ color: "white", fontSize: "clamp(2rem, 4vw, 2.8rem)", marginTop: "10px" }}>
              Trusted by Industry Leaders
            </h2>
            <div className="title-underline" style={{ background: "linear-gradient(90deg, var(--color-accent), transparent)" }}></div>
          </div>

          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: Math.min(displayReviews.length, 3) },
            }}
            style={{ paddingBottom: "50px" }}
          >
            {displayReviews.map((review, idx) => (
              <SwiperSlide key={review.id || idx}>
                <div 
                  className="glass-card" 
                  style={{ 
                    height: "100%", 
                    minHeight: "280px", 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "space-between",
                    borderTop: "4px solid var(--color-accent)",
                    padding: "30px"
                  }}
                >
                  <div>
                    <div className="mb-3" style={{ display: "flex", gap: "3px" }}>
                      {renderStars(review.rating)}
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.8)", fontStyle: "italic", fontSize: "0.95rem", lineHeight: "1.6" }}>
                      "{review.review_message}"
                    </p>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "15px", marginTop: "20px" }}>
                    <h6 style={{ color: "white", fontWeight: "700", margin: 0 }}>{review.customer_name}</h6>
                    {review.company_name && <span style={{ fontSize: "0.75rem", color: "var(--color-accent)" }}>{review.company_name}</span>}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* SECTION 8 — ASSOCIATED BRANDS */}
      <section 
        style={{
          padding: "50px 0",
          background: "#060e1a",
          borderTop: "1px solid rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.03)"
        }}
      >
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center", gap: "30px", opacity: 0.4 }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "800", color: "white", letterSpacing: "1px" }}>ASSOCIATED WITH LEADING BRANDS</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.3rem", fontWeight: "700" }}>
              <i className="fa-brands fa-aws"></i> AWS
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.3rem", fontWeight: "700" }}>
              <i className="fa-brands fa-dhl"></i> DHL Express
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.3rem", fontWeight: "700" }}>
              <i className="fa-brands fa-fedex"></i> FedEx
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.3rem", fontWeight: "700" }}>
              <i className="fa-brands fa-cpanel"></i> cPanel
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — CONTACT (Request a Freight Quote Form) */}
      <section 
        id="contact" 
        ref={contactRef}
        style={{
          padding: "120px 0",
          background: "radial-gradient(circle at 0% 100%, rgba(63, 175, 168, 0.08) 0%, transparent 60%), #060e1a",
          borderTop: "1px solid rgba(255,255,255,0.04)"
        }}
      >
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="text-center mb-5">
            <span style={{ color: "var(--color-accent)", fontWeight: "700", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "2px" }}>NEED TRANSPORTATION?</span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)", fontFamily: "Syne, sans-serif", fontWeight: 800, marginTop: "10px", color: "white" }}>Request a Freight Quote</h2>
            <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.95rem", marginTop: "10px" }}>
              Fill out the form below to receive a customized, competitive logistics quote directly on your WhatsApp.
            </p>
            <div className="title-underline" style={{ background: "linear-gradient(90deg, var(--color-accent), transparent)" }}></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass-card"
            style={{ padding: "40px" }}
          >
            <form onSubmit={handleWhatsAppQuoteSubmit} className="row g-4">
              {/* Company Name */}
              <div className="col-md-6">
                <label className="form-label" style={{ fontWeight: "600", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginBottom: "8px" }}>Company Name *</label>
                <input
                  type="text"
                  className="auth-input-field"
                  style={{ paddingLeft: "16px" }}
                  placeholder="Your Company Ltd"
                  value={quoteCompany}
                  onChange={(e) => setQuoteCompany(e.target.value)}
                  required
                />
              </div>

              {/* Contact Person */}
              <div className="col-md-6">
                <label className="form-label" style={{ fontWeight: "600", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginBottom: "8px" }}>Contact Person *</label>
                <input
                  type="text"
                  className="auth-input-field"
                  style={{ paddingLeft: "16px" }}
                  placeholder="John Doe"
                  value={quoteContact}
                  onChange={(e) => setQuoteContact(e.target.value)}
                  required
                />
              </div>

              {/* Mobile Number */}
              <div className="col-md-6">
                <label className="form-label" style={{ fontWeight: "600", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginBottom: "8px" }}>Mobile Number *</label>
                <input
                  type="tel"
                  className="auth-input-field"
                  style={{ paddingLeft: "16px" }}
                  placeholder="e.g. +91 6385328408"
                  value={quotePhone}
                  onChange={(e) => setQuotePhone(e.target.value)}
                  required
                />
              </div>

              {/* Email Address */}
              <div className="col-md-6">
                <label className="form-label" style={{ fontWeight: "600", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginBottom: "8px" }}>Email Address</label>
                <input
                  type="email"
                  className="auth-input-field"
                  style={{ paddingLeft: "16px" }}
                  placeholder="corporate@company.com"
                  value={quoteEmail}
                  onChange={(e) => setQuoteEmail(e.target.value)}
                />
              </div>

              {/* Pickup Location */}
              <div className="col-md-6">
                <label className="form-label" style={{ fontWeight: "600", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginBottom: "8px" }}>Pickup Location *</label>
                <input
                  type="text"
                  className="auth-input-field"
                  style={{ paddingLeft: "16px" }}
                  placeholder="City, State"
                  value={quotePickup}
                  onChange={(e) => setQuotePickup(e.target.value)}
                  required
                />
              </div>

              {/* Delivery Location */}
              <div className="col-md-6">
                <label className="form-label" style={{ fontWeight: "600", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginBottom: "8px" }}>Delivery Location *</label>
                <input
                  type="text"
                  className="auth-input-field"
                  style={{ paddingLeft: "16px" }}
                  placeholder="City, State"
                  value={quoteDelivery}
                  onChange={(e) => setQuoteDelivery(e.target.value)}
                  required
                />
              </div>

              {/* Monthly Load Requirement */}
              <div className="col-md-6">
                <label className="form-label" style={{ fontWeight: "600", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginBottom: "8px" }}>Monthly Load (Approx)</label>
                <select
                  className="auth-input-field"
                  style={{ padding: "14px 16px", background: "#0a1628" }}
                  value={quoteLoad}
                  onChange={(e) => setQuoteLoad(e.target.value)}
                >
                  <option value="">Select Load Volume</option>
                  <option value="Under 50 Tons">Under 50 Tons</option>
                  <option value="50-100 Tons">50 - 100 Tons</option>
                  <option value="100-500 Tons">100 - 500 Tons</option>
                  <option value="Over 500 Tons">Over 500 Tons</option>
                </select>
              </div>

              {/* Product Type / Commodity */}
              <div className="col-md-6">
                <label className="form-label" style={{ fontWeight: "600", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginBottom: "8px" }}>Product Type / Commodity *</label>
                <input
                  type="text"
                  className="auth-input-field"
                  style={{ paddingLeft: "16px" }}
                  placeholder="e.g. Steel Pipes, Machinery, FMCG"
                  value={quoteProduct}
                  onChange={(e) => setQuoteProduct(e.target.value)}
                  required
                />
              </div>

              {/* Additional Requirements / Message */}
              <div className="col-12">
                <label className="form-label" style={{ fontWeight: "600", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginBottom: "8px" }}>Additional Requirements / Message</label>
                <textarea
                  className="auth-input-field"
                  style={{ paddingLeft: "16px", height: "100px", resize: "none" }}
                  placeholder="Vehicle type needed, weight details, special handling, etc."
                  value={quoteMessage}
                  onChange={(e) => setQuoteMessage(e.target.value)}
                />
              </div>

              {/* Submit */}
              <div className="col-12 text-center" style={{ marginTop: "30px" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    padding: "16px 48px",
                    borderRadius: "12px",
                    background: "#25D366", // WhatsApp Green
                    borderColor: "#25D366",
                    color: "white",
                    fontWeight: "700",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "1.05rem",
                    boxShadow: "0 10px 20px rgba(37, 211, 102, 0.25)"
                  }}
                >
                  <i className="fa-brands fa-whatsapp" style={{ fontSize: "1.4rem" }}></i> Send Request via WhatsApp
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* SECTION 10 — FAQ SECTION */}
      <section 
        style={{
          padding: "120px 20px",
          background: "#060d19",
          borderTop: "1px solid rgba(255,255,255,0.03)"
        }}
      >
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="text-center mb-5">
            <span style={{ color: "var(--color-accent)", fontWeight: "700", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "2px" }}>QUESTIONS & ANSWERS</span>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)", fontFamily: "Syne, sans-serif", fontWeight: 800, marginTop: "10px", color: "white" }}>Frequently Asked Questions</h2>
            <div className="title-underline" style={{ background: "linear-gradient(90deg, var(--color-accent), transparent)" }}></div>
          </div>

          <div>
            <FAQItem 
              question="Do you provide Pan-India transportation?" 
              answer="Yes, we cover all major routes, industrial zones, manufacturing hubs, and remote locations across India with our extensive truck and trailer fleet network."
            />
            <FAQItem 
              question="How can I track my shipment?" 
              answer="Our dedicated customer support team provides regular, real-time tracking updates throughout the transit. Registered partners can also log in to access the tracking simulator platform."
            />
            <FAQItem 
              question="Do you handle heavy industrial machinery?" 
              answer="Absolutely. We specialize in trailer transportation, flatbeds, and multi-axle heavy trailers designed for over-dimensional cargo (ODC), engineering goods, and steel pipes."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer 
        style={{
          background: "#040912",
          padding: "80px 20px 40px 20px",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)"
        }}
      >
        <div className="container">
          <div className="row g-4 mb-5">
            {/* Logo and Brand desc */}
            <div className="col-lg-3 col-md-6">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <img src="/logo.png" alt="AL ARSH Logo" style={{ height: "42px", width: "42px", borderRadius: "50%", backgroundColor: "#ffffff", objectFit: "cover" }} />
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "24px" }}>
                Safe, Timely, and Cost-Effective Freight Solutions for Businesses Across India. Your trusted logistics partner.
              </p>
              {/* Social links */}
              <div style={{ display: "flex", gap: "12px" }}>
                <a href="#hero" className="topbar-socials" style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#hero" className="topbar-socials" style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}><i className="fa-brands fa-twitter"></i></a>
                <a href="#hero" className="topbar-socials" style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="#hero" className="topbar-socials" style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}><i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-3 col-md-6">
              <h5 style={{ color: "white", fontWeight: "700", fontSize: "1.05rem", marginBottom: "20px" }}>QUICK LINKS</h5>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                <li><a href="#hero" onClick={(e) => { e.preventDefault(); document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "rgba(255,255,255,0.6)" }}>Home</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "rgba(255,255,255,0.6)" }}>About Us</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "rgba(255,255,255,0.6)" }}>Our Services</a></li>
                <li><a href="#industries" onClick={(e) => { e.preventDefault(); document.getElementById("industries")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "rgba(255,255,255,0.6)" }}>Industries Served</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "rgba(255,255,255,0.6)" }}>Request Quote</a></li>
              </ul>
            </div>

            {/* Our Services */}
            <div className="col-lg-3 col-md-6">
              <h5 style={{ color: "white", fontWeight: "700", fontSize: "1.05rem", marginBottom: "20px" }}>OUR SERVICES</h5>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "rgba(255,255,255,0.6)" }}>Full Truck Load (FTL)</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "rgba(255,255,255,0.6)" }}>Part Truck Load (PTL)</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "rgba(255,255,255,0.6)" }}>Trailer Transportation</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "rgba(255,255,255,0.6)" }}>Industrial Cargo</a></li>
                <li><a href="#hero" onClick={(e) => { e.preventDefault(); document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }); }} style={{ color: "rgba(255,255,255,0.6)" }}>Dedicated Fleet</a></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="col-lg-3 col-md-6">
              <h5 style={{ color: "white", fontWeight: "700", fontSize: "1.05rem", marginBottom: "20px" }}>CONTACT DETAILS</h5>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <MapPin size={18} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>186B lg 1 mndha mathur 3rd main road Chennai - 600068</span>
                </li>
                <li style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <Phone size={18} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
                  <a href="tel:+916385328408" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>+91 6385328408</a>
                </li>
                <li style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <Mail size={18} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
                  <a href="mailto:alarshfrightcarrier@gmail.com" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>alarshfrightcarrier@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "30px", textAlign: "center", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
            © 2026 Al Arsh Freight Carriers. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons (WhatsApp & Call) on right edge */}
      {showFloating && (
        <div style={{ position: "fixed", right: "24px", bottom: "24px", zIndex: 9999, display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Call Floating action */}
          <a
            href="tel:+916385328408"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#0B3B6E",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(11, 59, 110, 0.4)",
              transition: "transform 0.3s ease",
              textDecoration: "none"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <Phone size={24} />
          </a>
          
          {/* WhatsApp Floating action */}
          <a
            href="https://wa.me/916385328408"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#25D366",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(37, 211, 102, 0.4)",
              transition: "transform 0.3s ease",
              textDecoration: "none"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <MessageSquare size={24} />
          </a>
        </div>
      )}

    </div>
    </>
  );
}
