import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import Blogs from './pages/blogs';
import BlogDetails from './pages/blog-details';
import { ToastContainer } from 'react-toastify';
import DashboardHome from './pages/dashboard/DashboardHome';
import Create from './pages/dashboard/createblog';
import Subscriptions from './pages/dashboard/subscriptions';
import BlogList from './pages/dashboard/bloglist';
import Update from './pages/dashboard/updateblog';
import AdminLayout from './pages/dashboard';

function App() {
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      setLoading(false);
    };

    // If the page has already loaded (e.g., cache), stop loading immediately
    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      // Wait for full load
      window.addEventListener("load", handlePageLoad);
    }

    return () => window.removeEventListener("load", handlePageLoad);
  }, []);

  if (loading) {
    return <SiteLoader />;
  }


  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services/:slug" element={<SingleService />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="updateblog" element={<Update />} />
          <Route path="createblog" element={<Create />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="bloglist" element={<BlogList />} />
        </Route>

        <Route path="/blogs" element={<Blogs />} />
        
           <Route path="/blog/:slug" element={<BlogDetails />} />
      </Routes>

      <Footer />
      <ScrollTop />
      <ToastContainer />
    </>
  );
}

export default App;
