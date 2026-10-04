import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import BrandIntro from "./components/BrandIntro";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import AwardsPage from "./pages/AwardsPage";
import ContactPage from "./pages/ContactPage";
import EyeCareAtHomePage from "./pages/EyeCareAtHomePage";
import StaffAppointmentsPage from "./pages/StaffAppointmentsPage";
import StaffConsultationsPage from "./pages/StaffConsultationsPage";
import StaffContactMessagesPage from "./pages/StaffContactMessagesPage";

/* Scroll to top on route change, or to #hash section if present */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  const previewIntro = new URLSearchParams(window.location.search).get("intro") === "preview";
  // Play on a fresh public-page load; navigating within the app doesn't replay it.
  const [showIntro, setShowIntro] = useState(() =>
    previewIntro || !window.location.pathname.startsWith("/staff/")
  );
  const finishIntro = useCallback(() => {
    setShowIntro(false);
    if (new URLSearchParams(window.location.search).has("intro")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("intro");
      window.history.replaceState(null, "", url);
    }
  }, []);
  return (
    <BrowserRouter>
      {showIntro && <BrandIntro onComplete={finishIntro} preview={previewIntro} />}
      <div inert={showIntro}>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage heroReady={!showIntro} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/eye-care-at-home" element={<EyeCareAtHomePage />} />
          <Route path="/staff/appointments" element={<StaffAppointmentsPage />} />
          <Route path="/staff/consultations" element={<StaffConsultationsPage />} />
          <Route path="/staff/messages" element={<StaffContactMessagesPage />} />
        </Routes>
      </main>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
