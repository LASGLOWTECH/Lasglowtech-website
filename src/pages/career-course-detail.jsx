import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaClock, FaSignal, FaCertificate } from "react-icons/fa";
import instance from "../config/axios.config";
import SEO from "../utils/seo";
import { LOGO } from "../components/images";
import { isAuthenticated, getUser, getToken } from "../utils/auth";
import { toast } from "react-toastify";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop";

const CareerCourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState(null);
  const authed = isAuthenticated();
  const user = getUser();
  const isLearner = ["learner", "student", "talent"].includes(user?.role);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError("Invalid course");
      return;
    }
    let cancelled = false;
    instance
      .get(`/lms/courses/by-slug/${slug}`)
      .then((res) => {
        if (!cancelled) setCourse(res.data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.response?.data?.error || "Course not found");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [slug]);

  const loginUrl = `/auth/login?redirect=${encodeURIComponent(`/careers/courses/${slug}`)}`;
  const registerUrl = `/auth/register?redirect=${encodeURIComponent(`/careers/courses/${slug}`)}`;

  const handleEnroll = async () => {
    if (!course?.id || !isLearner) return;
    setEnrolling(true);
    try {
      const token = getToken();
      await instance.post(`/lms/enroll/${course.id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Enrolled successfully. Redirecting to your dashboard.");
      navigate("/careers/dashboard", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.error || "Enrollment failed.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bgcolor flex items-center justify-center">
        <div className="animate-pulse w-full max-w-3xl mx-auto px-4">
          <div className="h-8 w-48 bg-bgcolor2 rounded mb-6" />
          <div className="aspect-video bg-bgcolor2 rounded-2xl mb-6" />
          <div className="h-6 bg-bgcolor2 rounded w-3/4 mb-4" />
          <div className="h-4 bg-bgcolor2 rounded w-full mb-2" />
          <div className="h-4 bg-bgcolor2 rounded w-5/6" />
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-bgcolor flex flex-col">
        <header className="border-b border-Primarycolor/20 bg-bgcolor2/95 px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link to="/careers" className="flex items-center gap-2 text-textcolor2 hover:text-Secondarycolor">
              <img src={LOGO} width={32} height={32} alt="Lasglowtech" className="rounded" />
              <span className="font-semibold text-sm">Academy</span>
            </Link>
            <Link to="/careers" className="text-sm text-muted hover:text-Secondarycolor flex items-center gap-1">
              <FaArrowLeft className="w-3.5 h-3.5" /> Back to courses
            </Link>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center">
            <p className="text-muted mb-4">{error || "Course not found."}</p>
            <Link to="/careers" className="text-Secondarycolor hover:underline">
              Back to courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgcolor text-textcolor2">
      <SEO
        title={`${course.title} | Lasglowtech Academy`}
        description={course.summary || course.description || `Course: ${course.title}`}
        url={`https://www.lasglowtech.com.ng/careers/courses/${course.slug}`}
      />

      {/* Minimal header */}
      <header className="sticky top-0 z-50 border-b border-Primarycolor/20 bg-bgcolor2/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link to="/careers" className="flex items-center gap-2 text-textcolor2 hover:text-Secondarycolor transition-colors">
            <img src={LOGO} width={32} height={32} alt="Lasglowtech" className="rounded" />
            <span className="font-semibold text-sm">Lasglowtech Academy</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/careers"
              className="text-sm text-muted hover:text-Secondarycolor flex items-center gap-1"
            >
              <FaArrowLeft className="w-3.5 h-3.5" />
              All courses
            </Link>
            {authed && isLearner && (
              <Link
                to="/careers/dashboard"
                className="text-sm font-medium text-Secondarycolor hover:underline"
              >
                My dashboard
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <Link
          to="/careers"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-Secondarycolor mb-6"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
          Back to courses
        </Link>

        <div className="rounded-2xl border border-Primarycolor/20 bg-bgcolor2/40 overflow-hidden mb-8">
          <div className="aspect-video md:aspect-[21/9] bg-bgcolor/60 relative">
            <img
              src={course.imageUrl || PLACEHOLDER_IMAGE}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = PLACEHOLDER_IMAGE;
              }}
            />
            {course.isFeatured && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-Secondarycolor/90 text-white text-sm font-medium">
                Popular
              </span>
            )}
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-3 text-sm text-muted mb-4">
              {course.level && (
                <span className="flex items-center gap-1.5">
                  <FaSignal className="w-4 h-4" />
                  {course.level}
                </span>
              )}
              {course.durationWeeks > 0 && (
                <span className="flex items-center gap-1.5">
                  <FaClock className="w-4 h-4" />
                  {course.durationWeeks} week{course.durationWeeks !== 1 ? "s" : ""}
                </span>
              )}
              {course.issueCertificateOnCompletion && (
                <span className="flex items-center gap-1.5">
                  <FaCertificate className="w-4 h-4" />
                  Certificate on completion
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-textcolor2 mb-3">
              {course.title}
            </h1>
            {course.summary && (
              <p className="text-lg text-muted leading-relaxed mb-6">{course.summary}</p>
            )}
            {course.description && (
              <div
                className="prose prose-invert max-w-none text-textcolor2/90 text-sm md:text-base leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            )}

            {/* CTA: Login / Register to enroll, or Enroll / Dashboard */}
            <div className="pt-6 border-t border-Primarycolor/20">
              {!authed ? (
                <div className="flex flex-wrap gap-4">
                  <p className="text-muted text-sm w-full mb-2">
                    Sign in or create an account to enroll in this course.
                  </p>
                  <Link
                    to={loginUrl}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-Primarycolor/40 bg-Primarycolor/10 text-Secondarycolor font-medium hover:bg-Primarycolor/20 transition-colors"
                  >
                    Login to enroll
                  </Link>
                  <Link
                    to={registerUrl}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-Primarycolor to-Primarycolor1 text-white font-medium hover:opacity-95 transition-opacity"
                  >
                    Register to enroll
                  </Link>
                </div>
              ) : !isLearner ? (
                <p className="text-muted text-sm">
                  Enroll with a learner account.{" "}
                  <Link to="/auth/login" className="text-Secondarycolor hover:underline">
                    Switch account
                  </Link>
                </p>
              ) : (
                <div className="flex flex-wrap gap-4 items-center">
                  <button
                    type="button"
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-Primarycolor to-Primarycolor1 text-white font-medium hover:opacity-95 transition-opacity disabled:opacity-60"
                  >
                    {enrolling ? "Enrolling…" : "Enroll in this course"}
                  </button>
                  <Link
                    to="/careers/dashboard"
                    className="text-sm text-muted hover:text-Secondarycolor"
                  >
                    Or go to my dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-Primarycolor/20 py-6 bg-bgcolor2/20">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between text-sm">
          <Link to="/careers" className="text-muted hover:text-Secondarycolor">
            All courses
          </Link>
          <Link to="/" className="text-muted hover:text-Secondarycolor">
            Main site
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default CareerCourseDetail;
