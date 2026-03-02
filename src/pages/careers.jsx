import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaCheckCircle,
  FaClock,
  FaLaptopCode,
  FaPalette,
  FaUserCircle,
  FaArrowRight,
  FaGraduationCap,
} from "react-icons/fa";
import instance from "../config/axios.config";
import SEO from "../utils/seo";
import { getToken, getUser } from "../utils/auth";

const defaultForm = {
  fullName: "",
  email: "",
  phone: "",
  skillInterest: "",
  learningGoal: "",
  experienceLevel: "",
  availability: "",
  city: "",
  country: "",
  portfolioUrl: "",
};

const skillOptions = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Graphic Design",
  "Digital Product Management",
  "Content / Social Media Design",
];

const experienceOptions = ["Beginner", "Intermediate", "Advanced"];
const availabilityOptions = ["Weekdays", "Weekends", "Evenings", "Flexible"];
const countryOptions = ["Nigeria", "Ghana", "Kenya", "South Africa", "Other"];

const highlights = [
  {
    icon: FaLaptopCode,
    title: "Structured Learning",
    text: "Clear modules, practical projects, and mentorship support from working professionals.",
  },
  {
    icon: FaPalette,
    title: "Industry-Aligned Tracks",
    text: "Choose from design, development, and product-focused tracks relevant to current market demand.",
  },
  {
    icon: FaClock,
    title: "Flexible Schedule",
    text: "Programs are built for students, professionals, and founders with varying availability.",
  },
];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-bgcolor2/60 border border-Primarycolor/25 text-textcolor2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Primarycolor/50 focus:border-transparent transition-shadow";
const labelClass = "block text-sm font-medium text-gray-400 mb-1.5";

