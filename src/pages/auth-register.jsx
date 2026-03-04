import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft, FaBriefcase, FaBookOpen } from "react-icons/fa";
import { toast } from "react-toastify";
import instance from "../config/axios.config";
import { getRoleHomePath, saveSession } from "../utils/auth";
import { Land1, Land2, Land3 } from "../components/images";

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
];

const registerSlides = [
  {
    image: Land1,
    title: "Join the Network",
    text: "Create your profile and start connecting with opportunities in minutes.",
  },
  {
    image: Land2,
    title: "Built for Business Growth",
    text: "From design to development, we offer modern solutions tailored to your business goals.",
  },
  {
    image: Land3,
    title: "Simple Onboarding",
    text: "Register once, compare services, and pay securely when you are ready to start your project.",
  },
].map((slide, i) => ({ ...slide, image: slide.image || PLACEHOLDER_IMAGES[i] }));

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-Primarycolor/30 bg-bgcolor/80 text-textcolor2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Primarycolor/50 focus:border-Primarycolor/50 transition-colors";
const labelClass = "block text-sm font-medium text-muted mb-1.5";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const from = location.state?.from || (redirectUrl ? decodeURIComponent(redirectUrl) : null);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "client",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % registerSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await instance.post("/users/register", formData);
      saveSession({ token: res.data.token, user: res.data.user });
      toast.success("Account created.");
      navigate(from || getRoleHomePath(res.data?.user?.role), { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-bgcolor">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left: Sliding image panel with gradient overlay and text (reference style) */}
        <aside className="relative min-h-[280px] hidden md:block   lg:min-h-0 min-w-0 overflow-hidden bg-Primarycolor order-2 lg:order-1">
          <div
            className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            {registerSlides.map((slide, idx) => (
              <div key={slide.title} className="relative min-w-full flex-shrink-0">
                <img
                  src={slide.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length];
                  }}
                />
                {/* Overlay layers so text comes out well */}
                <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" aria-hidden />
                <div
                  className="absolute inset-0 z-10 bg-gradient-to-b from-Primarycolor/90 via-Primarycolor/80 to-Primarycolor1/97 pointer-events-none"
                  aria-hidden
                />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-8 py-10">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-base text-white/95 max-w-md leading-relaxed">
                    {slide.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
            {registerSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSlideIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  slideIndex === index ? "w-8 bg-Secondarycolor2" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </aside>

        {/* Right: Form column – dark theme, full height */}
        <div className="p-6 md:p-12 lg:p-16 flex flex-col justify-center min-h-[420px] lg:min-h-0 overflow-auto bg-bgcolor2 order-1 lg:order-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted hover:text-Secondarycolor transition-colors mb-4 text-sm"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-textcolor2">Create account</h1>
            <p className="text-muted mt-1 text-sm">
              Get started with Lasglowtech. Choose your role below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Two role options as cards */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, role: "client" }))}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 text-left transition-all ${
                  formData.role === "client"
                    ? "border-Primarycolor bg-Primarycolor/20 text-textcolor2"
                    : "border-Primarycolor/30 bg-bgcolor/50 text-muted hover:border-Primarycolor/50 hover:bg-Primarycolor/10"
                }`}
              >
                <FaBriefcase className="w-8 h-8 mb-2 text-Secondarycolor" />
                <span className="font-semibold text-textcolor2 text-sm">Register as client</span>
                <span className="text-xs mt-0.5 text-muted">Use services & catalogue, checkout online</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, role: "learner" }))}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 text-left transition-all ${
                  formData.role === "learner"
                    ? "border-Primarycolor bg-Primarycolor/20 text-textcolor2"
                    : "border-Primarycolor/30 bg-bgcolor/50 text-muted hover:border-Primarycolor/50 hover:bg-Primarycolor/10"
                }`}
              >
                <FaBookOpen className="w-8 h-8 mb-2 text-Secondarycolor" />
                <span className="font-semibold text-textcolor2 text-sm">Take a course</span>
                <span className="text-xs mt-0.5 text-muted">Learn skills, enroll in programmes</span>
              </button>
            </div>

            <div>
              <label htmlFor="reg-username" className="block text-xs font-medium text-muted mb-1">
                Full name
              </label>
              <input
                id="reg-username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg border border-Primarycolor/30 bg-bgcolor/80 text-textcolor2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Primarycolor/50"
                required
              />
            </div>
            <div>
              <label htmlFor="reg-email" className="block text-xs font-medium text-muted mb-1">
                Email address
              </label>
              <input
                id="reg-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-Primarycolor/30 bg-bgcolor/80 text-textcolor2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Primarycolor/50"
                required
              />
            </div>
            <div>
              <label htmlFor="reg-password" className="block text-xs font-medium text-muted mb-1">
                Password (min 6 characters)
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-Primarycolor/30 bg-bgcolor/80 text-textcolor2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Primarycolor/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-Secondarycolor transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 text-sm rounded-lg bg-Primarycolor hover:bg-Primarycolor/90 text-white font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Creating account…"
                : formData.role === "client"
                  ? "Sign up as Client"
                  : "Sign up for a course"}
            </button>
          </form>

          <p className="text-xs text-muted mt-4">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              state={from ? { from } : undefined}
              className="text-Secondarycolor font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

