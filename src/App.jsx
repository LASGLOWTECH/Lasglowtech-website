import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Portfolio from "./pages/portfolio";
import About from "./pages/about";
import Services from "./pages/services";
import Contact from "./pages/contact";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import SingleService from "./pages/singleservice";
import ScrollTop from "./components/scroll";
import SiteLoader from "./components/loader";
import Blogs from "./pages/blogs";
import BlogDetails from "./pages/blog-details";
import { ToastContainer } from "react-toastify";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Create from "./pages/dashboard/createblog";
import Subscriptions from "./pages/dashboard/subscriptions";
import BlogList from "./pages/dashboard/bloglist";
import Update from "./pages/dashboard/updateblog";
import AdminLayout from "./pages/dashboard";
import Links from "./pages/bio";
import Checkout from "./pages/checkout";
import PaymentSuccess from "./pages/payment-success";
import Catalogues from "./pages/catalogues";
import CartPage from "./pages/cart";
import LoginPage from "./pages/auth-login";
import RegisterPage from "./pages/auth-register";
import ForgotPasswordPage from "./pages/auth-forgot-password";
import ResetPasswordPage from "./pages/auth-reset-password";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/admin-login";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import CataloguesAdmin from "./pages/dashboard/catalogues";
import ContactsAdmin from "./pages/dashboard/contacts";
import Careers from "./pages/careers";
import CareersAdmin from "./pages/dashboard/careers";
import CareersDashboard from "./pages/careers-dashboard";
import OrdersAdmin from "./pages/dashboard/orders";
import MyOrders from "./pages/my-orders";
import ClientDashboard from "./pages/client-dashboard";
import LmsAdmin from "./pages/dashboard/lms";
import BulkEmailAdmin from "./pages/dashboard/bulk-email";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Get current route

  useEffect(() => {
    const handlePageLoad = () => {
      setLoading(false);
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    return () => window.removeEventListener("load", handlePageLoad);
  }, []);

  if (loading) {
    return <SiteLoader />;
  }

  // Hide Navbar and Footer on auth, bio, dashboard, admin login
  const hideLayout =
    location.pathname === "/bio" ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/admin/login" ||
    location.pathname === "/auth/login" ||
    location.pathname === "/auth/register" ||
    location.pathname === "/auth/forgot-password" ||
    location.pathname.startsWith("/auth/reset-password");

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/careers"
          element={
            <ProtectedRoute allowedRoles={["learner", "student", "talent"]}>
              <Careers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/careers/dashboard"
          element={
            <ProtectedRoute allowedRoles={["learner", "student", "talent"]}>
              <CareersDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services/:slug" element={<SingleService />} />
        <Route
          path="/checkout/:slug"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/success"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/catalogues"
          element={<Catalogues />}
        />
        <Route
          path="/cart"
          element={<CartPage />}
        />
        <Route
          path="/my/orders"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/dashboard"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password/:token" element={<ResetPasswordPage />} />
        
        <Route path="*" element={<NotFound />} />

        <Route
          path="/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="catalogues" element={<CataloguesAdmin />} />
          <Route path="updateblog" element={<Update />} />
          <Route path="createblog" element={<Create />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="contacts" element={<ContactsAdmin />} />
          <Route path="careers" element={<CareersAdmin />} />
          <Route path="lms" element={<LmsAdmin />} />
          <Route path="orders" element={<OrdersAdmin />} />
          <Route path="bulk-email" element={<BulkEmailAdmin />} />
          <Route path="bloglist" element={<BlogList />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/bio" element={<Links />} />
      </Routes>

      {!hideLayout && <Footer />}

      <ScrollTop />
      <ToastContainer />
    </>
  );
}

export default App;
