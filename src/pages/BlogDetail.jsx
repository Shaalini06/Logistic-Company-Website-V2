import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import PageHeader from "../components/PageHeader";

export default function BlogDetail() {
  const { id } = useParams();

  useEffect(() => {
    AOS.init();
  }, []);

  const blogData = {
    title: "Top 5 Logistics Trends in 2024",
    date: "June 1, 2024",
    author: "John Smith",
    category: "Trends",
    image:
      "https://images.unsplash.com/photo-1553531088-b29f2fe46f67?w=800&q=80",
    content: `
      <h3>Introduction</h3>
      <p>The logistics industry is evolving rapidly with new technologies and trends emerging every year. Let's explore the top 5 trends that are reshaping the logistics landscape in 2024.</p>
      
      <h3>1. AI-Powered Optimization</h3>
      <p>Artificial Intelligence is revolutionizing logistics operations by optimizing routes, predicting demand, and automating warehouse operations. Companies like AL ARSH FREIGHT CARRIER are investing heavily in AI to improve efficiency and reduce costs.</p>
      
      <h3>2. Sustainable Shipping Solutions</h3>
      <p>Environmental concerns are driving the adoption of eco-friendly shipping methods. Electric vehicles, carbon-neutral shipping, and green logistics are becoming industry standards.</p>
      
      <h3>3. Real-Time Visibility</h3>
      <p>Advanced tracking technology provides complete visibility of shipments throughout their journey. This transparency builds customer trust and enables better decision-making.</p>
      
      <h3>4. Automation in Warehouses</h3>
      <p>Robotic process automation is transforming warehouse operations, reducing errors and increasing productivity. Autonomous systems are now handling routine tasks efficiently.</p>
      
      <h3>5. Supply Chain Resilience</h3>
      <p>Following global disruptions, companies are focusing on building resilient supply chains with multiple suppliers and contingency plans.</p>
      
      <h3>Conclusion</h3>
      <p>These trends are shaping the future of logistics. At AL ARSH FREIGHT CARRIER, we're committed to staying ahead of these developments to provide our clients with cutting-edge solutions.</p>
    `,
  };

  return (
    <>
      <PageHeader
        title={blogData.title}
        subtitle={`${blogData.category} • ${blogData.date}`}
      />
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8" data-aos="fade-up">
              <article className="blog-article">
                <img
                  src={blogData.image}
                  alt={blogData.title}
                  className="img-fluid rounded-3 mb-4"
                />
                <div className="article-meta mb-4">
                  <span className="article-author">
                    <i className="fas fa-user"></i> {blogData.author}
                  </span>
                  <span className="article-date">
                    <i className="fas fa-calendar"></i> {blogData.date}
                  </span>
                  <span className="article-category">
                    <i className="fas fa-tag"></i> {blogData.category}
                  </span>
                </div>
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: blogData.content }}
                ></div>
              </article>
            </div>
            <div className="col-lg-4" data-aos="fade-left">
              <div className="sidebar">
                <div className="sidebar-widget">
                  <h5 className="widget-title">Recent Posts</h5>
                  <ul className="recent-posts">
                    <li>
                      <Link to="/main/blog/1">Top 5 Logistics Trends in 2024</Link>
                    </li>
                    <li>
                      <Link to="/main/blog/2">How Real-Time Tracking Saves Money</Link>
                    </li>
                    <li>
                      <Link to="/main/blog/3">
                        Sustainable Logistics: The Future is Green
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
