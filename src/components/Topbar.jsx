export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar-contact">
        <a href="tel:+916385328408">
          <i className="fas fa-phone"></i> +91 6385328408
        </a>
        <a href="mailto:alarshfrightcarrier@gmail.com">
          <i className="fas fa-envelope"></i> alarshfrightcarrier@gmail.com
        </a>
      </div>
      <div className="topbar-socials">
        <a href="#" title="Facebook">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" title="Twitter">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" title="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" title="LinkedIn">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
}
