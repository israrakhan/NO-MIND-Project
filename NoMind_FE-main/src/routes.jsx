/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Outlet, ScrollRestoration, useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import ScrollToTopButton from "./components/layout/ScrollToTopButton.jsx";
import Lenis from "lenis";

// ─── Public Module ─────────────────────────────────────────────────────────
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Programs from "./pages/Programs.jsx";
import AllPrograms from "./pages/AllPrograms.jsx";
import Meditation from "./pages/Meditation.jsx";
import Library from "./pages/Library.jsx";
import { Connect } from "./pages/Connect.jsx";
import Blog from "./pages/Blog.jsx";
import Accessibility from "./pages/Accessibility.jsx";
import CookiePolicy from "./pages/CookiePolicy.jsx";
import NotFound from "./pages/NotFound.jsx";
import { WhatsAppButton } from "./components/layout/WhatsAppButton.jsx";

// ─── Admin Module ──────────────────────────────────────────────────────────
import { AdminLogin } from "./modules/admin/pages/AdminLogin.jsx";
import { AdminDashboard } from "./modules/admin/pages/AdminDashboard.jsx";
import { AdminLayout } from "./modules/admin/components/AdminLayout.jsx";
import { ProtectedRoute, AdminOnlyRoute } from "./modules/admin/components/ProtectedRoute.jsx";
import { AdminAuthProvider } from "./modules/admin/context/AdminAuthContext.jsx";

// ─── Admin Pages: Bookings ─────────────────────────────────────────────────
import { BookingList } from "./modules/admin/pages/bookings/BookingList.jsx";
import { BookingCreate } from "./modules/admin/pages/bookings/BookingCreate.jsx";
import { BookingDetail } from "./modules/admin/pages/bookings/BookingDetail.jsx";

// ─── Admin Pages: Inquiries ────────────────────────────────────────────────
import { InquiryList } from "./modules/admin/pages/inquiries/InquiryList.jsx";
import { InquiryDetail } from "./modules/admin/pages/inquiries/InquiryDetail.jsx";

// ─── Admin Pages: Users ────────────────────────────────────────────────────
import { UserList } from "./modules/admin/pages/users/UserList.jsx";
import { UserCreate } from "./modules/admin/pages/users/UserCreate.jsx";
import { UserEdit } from "./modules/admin/pages/users/UserEdit.jsx";

// ─── Admin Pages: Programs ─────────────────────────────────────────────────
import { ProgramList } from "./modules/admin/pages/programs/ProgramList.jsx";
import { ProgramCreate } from "./modules/admin/pages/programs/ProgramCreate.jsx";
import { ProgramEdit } from "./modules/admin/pages/programs/ProgramEdit.jsx";

// ─── Admin Pages: Experience ───────────────────────────────────────────────
import { ExperienceList } from "./modules/admin/pages/experience/ExperienceList.jsx";
import { ExperienceCreate } from "./modules/admin/pages/experience/ExperienceCreate.jsx";
import { ExperienceDetail } from "./modules/admin/pages/experience/ExperienceDetail.jsx";
import { ExperienceEdit } from "./modules/admin/pages/experience/ExperienceEdit.jsx";

// ─── Admin Pages: Enrollments ───────────────────────────────────────────────
import { EnrollmentList } from "./modules/admin/pages/enrollments/EnrollmentList.jsx";
import { EnrollmentDetail } from "./modules/admin/pages/enrollments/EnrollmentDetail.jsx";

// ─── Public Layout ─────────────────────────────────────────────────────────
function PublicLayout() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(''); // Compatibility with Navbar
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Global Scroll Reveal Observer
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return (
    <div className="font-body-md text-body-md selection:bg-petal-pink/30 min-h-screen flex flex-col bg-surface text-on-surface">
      <ScrollRestoration />
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="pt-24 flex-1">
        <Outlet />
      </main>
      <Footer setActiveTab={setActiveTab} />

      <WhatsAppButton />
      <ScrollToTopButton />
    </div>
  );
}

// ─── Admin Auth Wrapper ────────────────────────────────────────────────────
function AdminAuthWrapper() {
  return (
    <AdminAuthProvider>
      <ScrollRestoration />
      <Outlet />
    </AdminAuthProvider>
  );
}

export const router = createBrowserRouter([
  // ── Public Routes ──────────────────────────────────────────────────────
  {
    element: <PublicLayout />,
    children: [
      { path: "/", Component: Home },
      { path: "/about", Component: About },
      { path: "/workshops", Component: Programs },
      { path: "/workshops/all", Component: AllPrograms },
      { path: "/library", Component: Library },
      { path: "/blog", Component: Blog },
      { path: "/connect", Component: Connect },
      { path: "/meditation", Component: Meditation },
      { path: "/accessibility", Component: Accessibility },
      { path: "/cookie-policy", Component: CookiePolicy },
      { path: "*", Component: NotFound },
    ],
  },

  // ── Admin Routes ───────────────────────────────────────────────────────
  {
    element: <AdminAuthWrapper />,
    children: [
      { path: "/admin/login", element: <AdminLogin /> },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "bookings", element: <BookingList /> },
          { path: "bookings/create", element: <BookingCreate /> },
          { path: "bookings/:id", element: <BookingDetail /> },
          { path: "inquiries", element: <InquiryList /> },
          { path: "inquiries/:id", element: <InquiryDetail /> },
          { path: "users", element: <AdminOnlyRoute><UserList /></AdminOnlyRoute> },
          { path: "users/create", element: <AdminOnlyRoute><UserCreate /></AdminOnlyRoute> },
          { path: "users/:id/edit", element: <AdminOnlyRoute><UserEdit /></AdminOnlyRoute> },
          { path: "programs", element: <ProgramList /> },
          { path: "programs/create", element: <ProgramCreate /> },
          { path: "programs/:id/edit", element: <ProgramEdit /> },
          { path: "experience", element: <AdminOnlyRoute><ExperienceList /></AdminOnlyRoute> },
          { path: "experience/create", element: <AdminOnlyRoute><ExperienceCreate /></AdminOnlyRoute> },
          { path: "experience/:id", element: <AdminOnlyRoute><ExperienceDetail /></AdminOnlyRoute> },
          { path: "experience/:id/edit", element: <AdminOnlyRoute><ExperienceEdit /></AdminOnlyRoute> },
          { path: "enrollments", element: <EnrollmentList /> },
          { path: "enrollments/:id", element: <EnrollmentDetail /> },
          { path: "*", Component: NotFound },
        ],
      },
    ],
  },
]);
