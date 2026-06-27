export default function PageHeader({ title, subtitle }) {
  return (
    <section
      className="page-header"
      style={{
        background: `linear-gradient(135deg, rgba(29, 55, 99, 0.85), rgba(95, 174, 173, 0.85)), url('https://images.unsplash.com/photo-1519003722824-192d992a6058?w=1200&q=80') center/cover`,
      }}
    >
      <div className="container">
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>
    </section>
  );
}
