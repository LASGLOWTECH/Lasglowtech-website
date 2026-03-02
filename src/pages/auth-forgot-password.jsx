import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../config/axios.config";

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await instance.post("/users/forgot-password", { email });
      toast.success("If that email exists, a reset link has been sent.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bgcolor2 via-bgcolor to-bgcolor2 px-6 py-10 md:py-16 text-textcolor2">
      <div className="max-w-lg mx-auto border border-Primarycolor/30 bg-bgcolor2 rounded-2xl overflow-hidden shadow-xl p-7 md:p-10">
        <h1 className="text-2xl font-semibold mb-2">Forgot Password</h1>
        <p className="text-gray-400 mb-6 text-sm">
          Enter your account email and we will send you a secure reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full p-3 rounded-md bg-[#F6F5FA] text-black focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white px-6 py-3 bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor rounded-md duration-300"
          >
            {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPasswordPage;

