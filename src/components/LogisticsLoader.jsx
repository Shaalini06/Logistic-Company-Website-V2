import { useEffect, useState, useRef } from "react";
import "./LogisticsLoader.css";

export default function LogisticsLoader() {
  const [hidden, setHidden] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay with sound was prevented, user will click play:", error);
      });
    }
  }, []);

  const handleVideoEnded = () => {
    setHidden(true);
  };

  const handleSkip = () => {
    setHidden(true);
  };

  return (
    <div className={`logistics-loader-container ${hidden ? "hidden" : ""}`}>
      {/* Intro Brand Header */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <img 
          src="/logo.png" 
          alt="AL ARSH Logo" 
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            objectFit: "cover",
            boxShadow: "0 4px 15px rgba(255, 255, 255, 0.15)"
          }}
        />
        <h4 style={{ color: "white", margin: 0, fontFamily: "Syne, sans-serif", fontWeight: 700, letterSpacing: "3px", fontSize: "1.2rem" }}>AL ARSH FREIGHT CARRIER</h4>
      </div>

      {/* Video Container Card */}
      <div style={{
        position: "relative",
        width: "90%",
        maxWidth: "760px",
        background: "rgba(255, 255, 255, 0.03)",
        borderRadius: "20px",
        padding: "12px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px"
      }}>
        <video
          ref={videoRef}
          src="/ARSH INTRO.mp4"
          autoPlay
          playsInline
          onEnded={handleVideoEnded}
          style={{
            width: "100%",
            borderRadius: "14px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
            aspectRatio: "16/9",
            objectFit: "cover",
            background: "#000"
          }}
          controls
        />
        
        <button 
          onClick={handleSkip}
          style={{
            background: "linear-gradient(135deg, #1D3763, #2F5B8F)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "8px 20px",
            borderRadius: "10px",
            fontSize: "0.9rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(47, 91, 143, 0.25)",
            letterSpacing: "0.5px"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "linear-gradient(135deg, #2F5B8F, #5FAEAD)";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "linear-gradient(135deg, #1D3763, #2F5B8F)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Skip Intro & Enter Site
        </button>
      </div>
    </div>
  );
}
