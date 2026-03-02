import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import instance from "../config/axios.config";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await instance.post("/users/reset-password", {
        token,
        password: formData.password,
      });
      toast.success("Password reset successful. Please login.");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bgcolor2 via-bgcolor to-bgcolor2 px-6 py-10 md:py-16 text-textcolor2">
      <div className="max-w-lg mx-auto border border-Primarycolor/30 bg-bgcolor2 rounded-2xl overflow-hidden shadow-xl p-7 md:p-10">
        <h1 className="text-2xl font-semibold mb-2">Reset Password</h1>
        <p className="text-gray-400 mb-6 text-sm">Create a new secure password for your account.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New password"
              minLength={6}
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
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            minLength={6}
            className="w-full p-3 rounded-md bg-[#F6F5FA] text-black focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white px-6 py-3 bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor rounded-md duration-300"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <p className="text-sm text-gray-300 mt-5">
          Back to{" "}
          <Link to="/auth/login" className="text-Secondarycolor hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

