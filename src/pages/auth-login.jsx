import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import instance from "../config/axios.config";
import { getRoleHomePath, saveSession } from "../utils/auth";
import { Slide1, Slide2, Slide3 } from "../components/images";

const authSlides = [
  {
    image: Slide1,
    title: "Crafted Digital Experiences",
    text: "Partner with a team focused on clean design, robust engineering, and measurable business impact.",
  },
  {
    image: Slide2,
    title: "Secure and Professional Delivery",
    text: "From strategy to launch, we build solutions that perform reliably and scale with your business.",
  },
  {
    image: Slide3,
    title: "Creative Services Marketplace",
    text: "Login to access premium catalogues, personalized checkout flow, and faster project onboarding.",
  },
];

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
    <div className="min-h-screen bg-gradient-to-br from-bgcolor2 via-bgcolor to-bgcolor2 px-6 py-10 md:py-16 text-textcolor2">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 border border-Primarycolor/30 bg-bgcolor2 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-7 md:p-10 relative z-10 bg-bgcolor2">
          <h1 className="text-2xl font-semibold mb-2">Account Login</h1>
          <p className="text-gray-400 mb-6">Login to continue with your role-specific dashboard and workflow.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full p-3 rounded-md bg-[#F6F5FA] text-black focus:outline-none"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 pr-12 rounded-md bg-[#F6F5FA] text-black focus:outline-none"
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
              className="w-full text-white px-6 py-3 bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor rounded-md duration-300"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="mt-4">
            <Link to="/auth/forgot-password" className="text-sm text-Secondarycolor hover:underline">
              Forgot password?
            </Link>
          </div>

          <p className="text-sm text-gray-300 mt-5">
            New user?{" "}
            <Link to="/auth/register" state={from ? { from } : undefined} className="text-Secondarycolor hover:underline">
              Create account
            </Link>
          </p>
        </div>

        <aside className="hidden md:block relative min-h-[540px] overflow-hidden z-0">
          <div
            className="h-full w-full flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            {authSlides.map((slide) => (
              <div key={slide.title} className="relative min-w-full h-full">
                <img src={slide.image} alt={slide.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-bgcolor2/95 via-bgcolor2/60 to-bgcolor2/20" />
                <div className="absolute bottom-0 p-8">
                  <h3 className="text-xl font-semibold text-textcolor2">{slide.title}</h3>
                  <p className="text-sm text-gray-300 mt-2">{slide.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-8 flex gap-2">
            {authSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setSlideIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  slideIndex === index ? "w-7 bg-Secondarycolor" : "w-2 bg-white/50"
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
