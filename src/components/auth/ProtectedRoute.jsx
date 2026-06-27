import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div 
        style={{
          position: "fixed",
          inset: 0,
          background: "#0B3B6E",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 12000,
        }}
      >
        {/* Pulsing Image Logo */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "24px"
          }}
        >
          <img src="/logo.png" alt="AL ARSH Logo" style={{ width: "180px", height: "180px", borderRadius: "50%", backgroundColor: "#ffffff", objectFit: "cover" }} />
        </motion.div>

        {/* Thin progress bar animating across bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: "rgba(255,255,255,0.1)",
            overflow: "hidden"
          }}
        >
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              position: "absolute",
              width: "40%",
              height: "100%",
              background: "#3FAFA8",
              boxShadow: "0 0 10px #3FAFA8, 0 0 5px #3FAFA8"
            }}
          />
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
