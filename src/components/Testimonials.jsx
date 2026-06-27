import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

export default function Testimonials() {
  const testimonials = [
    {
      rating: 5,
      text: "AL ARSH FREIGHT CARRIER has been an invaluable partner for our logistics needs. Their professional team and reliable service have helped us grow our business.",
      author: "John Smith",
      title: "CEO, Tech Solutions Inc.",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      rating: 5,
      text: "Excellent service from start to finish. The real-time tracking feature gives us complete peace of mind. Highly recommended!",
      author: "Sarah Johnson",
      title: "Founder, E-commerce Plus",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      rating: 5,
      text: "Outstanding customer support and competitive pricing. AL ARSH FREIGHT CARRIER has streamlined our supply chain operations significantly.",
      author: "Michael Brown",
      title: "Supply Chain Manager, Logistics & Trade",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ];

  return (
    <section className="testimonials-section py-5">
      <div className="container">
        <div className="section-header text-center mb-5" data-aos="fade-up">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">Trusted by businesses nationwide</p>
          <div className="title-underline"></div>
        </div>
        <div data-aos="fade-up">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            className="testimonialSlider"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-card">
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="author-avatar"
                    />
                    <div>
                      <h5 className="author-name">{testimonial.author}</h5>
                      <p className="author-title">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
