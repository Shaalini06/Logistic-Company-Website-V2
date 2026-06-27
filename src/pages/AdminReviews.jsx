import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Check, X, Trash2, AlertCircle, Shield, RefreshCw } from "lucide-react";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // review id being acted on
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // review id pending delete

  const token = localStorage.getItem("alarsh_token");

  const fetchReviews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/admin/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setReviews(data.reviews);
      } else {
        setError(data.error || "Failed to fetch reviews.");
      }
    } catch (err) {
      setError("Server unavailable. Please ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleAction = async (id, action) => {
    setActionLoading(id);
    try {
      let url = "";
      let method = "PUT";

      if (action === "approve") url = `http://localhost:5000/api/admin/reviews/${id}/approve`;
      else if (action === "reject") url = `http://localhost:5000/api/admin/reviews/${id}/reject`;
      else if (action === "delete") {
        url = `http://localhost:5000/api/admin/reviews/${id}`;
        method = "DELETE";
      }

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (response.ok && data.success) {
        showToast(data.message || `Review ${action}d successfully.`);
        fetchReviews();
      } else {
        showToast(data.error || `Failed to ${action} review.`, "error");
      }
    } catch (err) {
      showToast(`Failed to ${action} review. Server error.`, "error");
    } finally {
      setActionLoading(null);
      setDeleteConfirm(null);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: { bg: "rgba(234, 179, 8, 0.15)", color: "#eab308", border: "rgba(234, 179, 8, 0.3)" },
      Approved: { bg: "rgba(34, 197, 94, 0.15)", color: "#22c55e", border: "rgba(34, 197, 94, 0.3)" },
      Rejected: { bg: "rgba(239, 68, 68, 0.15)", color: "#ef4444", border: "rgba(239, 68, 68, 0.3)" },
    };
    const s = styles[status] || styles.Pending;
    return (
      <span style={{
        display: "inline-block",
        padding: "4px 14px",
        borderRadius: "20px",
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        fontSize: "0.75rem",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}>
        {status}
      </span>
    );
  };

  const renderStars = (count) => (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          fill={s <= count ? "#3FAFA8" : "transparent"}
          stroke={s <= count ? "#3FAFA8" : "rgba(255,255,255,0.2)"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #0a1628 0%, #0B3B6E 50%, #0a1628 100%)", padding: "40px 20px" }}>
      <div className="container">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
              <Shield size={22} style={{ color: "#3FAFA8" }} />
              <span style={{ color: "#3FAFA8", fontWeight: "700", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "2px" }}>
                ADMIN PANEL
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontFamily: "Syne, sans-serif", fontWeight: 800, color: "white", margin: 0 }}>
              Reviews Management
            </h2>
          </div>
          <button
            onClick={fetchReviews}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 20px", background: "rgba(63, 175, 168, 0.1)",
              border: "1px solid rgba(63, 175, 168, 0.3)", borderRadius: "10px",
              color: "#3FAFA8", fontWeight: "600", fontSize: "0.85rem", cursor: "pointer",
            }}
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </motion.div>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: "fixed", top: "24px", right: "24px", zIndex: 9999,
                padding: "14px 24px", borderRadius: "12px",
                background: toast.type === "success" ? "rgba(34, 197, 94, 0.9)" : "rgba(239, 68, 68, 0.9)",
                color: "white", fontWeight: "600", fontSize: "0.9rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                display: "flex", alignItems: "center", gap: "8px",
              }}
            >
              {toast.type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ width: "40px", height: "40px", border: "3px solid rgba(255,255,255,0.1)", borderTopColor: "#3FAFA8", borderRadius: "50%", margin: "0 auto 16px" }}
            />
            <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading reviews...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "16px", maxWidth: "500px", margin: "0 auto",
          }}>
            <AlertCircle size={40} style={{ color: "#ef4444", marginBottom: "12px" }} />
            <p style={{ color: "#fca5a5", fontSize: "1rem" }}>{error}</p>
            <button onClick={fetchReviews} style={{ marginTop: "12px", padding: "8px 20px", background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: "8px", color: "#fca5a5", cursor: "pointer", fontWeight: "600" }}>
              Retry
            </button>
          </div>
        )}

        {/* Reviews Table */}
        {!isLoading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {reviews.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "80px 20px",
                background: "rgba(11, 59, 110, 0.2)", border: "1px solid rgba(63, 175, 168, 0.1)",
                borderRadius: "20px",
              }}>
                <Star size={48} style={{ color: "rgba(255,255,255,0.15)", marginBottom: "16px" }} />
                <h4 style={{ color: "rgba(255,255,255,0.5)", fontWeight: "600" }}>No Reviews Yet</h4>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>Reviews submitted by users will appear here.</p>
              </div>
            ) : (
              <div style={{
                background: "rgba(11, 59, 110, 0.25)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(63, 175, 168, 0.15)",
                borderRadius: "20px",
                overflow: "hidden",
              }}>
                {/* Table header */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 0.8fr 2fr 0.8fr 0.8fr 1.2fr",
                  gap: "12px",
                  padding: "16px 24px",
                  background: "rgba(0,0,0,0.2)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}>
                  <span>Customer</span>
                  <span>Company</span>
                  <span>Rating</span>
                  <span>Review</span>
                  <span>Date</span>
                  <span>Status</span>
                  <span style={{ textAlign: "center" }}>Actions</span>
                </div>

                {/* Table rows */}
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.2fr 1fr 0.8fr 2fr 0.8fr 0.8fr 1.2fr",
                      gap: "12px",
                      padding: "18px 24px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      alignItems: "center",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    {/* Customer Name */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {review.profile_photo ? (
                        <img src={review.profile_photo} alt="" style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(63,175,168,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#3FAFA8", fontWeight: "700", fontSize: "0.75rem", flexShrink: 0 }}>
                          {review.customer_name?.charAt(0)?.toUpperCase()}
                        </div>
                      )}
                      <span style={{ color: "white", fontWeight: "600", fontSize: "0.9rem" }}>
                        {review.customer_name}
                      </span>
                    </div>

                    {/* Company */}
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
                      {review.company_name || "—"}
                    </span>

                    {/* Rating */}
                    {renderStars(review.rating)}

                    {/* Review */}
                    <div>
                      {review.review_title && (
                        <p style={{ margin: "0 0 4px", color: "white", fontWeight: "600", fontSize: "0.85rem" }}>{review.review_title}</p>
                      )}
                      <p style={{ margin: 0, color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", lineHeight: "1.4", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {review.review_message}
                      </p>
                    </div>

                    {/* Date */}
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
                      {review.created_at ? new Date(review.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                    </span>

                    {/* Status */}
                    {getStatusBadge(review.status)}

                    {/* Actions */}
                    <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
                      {review.status !== "Approved" && (
                        <button
                          onClick={() => handleAction(review.id, "approve")}
                          disabled={actionLoading === review.id}
                          title="Approve"
                          style={{
                            width: "32px", height: "32px", borderRadius: "8px",
                            background: "rgba(34, 197, 94, 0.15)", border: "1px solid rgba(34, 197, 94, 0.3)",
                            color: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", transition: "all 0.2s ease",
                          }}
                        >
                          <Check size={14} />
                        </button>
                      )}
                      {review.status !== "Rejected" && (
                        <button
                          onClick={() => handleAction(review.id, "reject")}
                          disabled={actionLoading === review.id}
                          title="Reject"
                          style={{
                            width: "32px", height: "32px", borderRadius: "8px",
                            background: "rgba(234, 179, 8, 0.15)", border: "1px solid rgba(234, 179, 8, 0.3)",
                            color: "#eab308", display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", transition: "all 0.2s ease",
                          }}
                        >
                          <X size={14} />
                        </button>
                      )}
                      {deleteConfirm === review.id ? (
                        <div style={{ display: "flex", gap: "4px" }}>
                          <button
                            onClick={() => handleAction(review.id, "delete")}
                            style={{
                              padding: "4px 10px", borderRadius: "6px",
                              background: "rgba(239, 68, 68, 0.3)", border: "1px solid #ef4444",
                              color: "#ef4444", fontSize: "0.7rem", fontWeight: "700", cursor: "pointer",
                            }}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            style={{
                              padding: "4px 10px", borderRadius: "6px",
                              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
                              color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", fontWeight: "700", cursor: "pointer",
                            }}
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(review.id)}
                          disabled={actionLoading === review.id}
                          title="Delete"
                          style={{
                            width: "32px", height: "32px", borderRadius: "8px",
                            background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)",
                            color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", transition: "all 0.2s ease",
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Summary */}
            {reviews.length > 0 && (
              <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap" }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
                  Total: <strong style={{ color: "white" }}>{reviews.length}</strong>
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
                  Approved: <strong style={{ color: "#22c55e" }}>{reviews.filter(r => r.status === "Approved").length}</strong>
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
                  Pending: <strong style={{ color: "#eab308" }}>{reviews.filter(r => r.status === "Pending").length}</strong>
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
                  Rejected: <strong style={{ color: "#ef4444" }}>{reviews.filter(r => r.status === "Rejected").length}</strong>
                </span>
              </div>
            )}
          </motion.div>
        )}

        {/* Mobile-responsive card view for smaller screens */}
        <style>{`
          @media (max-width: 992px) {
            div[style*="gridTemplateColumns"] {
              grid-template-columns: 1fr !important;
              gap: 8px !important;
            }
            div[style*="gridTemplateColumns"] > span:nth-child(1)::before { content: "Customer: "; color: rgba(255,255,255,0.4); font-size: 0.7rem; }
          }
        `}</style>
      </div>
    </div>
  );
}