const Careers = () => {
  const navigate = useNavigate();
  const sessionUser = useMemo(() => getUser(), []);
  const token = useMemo(() => getToken(), []);

  const [form, setForm] = useState({
    ...defaultForm,
    fullName: sessionUser?.username || "",
    email: sessionUser?.email || "",
  });
  const [pictureFile, setPictureFile] = useState(null);
  const [picturePreview, setPicturePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let pictureUrl = "";

      if (pictureFile) {
        const fd = new FormData();
        fd.append("file", pictureFile);
        const uploadRes = await instance.post("/upload/images", fd, {
          headers: { Authorization: `Bearer ${token}` },
        });
        pictureUrl = `${instance.defaults.baseURL}/uploads/images/${uploadRes.data}`;
      }

      await instance.post(
        "/careers/apply",
        {
          ...form,
          pictureUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Application submitted successfully.");
      navigate("/careers/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message || "Unable to submit application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgcolor text-textcolor2">
      <SEO
        title="Tutoring & Training | Learn Tech Skills with Lasglowtech Nigeria"
        description="Apply for Lasglowtech tutoring and training programmes—web development, mobile apps, UI/UX, design. Structured learning, LMS access, and hands-on projects. Start your tech career or upskill your team."
        keywords="Lasglowtech tutoring, tech training Nigeria, learn web development, learn UI UX, IT training, career in tech, Lasglowtech careers, service catalogue, instant checkout"
        url="https://www.lasglowtech.com.ng/careers"
        schema={{
          "@context": "https://schema.org",
          "@type": "EducationalOccupationalProgram",
          name: "Lasglowtech Skill Learning Program",
          provider: {
            "@type": "Organization",
            name: "Lasglowtech",
            url: "https://www.lasglowtech.com.ng",
          },
        }}
      />

      {/* Hero */}
      <section className="border-b border-Primarycolor/20 bg-bgcolor2/30">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-Primarycolor/30 bg-Primarycolor/10 text-sm text-Secondarycolor mb-4">
                <FaGraduationCap className="w-4 h-4" />
                Career Learning Program
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-textcolor2 tracking-tight">
                Build in-demand digital skills
              </h1>
              <p className="text-base text-gray-400 mt-3 max-w-xl leading-relaxed">
                Structured learning path, real project exposure, and mentorship from industry practitioners.
              </p>
              {sessionUser?.email && (
                <p className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                  <FaUserCircle className="w-4 h-4 text-Primarycolor/60" />
                  Signed in as {sessionUser.email}
                </p>
              )}
            </div>
            <Link
              to="/careers/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-Primarycolor/40 bg-Primarycolor/10 hover:bg-Primarycolor/20 text-Secondarycolor font-medium transition-colors shrink-0"
            >
              My Dashboard
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar: Why Lasglowtech + Checklist */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 p-6">
              <h2 className="text-xl font-semibold text-textcolor2 mb-2">Why learn with Lasglowtech</h2>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                We combine mentorship, practical assignments, and performance feedback to help you build job-ready skills.
              </p>

              <div className="space-y-4">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex gap-4 p-4 rounded-xl border border-Primarycolor/20 bg-bgcolor/50 hover:border-Primarycolor/30 transition-colors"
                    >
                      <span className="w-10 h-10 rounded-xl bg-Primarycolor/20 text-Secondarycolor flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-textcolor2">{item.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 p-5">
              <h3 className="text-sm font-semibold text-Secondarycolor mb-3 flex items-center gap-2">
                <FaCheckCircle className="w-4 h-4" />
                Application checklist
              </h3>
              <ul className="space-y-2.5 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-Secondarycolor mt-0.5">•</span>
                  Choose a skill track aligned to your goal
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-Secondarycolor mt-0.5">•</span>
                  Share your learning objective clearly
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-Secondarycolor mt-0.5">•</span>
                  Provide contact details for updates
                </li>
              </ul>
            </div>
          </aside>

          {/* Form */}
          <section className="lg:col-span-3 rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-textcolor2 mb-1">Submit your application</h2>
            <p className="text-sm text-gray-500 mb-8">Complete the form below to start your admission review.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Personal info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className={labelClass}>Full name *</label>
                    <input
                      id="fullName"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="phone" className={labelClass}>Phone number *</label>
                    <input
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+234 ..."
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Skill & experience</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="skillInterest" className={labelClass}>Skill track *</label>
                    <select
                      id="skillInterest"
                      name="skillInterest"
                      value={form.skillInterest}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    >
                      <option value="">Select a track</option>
                      {skillOptions.map((skill) => (
                        <option key={skill} value={skill}>{skill}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="experienceLevel" className={labelClass}>Experience level</label>
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      value={form.experienceLevel}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select level</option>
                      {experienceOptions.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="availability" className={labelClass}>Availability</label>
                    <select
                      id="availability"
                      name="availability"
                      value={form.availability}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select availability</option>
                      {availabilityOptions.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className={labelClass}>City</label>
                    <input
                      id="city"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="City"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className={labelClass}>Country</label>
                    <select
                      id="country"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select country</option>
                      {countryOptions.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="portfolioUrl" className={labelClass}>Portfolio / LinkedIn URL</label>
                <input
                  id="portfolioUrl"
                  name="portfolioUrl"
                  value={form.portfolioUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Profile picture (optional)</label>
                <div className="flex flex-wrap items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setPictureFile(file);
                      if (file) setPicturePreview(URL.createObjectURL(file));
                    }}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-Primarycolor/30 file:bg-bgcolor file:text-Secondarycolor file:text-sm file:font-medium hover:file:bg-Primarycolor/20"
                  />
                  {picturePreview && (
                    <img
                      src={picturePreview}
                      alt="Profile preview"
                      className="w-16 h-16 object-cover rounded-full border-2 border-Primarycolor/40"
                    />
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="learningGoal" className={labelClass}>Learning goal & motivation *</label>
                <textarea
                  id="learningGoal"
                  name="learningGoal"
                  value={form.learningGoal}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us your learning goal and why you're applying..."
                  className={`${inputClass} resize-y min-h-[100px]`}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor/90 text-white font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit application"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Careers;
