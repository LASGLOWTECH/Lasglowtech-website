import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaPalette,
  FaBookOpen,
  FaArrowRight,
  FaChevronLeft,
} from "react-icons/fa";
import instance from "../config/axios.config";
import SEO from "../utils/seo";
import { LOGO } from "../components/images";

/* Floating avatar images for hero – young tech African students / diverse learners */
const HERO_AVATARS = [
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=120&h=120&fit=crop", alt: "Young tech student", position: "top-left", lines: "up" },
  { src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop", alt: "Student with laptop", position: "top-right", lines: "oval" },
  { src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=120&h=120&fit=crop", alt: "Young learner with laptop", position: "bottom-left", lines: "down" },
  { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=120&h=120&fit=crop", alt: "Tech student", position: "bottom-right", lines: "none" },
];

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop";

const whyLearn = [
  {
    icon: FaLaptopCode,
    title: "Expert-Led Courses",
    text: "Learn from industry experts with hands-on experience and up-to-date tech skills.",
  },
  {
    icon: FaPalette,
    title: "Comprehensive Curriculum",
    text: "Wide range of tech-related courses tailored to your interests and career goals.",
  },
  {
    icon: FaBookOpen,
    title: "Practical Projects",
    text: "Real-world projects that reinforce learning and build job-ready skills.",
  },
];

const CareersAcademy = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    instance
      .get("/lms/courses")
      .then((res) => {
        if (!cancelled && Array.isArray(res.data)) setCourses(res.data);
      })
      .catch(() => {
        if (!cancelled) setCourses([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const featuredCourses = courses.filter((c) => c.isFeatured);
  const otherCourses = courses.filter((c) => !c.isFeatured);
  const displayCourses = featuredCourses.length ? [...featuredCourses, ...otherCourses] : courses;

  return (
    <div className="min-h-screen bg-bgcolor text-textcolor2">
      <SEO
        title="Learning Platform | Lasglowtech Academy – Courses & Training"
        description="Grow your skills with Lasglowtech Academy. Expert-led courses in web development, design, and digital skills. Explore courses and start learning today."
        keywords="Lasglowtech academy, tech courses Nigeria, learn web development, UI UX training, online courses, skills training"
        url="https://www.lasglowtech.com.ng/careers"
      />

      {/* Minimal Academy Header */}
      <header className="sticky top-0 z-50 border-b border-Primarycolor/20 bg-bgcolor2/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 md:h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-textcolor2 hover:text-Secondarycolor transition-colors"
          >
            <img src={LOGO} width={36} height={36} alt="Lasglowtech" className="rounded" />
            <span className="font-semibold text-sm md:text-base">Lasglowtech Academy</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm text-muted hover:text-Secondarycolor transition-colors flex items-center gap-1"
            >
              <FaChevronLeft className="w-3.5 h-3.5" />
              Back to main site
            </Link>
            <Link
              to="/auth/login"
              className="text-sm font-medium text-textcolor2 hover:text-Secondarycolor transition-colors"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="text-sm font-medium px-4 py-2 rounded-lg bg-Primarycolor text-white hover:bg-Primarycolor/90 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero – interactive with floating avatars and decorative lines */}
      <section className="relative border-b border-Primarycolor/20 bg-gradient-to-b from-bgcolor2/50 to-bgcolor overflow-hidden min-h-[420px] md:min-h-[500px] flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 w-full relative">
          {/* Floating avatars with decorative lines */}
          {HERO_AVATARS.map((avatar, i) => (
            <motion.div
              key={avatar.position}
              className="absolute z-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -5, 0],
              }}
              transition={{
                opacity: { duration: 0.4, delay: i * 0.12 },
                scale: { duration: 0.4, delay: i * 0.12 },
                y: { duration: 3 + i * 0.5, repeat: Infinity, repeatDelay: 0.5 },
              }}
              style={
                avatar.position === "top-left"
                  ? { top: "8%", left: "4%", maxWidth: "clamp(64px, 12vw, 88px)" }
                  : avatar.position === "top-right"
                  ? { top: "12%", right: "6%", maxWidth: "clamp(64px, 12vw, 88px)" }
                  : avatar.position === "bottom-left"
                  ? { bottom: "18%", left: "6%", maxWidth: "clamp(64px, 12vw, 88px)" }
                  : { bottom: "12%", right: "8%", maxWidth: "clamp(64px, 12vw, 88px)" }
              }
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Decorative lines – radiating up */}
                {avatar.lines === "up" && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 -z-10">
                    {[1, 2, 3].map((j) => (
                      <motion.span
                        key={j}
                        className="block w-0.5 h-3 rounded-full bg-Primarycolor/70"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{ delay: 0.3 + j * 0.05 }}
                        style={{ transformOrigin: "bottom" }}
                      />
                    ))}
                  </div>
                )}
                {/* Decorative oval ring */}
                {avatar.lines === "oval" && (
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-Primarycolor/60 -z-10"
                    style={{ top: "-6px", left: "-6px", right: "-6px", bottom: "-6px" }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  />
                )}
                {/* Decorative lines – radiating down */}
                {avatar.lines === "down" && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 -z-10">
                    {[1, 2, 3].map((j) => (
                      <motion.span
                        key={j}
                        className="block w-0.5 h-3 rounded-full bg-Primarycolor/70"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        transition={{ delay: 0.35 + j * 0.05 }}
                        style={{ transformOrigin: "top" }}
                      />
                    ))}
                  </div>
                )}
                <img
                  src={avatar.src}
                  alt={avatar.alt}
                  className="w-full aspect-square rounded-full object-cover border-2 border-Primarycolor/30 shadow-lg"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop";
                  }}
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Curved decorative line (smiley-style) near headline */}
          <motion.svg
            className="absolute hidden md:block pointer-events-none text-Primarycolor/50"
            width="80"
            height="40"
            viewBox="0 0 80 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ right: "18%", top: "42%", zIndex: 0 }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <path d="M 10 30 Q 40 8 70 30" strokeLinecap="round" />
          </motion.svg>

          {/* Main content – centered */}
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-Primarycolor/30 bg-Primarycolor/10 text-sm text-Secondarycolor mb-6">
              <FaGraduationCap className="w-4 h-4" />
              Digital Career Pathways
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-textcolor2 tracking-tight leading-[1.08]">
              <span className="block">Launch Your </span>
              <span className="block mt-1 text-Primarycolor">Career in Tech</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Gain practical experience, build real projects, and position yourself for real opportunities, not just certificates.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <motion.a
                href="#courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-Primarycolor to-Primarycolor1 text-white font-medium hover:opacity-95 transition-opacity"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
               Explore Career Paths
                <FaArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/auth/register"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-Primarycolor/40 bg-Primarycolor/10 text-Secondarycolor font-medium hover:bg-Primarycolor/20 transition-colors"
                >
                  Apply for Bootcamp
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why learn with us */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-textcolor2 mb-2">
            Why learn with us?
          </h2>
          <p className="text-muted mb-10 max-w-2xl">
            Practical, industry-aligned courses to build skills and career confidence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyLearn.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl border border-Primarycolor/20 bg-bgcolor2/40 hover:border-Primarycolor/30 transition-colors"
                >
                  <span className="inline-flex w-12 h-12 rounded-xl bg-Primarycolor/20 text-Secondarycolor items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </span>
                  <h3 className="text-lg font-semibold text-textcolor2 mt-4 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses list */}
      <section id="courses" className="py-12 md:py-16 border-t border-Primarycolor/15 bg-bgcolor2/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-textcolor2 mb-2">
            {featuredCourses.length ? "Most popular" : "Courses"}
          </h2>
          <p className="text-muted mb-10">
            Click a course to see full details. Sign in or register to enroll.
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-Primarycolor/20 bg-bgcolor2/40 h-64 animate-pulse"
                />
              ))}
            </div>
          ) : displayCourses.length === 0 ? (
            <div className="rounded-2xl border border-Primarycolor/20 bg-bgcolor2/40 p-12 text-center">
              <p className="text-muted">No courses published yet. Check back later.</p>
              <Link to="/" className="inline-block mt-4 text-Secondarycolor hover:underline">
                Back to main site
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/careers/courses/${course.slug || course.id}`}
                  className="group rounded-2xl border border-Primarycolor/20 bg-bgcolor2/40 overflow-hidden hover:border-Primarycolor/40 hover:shadow-lg transition-all"
                >
                  <div className="aspect-video bg-bgcolor/60 relative overflow-hidden">
                    <img
                      src={course.imageUrl || PLACEHOLDER_IMAGE}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                    {course.isFeatured && (
                      <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-Secondarycolor/90 text-white text-xs font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-muted uppercase tracking-wider">
                      {course.level || "All levels"}
                    </span>
                    <h3 className="text-lg font-semibold text-textcolor2 mt-1 group-hover:text-Secondarycolor transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted mt-2 line-clamp-2">{course.summary || ""}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-Secondarycolor font-medium mt-3">
                      View course
                      <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer strip - academy only */}
      <footer className="border-t border-Primarycolor/20 py-8 bg-bgcolor2/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-textcolor2 hover:text-Secondarycolor">
            <img src={LOGO} width={28} height={28} alt="" className="rounded" />
            <span className="text-sm font-medium">Lasglowtech Academy</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/careers" className="text-muted hover:text-Secondarycolor">
              Courses
            </Link>
            <Link to="/auth/login" className="text-muted hover:text-Secondarycolor">
              Login
            </Link>
            <Link to="/auth/register" className="text-muted hover:text-Secondarycolor">
              Register
            </Link>
            <Link to="/" className="text-muted hover:text-Secondarycolor">
              Main site
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareersAcademy;
