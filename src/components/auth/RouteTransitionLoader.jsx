import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Renders a thin, animated teal loading bar at the top of the viewport
 * whenever a route transition occurs, providing a premium SPA navigation feeling.
 */
export default function RouteTransitionLoader() {
  const location = useLocation();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 800); // Animates for 800ms during transitions

    return () => clearTimeout(timer);
  }, [location]);

  if (!animating) return null;

  return <div className="route-loader-bar" />;
}
