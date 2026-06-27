import { useEffect } from "react";
import GLightbox from "glightbox";

export default function Gallery() {
  useEffect(() => {
    const lightbox = new GLightbox({
      selector: ".gallery-item",
    });
    return () => lightbox.destroy();
  }, []);

  const galleryItems = [
    {
      image:
        "https://images.unsplash.com/photo-1553531088-b29f2fe46f67?w=400&q=80",
      title: "Warehouse Operations",
    },
    {
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80",
      title: "Logistics Center",
    },
    {
      image:
        "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&q=80",
      title: "Fleet Management",
    },
    {
      image:
        "https://images.unsplash.com/photo-1586528116039-c48733686ece?w=400&q=80",
      title: "Distribution",
    },
    {
      image:
        "https://images.unsplash.com/photo-1578406077619-9df6a63fbb47?w=400&q=80",
      title: "Transportation",
    },
    {
      image:
        "https://images.unsplash.com/photo-1553531086-d1c3201371e7?w=400&q=80",
      title: "Reliable Shipping",
    },
  ];

  return (
    <section className="gallery-section py-5">
      <div className="container">
        <div className="section-header text-center mb-5" data-aos="fade-up">
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">Explore our operations</p>
          <div className="title-underline"></div>
        </div>
        <div className="row g-4">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6"
              data-aos="zoom-in"
              data-aos-delay={`${(index + 1) * 100}`}
            >
              <div className="gallery-item-wrapper">
                <a href={item.image} className="gallery-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid rounded-3"
                  />
                  <div className="gallery-overlay">
                    <i className="fas fa-search-plus"></i>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
