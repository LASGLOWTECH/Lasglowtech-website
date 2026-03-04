import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const from = location.state?.from || null;

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
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-bgcolor2 via-bgcolor to-bgcolor2 px-4 py-4 text-textcolor2">
      <div className="w-full max-w-5xl h-full max-h-[calc(100vh-2rem)] grid grid-cols-1 md:grid-cols-2 border border-Primarycolor/30 bg-bgcolor2 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 md:p-6 flex flex-col justify-center min-h-0 overflow-auto relative z-10 bg-bgcolor2">
          <Link
            to="/"
please i dont             className="inline-flex items-center gap-2 text-muted hover:text-Secondarycolor transition-colors mb-3 text-sm"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-xl font-semibold mb-1">Account Login</h1>
          <p className="text-muted text-sm mb-4">Login to continue with your role-specific dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full p-3 rounded-md bg-[#F6F5FA] text-black text-sm focus:outline-none"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 pr-12 rounded-md bg-[#F6F5FA] text-black text-sm focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-Primarycolor"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white px-6 py-2.5 text-sm bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor rounded-md duration-300"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
          
<div className="mt-3 text-sm flex justify-between items-center">
<p className="text-xs ">
            <Link to="/auth/forgot-password" className="text-xs text-Secondarycolor hover:underline">
              Forgot password?
            </Link>
          </p>

          <p className="text-xs text-muted mt-3">
            New user?{" "}
            <Link to="/auth/register" state={from ? { from } : undefined} className="text-Secondarycolor hover:underline">
              Create account
            </Link>
          </p>

  
</div>



        </div>

        <aside className="hidden md:block relative min-h-[320px] min-w-0 overflow-hidden z-0 bg-Primarycolor/10">
  <div
    className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
    style={{ transform: `translateX(-${slideIndex * 100}%)` }}
  >
    {authSlides.map((slide, idx) => (
      <div key={slide.title} className="relative min-w-full flex-shrink-0 bg-Primarycolor/20">
        <img
          src={slide.image}
          alt={slide.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length];
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bgcolor2/90 via-bgcolor2/60 to-bgcolor2/30" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-textcolor2">{slide.title}</h3>
          <p className="text-xs md:text-sm text-muted mt-1">{slide.text}</p>
        </div>
      </div>
    ))}
  </div>
  <div className="absolute bottom-3 left-4 md:left-6 flex gap-2">
    {authSlides.map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setSlideIndex(index)}
        className={`h-1.5 rounded-full transition-all ${
          slideIndex === index ? "w-6 bg-Secondarycolor" : "w-1.5 bg-white/40 hover:bg-white/60"
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
