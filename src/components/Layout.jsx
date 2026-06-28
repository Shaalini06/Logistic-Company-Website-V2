import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Topbar />
      <Navbar />
      <main className="dashboard-main">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
