import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import instance from "../config/axios.config";
import { saveAdminSession } from "../utils/adminAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await instance.post("/admin/login", formData);
      saveAdminSession({
        token: res.data?.token,
        admin: res.data?.admin,
      });
      toast.success("Admin login successful.");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to login as admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-16 bg-gradient-to-br from-bgcolor2 via-bgcolor to-bgcolor2 text-textcolor2">
      <div className="max-w-md mx-auto bg-bgcolor2 border border-Primarycolor/30 rounded-2xl p-7 shadow-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-Secondarycolor">Lasglowtech</p>
        <h1 className="text-2xl font-semibold mt-2">Admin Control Center</h1>
        <p className="text-gray-400 mt-2 mb-6">Sign in to manage blogs and service catalogues.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Admin email"
            className="w-full p-3 rounded-md bg-[#f6f6f8] text-black focus:outline-none"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 pr-12 rounded-md bg-[#f6f6f8] text-black focus:outline-none"
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
            className="w-full py-3 rounded-md bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor font-semibold text-white"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
