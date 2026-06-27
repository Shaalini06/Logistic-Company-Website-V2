import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, Camera, CheckCircle, AlertCircle } from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function FeedbackPage() {
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name || "");
  const [companyName, setCompanyName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { type: 'success' | 'error', message }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setSubmitStatus({ type: "error", message: "Photo must be less than 2MB." });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhoto(reader.result);
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setSubmitStatus({ type: "error", message: "Please enter your name." });
      return;
    }
    if (rating === 0) {
      setSubmitStatus({ type: "error", message: "Please select a rating." });
      return;
    }
    if (!reviewMessage.trim()) {
      setSubmitStatus({ type: "error", message: "Please write your review." });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const token = localStorage.getItem("alarsh_token");
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerName: customerName.trim(),
          companyName: companyName.trim() || null,
          rating,
          reviewTitle: reviewTitle.trim() || null,
          reviewMessage: reviewMessage.trim(),
          profilePhoto: profilePhoto || null,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitStatus({ type: "success", message: data.message || "Feedback submitted successfully!" });
        // Reset form
        setCompanyName("");
        setRating(0);
        setReviewTitle("");
        setReviewMessage("");
        setProfilePhoto(null);
        setPhotoPreview(null);
      } else {
        setSubmitStatus({ type: "error", message: data.error || "Failed to submit feedback." });
      }
    } catch (err) {
      setSubmitStatus({ type: "error", message: "Server unavailable. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styles
  const cardStyle = {
    background: "rgba(11, 59, 110, 0.25)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(63, 175, 168, 0.15)",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "720px",
    margin: "0 auto",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(8, 16, 28, 0.7)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "10px",
    color: "white",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  const labelStyle = {
    fontSize: "0.85rem",
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "600",
    marginBottom: "8px",
    display: "block",
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #0a1628 0%, #0B3B6E 50%, #0a1628 100%)", padding: "40px 20px" }}>
      <div className="container">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: "40px" }}
        >
          <span style={{ color: "var(--color-accent, #3FAFA8)", fontWeight: "700", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "2px" }}>
            YOUR VOICE MATTERS
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontFamily: "Syne, sans-serif", fontWeight: 800, color: "white", marginTop: "8px" }}>
            Share Your Feedback
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", maxWidth: "500px", margin: "10px auto 0" }}>
            Help us improve our services. Your feedback is reviewed and may be featured on our website.
          </p>
        </motion.div>

        {/* Feedback Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={cardStyle}
        >
          {/* Status Messages */}
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: submitStatus.type === "success" ? "rgba(63, 175, 168, 0.15)" : "rgba(239, 68, 68, 0.15)",
                border: `1px solid ${submitStatus.type === "success" ? "#3FAFA8" : "#ef4444"}`,
                color: submitStatus.type === "success" ? "#bbf7f4" : "#fca5a5",
                padding: "14px 18px",
                borderRadius: "12px",
                marginBottom: "24px",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {submitStatus.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              {submitStatus.message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* Full Name */}
              <div className="col-md-6">
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  style={inputStyle}
                  placeholder="Your full name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              {/* Company Name */}
              <div className="col-md-6">
                <label style={labelStyle}>Company Name</label>
                <input
                  type="text"
                  style={inputStyle}
                  placeholder="Your company"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              {/* Star Rating */}
              <div className="col-12">
                <label style={labelStyle}>Rating *</label>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "4px",
                        outline: "none",
                      }}
                    >
                      <Star
                        size={32}
                        fill={(hoverRating || rating) >= star ? "#3FAFA8" : "transparent"}
                        stroke={(hoverRating || rating) >= star ? "#3FAFA8" : "rgba(255,255,255,0.3)"}
                        strokeWidth={1.5}
                      />
                    </motion.button>
                  ))}
                  {rating > 0 && (
                    <span style={{ marginLeft: "12px", color: "#3FAFA8", fontWeight: "700", fontSize: "0.95rem" }}>
                      {rating}/5
                    </span>
                  )}
                </div>
              </div>

              {/* Review Title */}
              <div className="col-12">
                <label style={labelStyle}>Review Title</label>
                <input
                  type="text"
                  style={inputStyle}
                  placeholder="Summarize your experience in a few words"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                />
              </div>

              {/* Review Message */}
              <div className="col-12">
                <label style={labelStyle}>Review Message *</label>
                <textarea
                  style={{ ...inputStyle, height: "130px", resize: "none" }}
                  placeholder="Tell us about your experience with Al Arsh Freight Carriers..."
                  value={reviewMessage}
                  onChange={(e) => setReviewMessage(e.target.value)}
                  required
                />
              </div>

              {/* Profile Photo */}
              <div className="col-12">
                <label style={labelStyle}>Profile Photo (Optional)</label>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  {/* Photo Preview */}
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      background: photoPreview ? `url(${photoPreview}) center/cover no-repeat` : "rgba(255,255,255,0.05)",
                      border: "2px dashed rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      overflow: "hidden",
                    }}
                  >
                    {!photoPreview && <Camera size={24} style={{ color: "rgba(255,255,255,0.3)" }} />}
                  </div>
                  <div>
                    <label
                      htmlFor="profile-photo-input"
                      style={{
                        display: "inline-block",
                        padding: "10px 20px",
                        background: "rgba(63, 175, 168, 0.1)",
                        border: "1px solid rgba(63, 175, 168, 0.3)",
                        borderRadius: "10px",
                        color: "#3FAFA8",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Camera size={14} style={{ marginRight: "6px", display: "inline-block", verticalAlign: "middle" }} />
                      Choose Photo
                    </label>
                    <input
                      id="profile-photo-input"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      style={{ display: "none" }}
                    />
                    <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
                      Max 2MB • JPG, PNG, WebP
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-12" style={{ marginTop: "16px" }}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: isSubmitting
                      ? "rgba(63, 175, 168, 0.3)"
                      : "linear-gradient(135deg, #0B3B6E, #3FAFA8)",
                    border: "none",
                    borderRadius: "12px",
                    color: "white",
                    fontWeight: "700",
                    fontSize: "1.05rem",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    boxShadow: "0 8px 25px rgba(63, 175, 168, 0.2)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ width: "20px", height: "20px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%" }}
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Submit Feedback
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
