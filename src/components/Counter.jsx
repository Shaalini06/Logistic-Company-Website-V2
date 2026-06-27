import { useEffect } from "react";

export default function Counter() {
  useEffect(() => {
    const counters = document.querySelectorAll(".counter-number");

    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      let current = 0;
      const increment = target / 50;

      const updateCount = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target.toLocaleString() + "+";
        }
      };

      updateCount();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((counter) => observer.observe(counter));

    return () => {
      counters.forEach((counter) => observer.unobserve(counter));
    };
  }, []);

  const stats = [
    { number: "50000", label: "Shipments Delivered", delay: "0" },
    { number: "2500", label: "Active Clients", delay: "100" },
    { number: "150", label: "Countries Served", delay: "200" },
    { number: "99", label: "On-Time Delivery %", delay: "300" },
  ];

  return (
    <section id="stats" className="section">
      <div className="stats-inner">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-card"
            data-aos="fade-up"
            data-aos-delay={stat.delay}
          >
            <h3 className="counter-number" data-target={stat.number}>
              0
            </h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
