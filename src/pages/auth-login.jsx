import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import instance from "../config/axios.config";
import { getRoleHomePath, saveSession } from "../utils/auth";
// import { Slide1, Slide2, Slide3 } from "../components/images";
import { Land1, Land2, Land3 } from "../components/images";
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
];

const authSlides = [
  { image: Land1, title: "Crafted Digital Experiences", text: "Partner with a team focused on clean design, robust engineering, and measurable business impact." },
  { image: Land3, title: "Secure and Professional Delivery", text: "From strategy to launch, we build solutions that perform reliably and scale with your business." },
  { image: Land2, title: "Creative Services Marketplace", text: "Login to access premium catalogues, personalized checkout flow, and faster project onboarding." },
].map((slide, i) => ({ ...slide, image: slide.image || PLACEHOLDER_IMAGES[i] }));

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const from = location.state?.from || (redirectUrl ? decodeURIComponent(redirectUrl) : null);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % authSlides.length);
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
      const res = await instance.post("/users/login", formData);
      saveSession({ token: res.data.token, user: res.data.user });
      toast.success("Welcome back.");
      navigate(from || getRoleHomePath(res.data?.user?.role), { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-bgcolor text-textcolor2">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left: Form column – dark theme, full height */}
        <div className="p-6 md:p-12 lg:p-16 flex flex-col justify-center min-h-[420px] md:min-h-0 overflow-auto relative z-10 bg-bgcolor2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted hover:text-Secondarycolor transition-colors mb-6 text-sm"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-textcolor2 mb-1">Welcome back</h1>
          <p className="text-muted text-sm mb-6">Sign in to your account to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-muted mb-1.5">Email</label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3.5 rounded-lg bg-bgcolor/60 border border-Primarycolor/20 text-textcolor2 placeholder-muted text-sm focus:outline-none focus:ring-2 focus:ring-Primarycolor/50 focus:border-Primarycolor/50"
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="block text-sm font-medium text-muted">Password</label>
                <Link to="/auth/forgot-password" className="text-xs text-Secondarycolor hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 pr-12 rounded-lg bg-bgcolor/60 border border-Primarycolor/20 text-textcolor2 placeholder-muted text-sm focus:outline-none focus:ring-2 focus:ring-Primarycolor/50 focus:border-Primarycolor/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-textcolor2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white px-6 py-3 text-sm font-semibold bg-Primarycolor hover:bg-Primarycolor/90 rounded-lg transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-muted mt-5">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" state={from ? { from } : undefined} className="text-Secondarycolor font-medium hover:underline">
              Sign up
            </Link>
          </p>



        </div>

        {/* Right: Sliding image panel with gradient overlay and text (reference style) */}
        <aside className="relative min-h-[280px] md:min-h-0 min-w-0 overflow-hidden bg-Primarycolor">
          <div
            className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            {authSlides.map((slide, idx) => (
              <div key={slide.title} className="relative min-w-full flex-shrink-0">
                <img
                  src={slide.image}
                  alt=""
                  loading="lazy"
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
            {authSlides.map((_, index) => (
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
      </div>
    </div>
  );
};

export default LoginPage;
