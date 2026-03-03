import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import instance from "../config/axios.config";
import { getRoleHomePath, saveSession } from "../utils/auth";
import { Land1, Land2, Land3 } from "../components/images";

const registerSlides = [
  {
    image: Land1,
    title: "Welcome to Lasglowtech",
    text: "Create your client account and gain fast access to our curated digital service catalogues.",
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
];

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-Primarycolor/30 bg-bgcolor/80 text-textcolor2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Primarycolor/50 focus:border-Primarycolor/50 transition-colors";
const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || null;

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
    <div className="h-screen overflow-hidden flex items-center justify-center bg-bgcolor px-4 py-4">
      <div className="w-full max-w-5xl h-full max-h-[calc(100vh-2rem)] grid grid-cols-1 lg:grid-cols-2 rounded-xl border border-Primarycolor/25 bg-bgcolor2/60 overflow-hidden shadow-xl">
        {/* Form side */}
        <div className="p-4 md:p-6 flex flex-col justify-center min-h-0 overflow-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-Secondarycolor transition-colors mb-3 text-sm"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-textcolor2">Create account</h1>
            <p className="text-gray-400 mt-0.5 text-xs md:text-sm">
              Choose your role—client, learner, or talent.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="reg-username" className="block text-xs font-medium text-gray-300 mb-1">
                Full name
              </label>
              <input
                id="reg-username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-3 py-2 rounded-lg border border-Primarycolor/30 bg-bgcolor/80 text-textcolor2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Primarycolor/50"
                required
              />
            </div>
            <div>
              <label htmlFor="reg-email" className="block text-xs font-medium text-gray-300 mb-1">
                Email address
              </label>
              <input
                id="reg-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-3 py-2 rounded-lg border border-Primarycolor/30 bg-bgcolor/80 text-textcolor2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Primarycolor/50"
                required
              />
            </div>
            <div>
              <label htmlFor="reg-role" className="block text-xs font-medium text-gray-300 mb-1">
                I want to
              </label>
              <select
                id="reg-role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-Primarycolor/30 bg-bgcolor/80 text-textcolor2 text-sm focus:outline-none focus:ring-2 focus:ring-Primarycolor/50 cursor-pointer"
              >
                <option value="client">Use services & catalogue (Client)</option>
                <option value="learner">Learn skills (Learner)</option>
                <option value="student">Learn skills (Student)</option>
                <option value="talent">Join as talent</option>
              </select>
            </div>
            <div>
              <label htmlFor="reg-password" className="block text-xs font-medium text-gray-300 mb-1">
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
                  className="w-full px-3 py-2 pr-10 rounded-lg border border-Primarycolor/30 bg-bgcolor/80 text-textcolor2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Primarycolor/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-Secondarycolor transition-colors p-1"
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
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-4">
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

        {/* Slides side */}
        <aside className="hidden lg:block relative min-h-0 flex-1 overflow-hidden bg-bgcolor/50">
          <div
            className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            {registerSlides.map((slide) => (
              <div key={slide.title} className="relative min-w-full flex-shrink-0">
                <img
                  src={slide.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bgcolor/95 via-bgcolor/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-textcolor2">{slide.title}</h3>
                  <p className="text-xs md:text-sm text-gray-400 mt-1">{slide.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 left-4 md:left-6 flex gap-2">
            {registerSlides.map((_, index) => (
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

export default RegisterPage;
