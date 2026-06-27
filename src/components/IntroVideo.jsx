import { useEffect, useState, useRef, useCallback } from "react";
import "./IntroVideo.css";

export default function IntroVideo({ onComplete }) {
  const [phase, setPhase] = useState("playing"); // "playing" | "transitioning" | "done"
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Attempt autoplay with sound; browsers may block this
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try playing with sound (muted=false is default in JSX)
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay with sound blocked — try muted autoplay as fallback,
        // then unmute after a user gesture
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, []);

  const startTransition = useCallback(() => {
    if (phase !== "playing") return;
    setPhase("transitioning");

    // After the CSS transition completes, signal parent
    setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, 1200); // matches CSS transition duration
  }, [phase, onComplete]);

  const handleVideoEnded = () => {
    startTransition();
  };

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    startTransition();
  };

  if (phase === "done") return null;

  return (
    <div
      ref={containerRef}
      className={`intro-video-overlay ${phase === "transitioning" ? "intro-video-exit" : ""}`}
    >
      {/* Full-screen video */}
      <video
        ref={videoRef}
        className="intro-video-player"
        src="/ARSH INTRO.mp4"
        autoPlay
        playsInline
        onEnded={handleVideoEnded}
      />

      {/* Subtle vignette overlay for cinematic feel */}
      <div className="intro-video-vignette" />

      {/* Skip button — bottom right, subtle */}
      <button
        className="intro-video-skip"
        onClick={handleSkip}
        type="button"
      >
        <span className="skip-text">Skip Intro</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="13 17 18 12 13 7" />
          <polyline points="6 17 11 12 6 7" />
        </svg>
      </button>

      {/* Progress bar at bottom */}
      <div className="intro-video-progress">
        <div className="intro-video-progress-bar" />
      </div>
    </div>
  );
}
