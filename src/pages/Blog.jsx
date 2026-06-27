import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import PageHeader from "../components/PageHeader";

export default function BlogPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "Top 5 Logistics Trends in 2024",
      excerpt:
        "Discover the latest trends transforming the logistics industry and how AL ARSH FREIGHT CARRIER is leading the way...",
      image:
        "https://images.unsplash.com/photo-1553531088-b29f2fe46f67?w=400&q=80",
      date: "June 1, 2024",
      category: "Trends",
    },
    {
      id: 2,
      title: "How Real-Time Tracking Saves Money",
      excerpt:
        "Learn how advanced tracking technology helps businesses reduce costs and improve efficiency...",
      image:
        "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=400&q=80",
      date: "May 28, 2024",
      category: "Technology",
    },
    {
      id: 3,
      title: "Sustainable Logistics: The Future is Green",
      excerpt:
        "Explore how AL ARSH FREIGHT CARRIER is committed to eco-friendly shipping solutions and sustainability...",
      image:
        "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&q=80",
      date: "May 20, 2024",
      category: "Sustainability",
    },
    {
      id: 4,
      title: "Global Supply Chain Optimization",
      excerpt:
        "Strategies to optimize your supply chain and improve profitability with AL ARSH FREIGHT CARRIER...",
      image:
        "https://images.unsplash.com/photo-1586528116039-c48733686ece?w=400&q=80",
      date: "May 15, 2024",
      category: "Logistics",
    },
    {
      id: 5,
      title: "International Shipping Made Easy",
      excerpt:
        "Navigate the complexities of international shipping with our comprehensive guide...",
      image:
        "https://images.unsplash.com/photo-1578406077619-9df6a63fbb47?w=400&q=80",
      date: "May 10, 2024",
      category: "Shipping",
    },
    {
      id: 6,
      title: "Success Story: How a Small Business Grew with AL ARSH FREIGHT CARRIER",
      excerpt:
        "Read how one e-commerce business scaled with AL ARSH FREIGHT CARRIER's reliable logistics solutions...",
      image:
        "https://images.unsplash.com/photo-1553531086-d1c3201371e7?w=400&q=80",
      date: "May 5, 2024",
      category: "Case Study",
    },
  ];

  return (
    <>
      <PageHeader
        title="Blog"
        subtitle="Latest insights from the logistics industry"
      />
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
              >
                <div className="blog-card">
                  <div className="blog-image">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="img-fluid rounded-3"
                    />
                    <span className="blog-category">{post.category}</span>
                  </div>
                  <div className="blog-content">
                    <p className="blog-date">
                      <i className="fas fa-calendar"></i> {post.date}
                    </p>
                    <h5 className="blog-title">{post.title}</h5>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <Link to={`/main/blog/${post.id}`} className="read-more">
                      Read More <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
