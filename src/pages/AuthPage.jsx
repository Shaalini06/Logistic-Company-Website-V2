import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, Building, ShieldCheck, Globe, CheckCircle2 } from "lucide-react";
import useAuth from "../hooks/useAuth";


export default function AuthPage() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  // State Management
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Signup fields
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formLoading, setFormLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      triggerShake();
      return;
    }

    setFormLoading(true);
    setError("");

    try {
      const res = await login(email, password);
      if (res.success) {
        setSuccessMessage(`Welcome back, ${res.user.name}!`);
        // Hold for 1 second to let the user see the success state
        setTimeout(() => {
          setFormLoading(false);
          navigate("/main");
        }, 1200);
      } else {
        setFormLoading(false);
        setError(res.error);
        triggerShake();
      }
    } catch (err) {
      setFormLoading(false);
      setError("An unexpected error occurred. Please try again.");
      triggerShake();
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !companyName || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      triggerShake();
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      triggerShake();
      return;
    }

    setFormLoading(true);
    setError("");

    try {
      const res = await signup(fullName, email, password, companyName);
      setFormLoading(false);
      if (res.success) {
        setSuccessMessage("Account created successfully! Switching to sign in...");
        setTimeout(() => {
          setSuccessMessage("");
          setActiveTab("login");
          setPassword("");
          setConfirmPassword("");
        }, 1500);
      } else {
        setError(res.error || "Registration failed.");
        triggerShake();
      }
    } catch (err) {
      setFormLoading(false);
      setError("An unexpected error occurred. Please try again.");
      triggerShake();
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {/* Auth Container — no navbar, full viewport */}
        <div className="auth-container" style={{ flex: 1 }}>
          
          {/* Decorative Side (Desktop only) */}
          <div className="auth-visual-side mesh-bg">
            <div className="grid-overlay" />

            {/* Logo at top of visual side */}
            <div style={{ position: "relative", zIndex: 5, display: "flex", flexDirection: "column", gap: "20px" }}>
              <Link to="/" style={{ display: "inline-flex", alignItems: "center", width: "fit-content" }}>
                <img src="/logo.png" alt="AL ARSH Logo" style={{ height: "45px", width: "45px", borderRadius: "50%", backgroundColor: "#ffffff", objectFit: "cover" }} />
              </Link>
            
              {/* Top Branding Header */}
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "6px 16px", borderRadius: "50px", backdropFilter: "blur(5px)" }}>
                  <span style={{ width: "8px", height: "8px", background: "var(--color-accent)", borderRadius: "50%" }}></span>
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.8)", letterSpacing: "1px", fontWeight: "600" }}>Secured Gateway Portal</span>
                </div>
              </div>
            </div>

            {/* Middle Main Tagline */}
            <div style={{ position: "relative", zIndex: 5, paddingLeft: "10px" }}>
              <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontFamily: "Syne, sans-serif", fontWeight: 800, lineHeight: 1.1, color: "white", marginBottom: "20px" }}>
                Connect to <br/>
                Your Freight Portal
              </h2>
              <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "1.05rem", maxWidth: "450px", lineHeight: "1.6" }}>
                Secure access to real-time quotes, multi-modal tracking, and customs compliance documentation.
              </p>
            </div>

            {/* Bottom brand token */}
            <div style={{ position: "relative", zIndex: 5, color: "rgba(255, 255, 255, 0.4)", fontSize: "0.85rem" }}>
              © 2024 Al Arsh Freight Carriers LLC. Security Certified.
            </div>

            {/* Floating brand visual badges */}
            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="brand-visual-card"
              style={{ top: "25%", left: "15%" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", background: "rgba(63, 175, 168, 0.15)", color: "var(--color-accent)" }}>
                <Globe size={20} />
              </div>
              <div>
                <h5 style={{ color: "white", margin: 0, fontSize: "0.9rem", fontWeight: "700" }}>Pan-India Reach</h5>
                <p style={{ color: "rgba(255,255,255,0.5)", margin: 0, fontSize: "0.75rem" }}>Reliable Delivery Network</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0], x: [0, -4, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="brand-visual-card"
              style={{ top: "45%", right: "15%" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", background: "rgba(63, 175, 168, 0.15)", color: "var(--color-accent)" }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h5 style={{ color: "white", margin: 0, fontSize: "0.9rem", fontWeight: "700" }}>Protected Cargo</h5>
                <p style={{ color: "rgba(255,255,255,0.5)", margin: 0, fontSize: "0.75rem" }}>100% Insured Shipping</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0], x: [0, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="brand-visual-card"
              style={{ bottom: "25%", left: "20%" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", background: "rgba(63, 175, 168, 0.15)", color: "var(--color-accent)" }}>
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h5 style={{ color: "white", margin: 0, fontSize: "0.9rem", fontWeight: "700" }}>98% On-Time</h5>
                <p style={{ color: "rgba(255,255,255,0.5)", margin: 0, fontSize: "0.75rem" }}>Trusted Precision Logistics</p>
              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <div className="auth-form-side">
            
            {/* Form Card wrapper */}
            <div 
              className={`glass-card ${shake ? "form-shake" : ""}`}
              style={{ width: "100%", maxWidth: "440px", padding: "40px 30px" }}
            >
              
              {/* Form Tab switcher */}
              <div style={{ display: "flex", background: "rgba(255,255,255,0.03)", padding: "4px", borderRadius: "10px", marginBottom: "30px", border: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
                <button
                  type="button"
                  onClick={() => { setActiveTab("login"); setError(""); }}
                  style={{ flex: 1, border: "none", background: "none", color: activeTab === "login" ? "white" : "rgba(255,255,255,0.5)", fontWeight: "600", fontSize: "0.9rem", padding: "10px 0", cursor: "pointer", outline: "none", zIndex: 2, position: "relative" }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab("signup"); setError(""); }}
                  style={{ flex: 1, border: "none", background: "none", color: activeTab === "signup" ? "white" : "rgba(255,255,255,0.5)", fontWeight: "600", fontSize: "0.9rem", padding: "10px 0", cursor: "pointer", outline: "none", zIndex: 2, position: "relative" }}
                >
                  Sign Up
                </button>
                {/* layoutId underline */}
                <motion.div
                  layoutId="activeTabUnderline"
                  style={{
                    position: "absolute",
                    top: "4px",
                    bottom: "4px",
                    left: activeTab === "login" ? "4px" : "50%",
                    right: activeTab === "login" ? "50%" : "4px",
                    background: "rgba(63, 175, 168, 0.25)",
                    border: "1px solid rgba(63, 175, 168, 0.4)",
                    borderRadius: "8px",
                    zIndex: 1
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              </div>

              {/* Success Notification */}
              {successMessage && (
                <div style={{ background: "rgba(63, 175, 168, 0.15)", border: "1px solid var(--color-accent)", color: "#bbf7f4", padding: "12px 16px", borderRadius: "10px", marginBottom: "20px", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={18} style={{ color: "var(--color-accent)" }} />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Error Notification */}
              {error && (
                <div style={{ background: "rgba(220, 53, 69, 0.15)", border: "1px solid #ff6b6b", color: "#ffbaba", padding: "12px 16px", borderRadius: "10px", marginBottom: "20px", fontSize: "0.9rem" }}>
                  {error}
                </div>
              )}

              {activeTab === "login" ? (
                /* LOGIN FORM */
                <form onSubmit={handleLoginSubmit}>
                  
                  {/* Brand mark header */}
                  <div style={{ textAlign: "center", marginBottom: "24px" }}>
                    <img src="/logo.png" alt="AL ARSH Logo" style={{ height: "45px", width: "45px", borderRadius: "50%", backgroundColor: "#ffffff", objectFit: "cover", marginBottom: "12px" }} />
                    <h3 style={{ color: "white", margin: 0, fontSize: "1.5rem", fontWeight: "700" }}>Welcome Back</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", margin: "4px 0 0 0" }}>Sign in to access your freight dashboard</p>
                  </div>

                  {/* Email Input */}
                  <div className="auth-input-group">
                    <Mail size={18} />
                    <input
                      type="email"
                      className="auth-input-field"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={formLoading}
                    />
                  </div>

                  {/* Password Input */}
                  <div className="auth-input-group">
                    <Lock size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="auth-input-field has-eye"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={formLoading}
                    />
                    <button
                      type="button"
                      className="password-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Remember Me / Forgot Password */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", marginBottom: "24px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "rgba(255,255,255,0.7)" }}>
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        style={{ accentColor: "var(--color-accent)", cursor: "pointer" }}
                        disabled={formLoading}
                      />
                      Remember Me
                    </label>
                    <a href="#" onClick={(e) => { e.preventDefault(); setError("Demo mode: Credentials are: admin@alarsh.com (alarsh2024)"); }} style={{ color: "var(--color-accent)", textDecoration: "none" }}>
                      Forgot Password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))", color: "white", padding: "14px 0", borderRadius: "12px", border: "none", fontWeight: "600", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
                    disabled={formLoading}
                  >
                    {formLoading ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ width: "18px", height: "18px", border: "2px solid", borderRightColor: "transparent" }}></span>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <div style={{ display: "flex", alignItems: "center", margin: "24px 0", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>
                    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
                    <span style={{ padding: "0 10px" }}>or continue with</span>
                    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
                  </div>

                  {/* Google SSO */}
                  <button
                    type="button"
                    onClick={() => setError("Demo Mode: Google SSO is visual only. Use email/password instead.")}
                    className="btn btn-outline w-100"
                    style={{ borderColor: "rgba(255,255,255,0.15)", color: "white", padding: "12px 0", borderRadius: "12px", fontSize: "0.95rem", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "10px", background: "rgba(255, 255, 255, 0.02)" }}
                    disabled={formLoading}
                  >
                    <i className="fa-brands fa-google" style={{ color: "var(--color-accent)" }}></i> Google Workspace SSO
                  </button>

                  {/* Signup Link */}
                  <div style={{ textAlign: "center", marginTop: "24px", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
                    Don't have an account?{" "}
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("signup"); setError(""); }} style={{ color: "var(--color-accent)", textDecoration: "none", fontWeight: "600" }}>
                      Sign Up
                    </a>
                  </div>

                </form>
              ) : (
                /* SIGNUP FORM */
                <form onSubmit={handleSignupSubmit}>
                  <div style={{ textAlign: "center", marginBottom: "24px" }}>
                    <img src="/logo.png" alt="AL ARSH Logo" style={{ height: "45px", width: "45px", borderRadius: "50%", backgroundColor: "#ffffff", objectFit: "cover", marginBottom: "12px" }} />
                    <h3 style={{ color: "white", margin: 0, fontSize: "1.5rem", fontWeight: "700" }}>Partner Registration</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", margin: "4px 0 0 0" }}>Register a new account to request logistics quotes</p>
                  </div>

                  {/* Full Name */}
                  <div className="auth-input-group">
                    <User size={18} />
                    <input
                      type="text"
                      className="auth-input-field"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={formLoading}
                    />
                  </div>

                  {/* Email */}
                  <div className="auth-input-group">
                    <Mail size={18} />
                    <input
                      type="email"
                      className="auth-input-field"
                      placeholder="Corporate Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={formLoading}
                    />
                  </div>

                  {/* Company Name */}
                  <div className="auth-input-group">
                    <Building size={18} />
                    <input
                      type="text"
                      className="auth-input-field"
                      placeholder="Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      disabled={formLoading}
                    />
                  </div>

                  {/* Password */}
                  <div className="auth-input-group">
                    <Lock size={18} />
                    <input
                      type="password"
                      className="auth-input-field"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={formLoading}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="auth-input-group">
                    <Lock size={18} />
                    <input
                      type="password"
                      className="auth-input-field"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={formLoading}
                    />
                  </div>

                  {/* Sign Up Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))", color: "white", padding: "14px 0", borderRadius: "12px", border: "none", fontWeight: "600", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: "10px" }}
                    disabled={formLoading}
                  >
                    {formLoading ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ width: "18px", height: "18px", border: "2px solid", borderRightColor: "transparent" }}></span>
                    ) : (
                      "Create Partner Account"
                    )}
                  </button>

                  {/* Back to Sign In Link */}
                  <div style={{ textAlign: "center", marginTop: "24px", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
                    Already have an account?{" "}
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("login"); setError(""); }} style={{ color: "var(--color-accent)", textDecoration: "none", fontWeight: "600" }}>
                      Sign In
                    </a>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
