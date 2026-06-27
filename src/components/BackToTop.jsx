import { useEffect } from "react";

export default function BackToTop() {
  useEffect(() => {
    const btn = document.getElementById("backToTop");

    const handleScroll = () => {
      if (window.scrollY > 100) {
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
      } else {
        btn.style.opacity = "0";
        btn.style.pointerEvents = "none";
      }
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", handleScroll);
    btn.addEventListener("click", scrollToTop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      btn.removeEventListener("click", scrollToTop);
    };
  }, []);

  return (
    <button id="backToTop" className="back-to-top" aria-label="Back to top">
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}
