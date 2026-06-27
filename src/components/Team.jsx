export default function Team() {
  const teamMembers = [
    {
      name: "David Johnson",
      position: "CEO & Founder",
      bio: "20+ years of logistics industry experience",
      avatar: "https://i.pravatar.cc/400?img=12",
    },
    {
      name: "Sarah Williams",
      position: "Operations Director",
      bio: "Expert in supply chain optimization",
      avatar: "https://i.pravatar.cc/400?img=25",
    },
    {
      name: "Michael Chen",
      position: "Technology Officer",
      bio: "Innovator in logistics technology",
      avatar: "https://i.pravatar.cc/400?img=33",
    },
    {
      name: "Emily Rodriguez",
      position: "Customer Success Manager",
      bio: "Dedicated to client satisfaction",
      avatar: "https://i.pravatar.cc/400?img=42",
    },
    {
      name: "James Wilson",
      position: "Finance Director",
      bio: "Financial planning & analysis expert",
      avatar: "https://i.pravatar.cc/400?img=51",
    },
    {
      name: "Priya Patel",
      position: "Marketing Manager",
      bio: "Brand strategy and growth specialist",
      avatar: "https://i.pravatar.cc/400?img=60",
    },
    {
      name: "Robert Martinez",
      position: "Logistics Manager",
      bio: "15+ years in freight management",
      avatar: "https://i.pravatar.cc/400?img=68",
    },
    {
      name: "Lisa Thompson",
      position: "HR Manager",
      bio: "Building exceptional teams",
      avatar: "https://i.pravatar.cc/400?img=75",
    },
  ];

  return (
    <section className="py-5">
      <div className="container">
        <div className="section-header text-center mb-5" data-aos="fade-up">
          <h2 className="section-title">Leadership Team</h2>
          <p className="section-subtitle">
            Experienced professionals dedicated to your success
          </p>
          <div className="title-underline"></div>
        </div>
        <div className="row g-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-6"
              data-aos="fade-up"
              data-aos-delay={`${(index + 1) * 100}`}
            >
              <div className="team-card">
                <div className="team-image">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="img-fluid"
                  />
                  <div className="team-overlay">
                    <div className="team-social">
                      <a href="#">
                        <i className="fab fa-facebook"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="team-content text-center">
                  <h5 className="team-name">{member.name}</h5>
                  <p className="team-position">{member.position}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
