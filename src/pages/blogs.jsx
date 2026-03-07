import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Blogcard from "../components/blogcard";
import instance, { API_BASE_URL } from "../config/axios.config";
import SEO from "../utils/seo";
import useAOS from "../hooks/useAos";
import Subscription from "../components/sections/subscription";
import { Slide3 } from "../components/images";
import { FaArrowRight, FaBookOpen } from "react-icons/fa";

const Blogs = () => {
  useAOS();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/posts");
        setPosts(res.data || []);
      } catch (error) {
        setPosts([]);
      }
    };
    fetchData();
  }, []);

  const featured = posts[0];

  return (
    <div className="min-h-screen bg-bgcolor text-textcolor2">
      <SEO
        title="Lasglowtech Blogs"
        description="Read practical insights, guides, and product updates from Lasglowtech."
        keywords="Lasglowtech blogs, design insights, web development articles"
        url="https://www.lasglowtech.com.ng/blogs"
      />

      {/* Hero */}
      <section className="relative border-b border-Primarycolor/20 bg-bgcolor2/30 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src={Slide3}
            alt=""
            className="w-full h-full object-cover object-center"
            aria-hidden
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-Primarycolor/30 bg-Primarycolor/10 text-Secondarycolor text-sm font-medium mb-6"
            data-aos="fade-up"
          >
            <FaBookOpen className="w-4 h-4" />
            Blog
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-textcolor2 tracking-tight max-w-3xl mx-auto leading-tight"
            data-aos="zoom-up"
          >
            Insights, guides & digital trends
          </h1>
          <p
            className="text-base md:text-lg text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed"
            data-aos="fade-up"
          >
            Practical lessons on design, engineering, and marketing to help your business grow online.
          </p>
          <nav
            className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-Secondarycolor transition-colors">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-Secondarycolor">Blogs</span>
          </nav>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="max-w-6xl mx-auto px-6 md:px-12 -mt-6 relative z-10">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/60 overflow-hidden shadow-xl shadow-black/20"
          >
            <Link to={featured.slug ? `/blog/${featured.slug}` : "/blogs"} className="block group">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={
                      featured.coverUrl ||
                      (featured.cover
                        ? `${API_BASE_URL}/uploads/images/${featured.cover}`
                        : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800")
                    }
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-lg bg-Primarycolor/90 text-white text-xs font-semibold uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-textcolor2 group-hover:text-Secondarycolor transition-colors line-clamp-2">
                    {featured.title}
                  </h2>
                  <p className="text-gray-400 mt-3 line-clamp-2 text-sm md:text-base">
                    {featured.content?.replace(/<[^>]+>/g, "").slice(0, 160)}…
                  </p>
                  <span className="inline-flex items-center gap-2 mt-4 text-Secondarycolor font-medium text-sm">
                    Read article
                    <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        </section>
      )}

      {/* Blog grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-textcolor2">All articles</h2>
        </div>
        <Blogcard />
      </section>

      <Subscription />
    </div>
  );
};

export default Blogs;
