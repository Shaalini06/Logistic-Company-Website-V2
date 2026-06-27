import { useEffect } from "react";

export default function Preloader() {
  useEffect(() => {
    const preloader = document.getElementById("preloader");
    const handleLoad = () => {
      if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.pointerEvents = "none";
        setTimeout(() => {
          preloader.style.display = "none";
        }, 300);
      }
    };

    window.addEventListener("load", handleLoad);
    const timer = setTimeout(handleLoad, 1500);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div id="preloader" className="preloader">
      <div className="spinner">
        <div className="cube-spinner"></div>
      </div>
    </div>
  );
}
