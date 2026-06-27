import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Features from "../pages/Features";
import Quote from "../pages/Quote";
import Team from "../pages/Team";
import Testimonial from "../pages/Testimonial";
import Gallery from "../pages/Gallery";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

// New Pages & Components
import LandingPage from "../pages/LandingPage";
import AuthPage from "../pages/AuthPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import useAuth from "../hooks/useAuth";
import RouteTransitionLoader from "../components/auth/RouteTransitionLoader";

// Catch-all redirect component based on auth state
function CatchAllRedirect() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/main" replace /> : <Navigate to="/" replace />;
}

export default function AppRoutes() {
  const { isLoading } = useAuth();

  return (
    <>
      {/* Route change loader bar (thin progress bar across top of screen) */}
      {!isLoading && <RouteTransitionLoader />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/main" element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="features" element={<Features />} />
            <Route path="quote" element={<Quote />} />
            <Route path="team" element={<Team />} />
            <Route path="testimonial" element={<Testimonial />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* Catch-all Wildcard Route */}
        <Route path="*" element={<CatchAllRedirect />} />
      </Routes>
    </>
  );
}
