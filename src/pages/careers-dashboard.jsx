import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  FaChartLine,
  FaFileAlt,
  FaBook,
  FaLayerGroup,
  FaGraduationCap,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaDownload,
  FaExternalLinkAlt,
  FaPlay,
  FaList,
  FaStickyNote,
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import instance from "../config/axios.config";
import { getToken, getUser } from "../utils/auth";
import SEO from "../utils/seo";

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};
const QUILL_FORMATS = ["header", "bold", "italic", "underline", "strike", "list", "bullet", "link"];

const downloadModuleNotesPdf = (module) => {
  const doc = new jsPDF();
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - margin * 2;
  const lineHeight = 6;
  let y = margin;

  doc.setFontSize(18);
  doc.text(`Module ${module.moduleOrder}: ${module.title}`, margin, y);
  y += 12;

  doc.setFontSize(10);
  const lines = doc.splitTextToSize(module.moduleContent || "", maxWidth);
  for (let i = 0; i < lines.length; i++) {
    if (y + lineHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(lines[i], margin, y);
    y += lineHeight;
  }

  const filename = `module-${module.moduleOrder}-${String(module.title).replace(/\s+/g, "-").toLowerCase()}.pdf`;
  doc.save(filename);
};

const statusClass = {
  new: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  reviewing: "text-blue-400 border-blue-400/40 bg-blue-400/10",
  accepted: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  waitlist: "text-orange-400 border-orange-400/40 bg-orange-400/10",
  rejected: "text-red-400 border-red-400/40 bg-red-400/10",
};

const levelClass = {
  beginner: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  intermediate: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  advanced: "text-rose-400 border-rose-400/30 bg-rose-400/10",
};

const courseFallbacks = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
];

const resolveAssetUrl = (url = "") => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/")) return `${instance.defaults.baseURL}${url}`;
  return `${instance.defaults.baseURL}/${url}`;
};

const SIDEBAR_SECTIONS = [
  { id: "overview", label: "Overview", icon: FaChartLine },
  { id: "applications", label: "Applications", icon: FaFileAlt },
  { id: "learning", label: "My Learning", icon: FaBook },
  { id: "modules", label: "Course Modules", icon: FaLayerGroup },
  { id: "browse", label: "Browse Courses", icon: FaGraduationCap },
];

const CareersDashboard = () => {
  const token = useMemo(() => getToken(), []);
  const user = useMemo(() => getUser(), []);
  const [applications, setApplications] = useState([]);
  const [latest, setLatest] = useState(null);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState("");
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [moduleSidebarOpen, setModuleSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");
  const [modulesLoading, setModulesLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [personalNotes, setPersonalNotes] = useState("");

  const firstName = String(latest?.full_name || user?.username || "Learner").split(" ")[0];

  const personalNotesKey = (id) => `lms-notes-${id}`;
  useEffect(() => {
    if (!selectedModuleId) {
      setPersonalNotes("");
      return;
    }
    try {
      setPersonalNotes(localStorage.getItem(personalNotesKey(selectedModuleId)) || "");
    } catch {
      setPersonalNotes("");
    }
  }, [selectedModuleId]);
  const savePersonalNotes = (value) => {
    setPersonalNotes(value);
    if (selectedModuleId) {
      try {
        localStorage.setItem(personalNotesKey(selectedModuleId), value);
      } catch {
        // ignore
      }
    }
  };

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [careerRes, lmsRes, coursesRes] = await Promise.all([
        instance.get("/careers/me", { headers }),
        instance.get("/lms/my/dashboard", { headers }),
        instance.get("/lms/courses"),
      ]);

      setApplications(careerRes.data?.applications || []);
      setLatest(careerRes.data?.latest || null);
      const enrolled = lmsRes.data?.enrollments || [];
      setEnrollments(enrolled);
      setCourses(coursesRes.data || []);
      if (!enrolled.length) {
        setSelectedEnrollmentId("");
        setModules([]);
      } else {
        setSelectedEnrollmentId((prev) => {
          if (prev && enrolled.some((e) => String(e.enrollmentId) === String(prev))) {
            return String(prev);
          }
          return String(enrolled[0].enrollmentId);
        });
      }
    } catch (e) {
      setError("Unable to load your learner dashboard right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  useEffect(() => {
    const loadModules = async () => {
      if (!selectedEnrollmentId) {
        setModules([]);
        return;
      }
      setModulesLoading(true);
      try {
        const res = await instance.get(`/lms/my/enrollments/${selectedEnrollmentId}/modules`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const loaded = res.data || [];
        setModules(loaded);
        setSelectedModuleId((prev) => {
          if (prev && loaded.some((m) => String(m.id) === String(prev))) return String(prev);
          return loaded[0] ? String(loaded[0].id) : "";
        });
      } catch (err) {
        setModules([]);
        setSelectedModuleId("");
      } finally {
        setModulesLoading(false);
      }
    };
    loadModules();
  }, [selectedEnrollmentId, token]);

  const toggleModuleComplete = async (module) => {
    if (!selectedEnrollmentId) return;
    try {
      await instance.put(
        `/lms/my/enrollments/${selectedEnrollmentId}/modules/${module.id}/progress`,
        {
          isCompleted: !module.isCompleted,
          lastPositionSeconds: module.lastPositionSeconds || 0,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setModules((prev) =>
        prev.map((m) =>
          m.id === module.id
            ? { ...m, isCompleted: !m.isCompleted, completedAt: !m.isCompleted ? new Date().toISOString() : null }
            : m
        )
      );
      loadData();
    } catch (err) {
      setError(err.response?.data?.error || "Unable to update module progress.");
    }
  };

  const enrolledIds = new Set(enrollments.map((e) => e.course.id));
  const selectedModule = modules.find((m) => String(m.id) === String(selectedModuleId)) || null;

  const handleEnroll = async (courseId) => {
    try {
      await instance.post(
        `/lms/enroll/${courseId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      loadData();
    } catch (err) {
      setError(err.response?.data?.error || "Enrollment failed.");
    }
  };

  const downloadCertificate = async (enrollmentId, courseTitle) => {
    try {
      const res = await instance.get(`/lms/my/enrollments/${enrollmentId}/certificate`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "text/html;charset=utf-8" });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = `certificate-${String(courseTitle || "course").replace(/\s+/g, "-").toLowerCase()}.html`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(href);
    } catch (err) {
      toast.error(err.response?.data?.error || "Certificate not available yet.");
    }
  };

  return (
    <div className="min-h-screen bg-bgcolor text-textcolor2 flex">
      <SEO
        title="Learner Dashboard | Lasglowtech"
        description="Track your career application and learning progress."
        url="https://www.lasglowtech.com.ng/careers/dashboard"
      />

      {/* Main collapsible sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-56" : "w-16"
        } flex-shrink-0 border-r border-Primarycolor/30 bg-bgcolor2/80 transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-4 border-b border-Primarycolor/20 flex items-center justify-between">
          {sidebarOpen && (
            <span className="text-sm font-semibold text-Secondarycolor truncate">Dashboard</span>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className="p-2 rounded-lg hover:bg-Primarycolor/20 text-gray-400 hover:text-Secondarycolor transition-colors"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <FaChevronLeft className="w-4 h-4" /> : <FaChevronRight className="w-4 h-4" />}
          </button>
        </div>
        <nav className="flex-1 py-4 px-2 space-y-1">
          {SIDEBAR_SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === id
                  ? "bg-Primarycolor/30 text-Secondarycolor border border-Primarycolor/40"
                  : "text-gray-400 hover:bg-Primarycolor/10 hover:text-textcolor2"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="truncate">{label}</span>}
            </button>
          ))}
        </nav>
        {sidebarOpen && (
          <div className="p-3 border-t border-Primarycolor/20">
            <Link
              to="/careers"
              className="block text-center text-xs text-Secondarycolor hover:underline"
            >
              New Application
            </Link>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b border-Primarycolor/20 bg-bgcolor/95 backdrop-blur-sm px-4 md:px-8 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-Primarycolor/40 bg-Primarycolor/20 flex items-center justify-center text-lg font-semibold text-Secondarycolor">
                {latest?.picture_url ? (
                  <img src={latest.picture_url} alt={firstName} className="w-full h-full object-cover" />
                ) : (
                  <span>{firstName.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div>
                <h1 className="text-lg font-semibold text-textcolor2">Welcome, {firstName}</h1>
                <p className="text-xs text-gray-500">Your learning journey and progress</p>
              </div>
            </div>
            <Link
              to="/careers"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-Primarycolor/40 hover:bg-Primarycolor/20 text-sm transition-colors"
            >
              New Application
            </Link>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <p className="text-gray-400">Loading dashboard...</p>
            </div>
          )}
          {!loading && error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300 text-sm">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Overview */}
              {activeSection === "overview" && (
                <section className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-textcolor2 mb-1">Overview</h2>
                    <p className="text-sm text-gray-500 mb-5">Your activity at a glance</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <article className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 p-6 hover:border-Primarycolor/40 hover:shadow-lg hover:shadow-Primarycolor/5 transition-all duration-200">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Applications</p>
                        <p className="text-3xl font-bold text-textcolor2 mt-2 tabular-nums">{applications.length}</p>
                        <p className="text-sm text-gray-400 mt-1">Career applications submitted</p>
                      </article>
                      <article className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 p-6 hover:border-Primarycolor/40 hover:shadow-lg hover:shadow-Primarycolor/5 transition-all duration-200">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Enrolled</p>
                        <p className="text-3xl font-bold text-textcolor2 mt-2 tabular-nums">{enrollments.length}</p>
                        <p className="text-sm text-gray-400 mt-1">Active courses</p>
                      </article>
                      <article className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 p-6 hover:border-Primarycolor/40 hover:shadow-lg hover:shadow-Primarycolor/5 transition-all duration-200">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Latest status</p>
                        <p className="mt-2">
                          <span
                            className={`inline-flex px-3 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider ${
                              statusClass[latest?.status] || "text-gray-400 border-gray-500/40"
                            }`}
                          >
                            {latest?.status || "—"}
                          </span>
                        </p>
                        <p className="text-sm text-gray-400 mt-2">Application status</p>
                      </article>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 p-6">
                    <h2 className="text-lg font-semibold text-textcolor2 mb-1">Quick actions</h2>
                    <p className="text-sm text-gray-400 mb-5">Jump to a section from the sidebar or use the buttons below.</p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveSection("applications")}
                        className="px-4 py-2 rounded-lg border border-Primarycolor/40 hover:bg-Primarycolor/20 text-sm"
                      >
                        View Applications
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveSection("modules")}
                        className="px-4 py-2 rounded-lg border border-Primarycolor/40 hover:bg-Primarycolor/20 text-sm"
                      >
                        Open Course Modules
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveSection("browse")}
                        className="px-4 py-2 rounded-lg border border-Secondarycolor/50 text-Secondarycolor hover:bg-Secondarycolor/10 text-sm"
                      >
                        Browse Courses
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* Applications */}
              {activeSection === "applications" && (
                <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 overflow-hidden">
                  <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
                    <div>
                      <h2 className="text-xl font-semibold text-textcolor2">Career application</h2>
                      <p className="text-sm text-gray-500 mt-0.5">Admission and review status</p>
                    </div>
                    <Link
                      to="/careers"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-Primarycolor/40 hover:bg-Primarycolor/20 text-sm transition-colors"
                    >
                      New Application
                    </Link>
                  </div>
                  <div className="p-6">
                  {!latest && <p className="text-gray-400">No application yet.</p>}
                  {!!latest && (
                    <div className="space-y-5">
                      <span
                        className={`inline-flex px-3 py-1.5 rounded-full border text-xs font-medium uppercase tracking-wider ${
                          statusClass[latest.status] || "text-gray-400 border-gray-500/40"
                        }`}
                      >
                        {latest.status}
                      </span>
                      <p className="text-sm text-gray-300">
                        <span className="text-gray-500">Skill:</span> {latest.skill_interest} —{" "}
                        <span className="text-gray-500">Experience:</span> {latest.experience_level || "N/A"}
                      </p>
                      <p className="text-sm text-gray-300">
                        <span className="text-gray-500">Learning goal:</span> {latest.learning_goal}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <p><span className="text-gray-500">Full name:</span> {latest.full_name}</p>
                        <p><span className="text-gray-500">Email:</span> {latest.email}</p>
                        <p><span className="text-gray-500">Phone:</span> {latest.phone}</p>
                        <p><span className="text-gray-500">Availability:</span> {latest.availability || "N/A"}</p>
                        <p><span className="text-gray-500">Country:</span> {latest.country || "N/A"}</p>
                        <p><span className="text-gray-500">City:</span> {latest.city || "N/A"}</p>
                        <p><span className="text-gray-500">Cohort:</span> {latest.cohort || "Not assigned"}</p>
                        <p><span className="text-gray-500">Fee:</span> NGN {Number(latest.fee_amount || 0).toLocaleString()}</p>
                        <p><span className="text-gray-500">Payment:</span> {latest.payment_status || "unpaid"}</p>
                        {latest.portfolio_url && (
                          <p className="md:col-span-2">
                            <span className="text-gray-500">Portfolio:</span>{" "}
                            <a href={latest.portfolio_url} target="_blank" rel="noreferrer" className="text-Secondarycolor hover:underline break-all">
                              {latest.portfolio_url}
                            </a>
                          </p>
                        )}
                        {!!latest.admin_notes && (
                          <p className="md:col-span-2"><span className="text-gray-500">Admin notes:</span> {latest.admin_notes}</p>
                        )}
                        <p className="md:col-span-2 text-xs text-gray-500">
                          Submitted: {new Date(latest.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  </div>
                </section>
              )}

              {/* My Learning */}
              {activeSection === "learning" && (
                <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 overflow-hidden">
                  <div className="px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
                    <h2 className="text-xl font-semibold text-textcolor2">My learning progress</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Progress across enrolled courses</p>
                  </div>
                  <div className="p-6">
                  {enrollments.length === 0 && (
                    <p className="text-gray-400">No enrolled courses yet. Browse courses and enroll to get started.</p>
                  )}
                  <div className="space-y-5">
                    {enrollments.map((en) => (
                      <article
                        key={en.enrollmentId}
                        className="rounded-xl border border-Primarycolor/20 bg-bgcolor/50 p-6 hover:border-Primarycolor/30 transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-semibold text-textcolor2">{en.course.title}</p>
                          <span
                            className={`text-xs uppercase px-2.5 py-1 rounded-full border font-medium ${
                              levelClass[en.course.level] || "text-gray-400 border-gray-500/30"
                            }`}
                          >
                            {en.course.level}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          {en.completedModules} / {en.totalModules} modules — {en.progressPercent}%
                        </p>
                        <div className="w-full h-2.5 bg-bgcolor2 rounded-full mt-3 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-Primarycolor to-Secondarycolor rounded-full transition-all duration-500"
                            style={{ width: `${en.progressPercent}%` }}
                          />
                        </div>
                        {Number(en.progressPercent) >= 100 && (
                          <button
                            type="button"
                            onClick={() => downloadCertificate(en.enrollmentId, en.course.title)}
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-sm transition-colors"
                          >
                            <FaDownload /> Download Certificate
                          </button>
                        )}
                      </article>
                    ))}
                  </div>
                  </div>
                </section>
              )}

              {/* Course Modules (LMS) with toggleable module sidebar */}
              {activeSection === "modules" && (
                <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
                    <div>
                      <h2 className="text-xl font-semibold text-textcolor2">Course modules</h2>
                      <p className="text-sm text-gray-500 mt-0.5">Lessons, notes, and resources</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <select
                        value={selectedEnrollmentId}
                        onChange={(e) => {
                          setSelectedEnrollmentId(e.target.value);
                        }}
                        className="px-4 py-2.5 rounded-lg bg-bgcolor border border-Primarycolor/30 text-textcolor2 text-sm min-w-[200px] focus:outline-none focus:ring-2 focus:ring-Primarycolor/50"
                        disabled={!enrollments.length}
                      >
                        {!enrollments.length && <option value="">No enrollments</option>}
                        {enrollments.map((en) => (
                          <option key={en.enrollmentId} value={en.enrollmentId}>
                            {en.course.title}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setModuleSidebarOpen((o) => !o)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-Primarycolor/40 hover:bg-Primarycolor/20 text-sm transition-colors"
                        disabled={!modules.length}
                        title={moduleSidebarOpen ? "Hide module list" : "Show module list"}
                      >
                        <FaList className="w-4 h-4" />
                        {moduleSidebarOpen ? "Hide modules" : "Show modules"}
                      </button>
                    </div>
                  </div>

                  {modulesLoading && <p className="text-gray-400 text-sm">Loading modules...</p>}
                  {!modulesLoading && !modules.length && (
                    <p className="text-gray-400 text-sm">No modules for this course yet, or select an enrolled course.</p>
                  )}

                  {!modulesLoading && modules.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {/* Toggleable module sidebar */}
                      <aside
                        className={`${
                          moduleSidebarOpen ? "w-72 flex-shrink-0" : "w-0 overflow-hidden opacity-0"
                        } transition-all duration-300 ease-in-out`}
                      >
                        <div className="rounded-xl border border-Primarycolor/20 bg-bgcolor/50 p-4 sticky top-24">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Modules</p>
                          <div className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto pr-1 custom-scrollbar">
                            {modules.map((module) => {
                              const active = String(module.id) === String(selectedModuleId);
                              return (
                                <button
                                  key={module.id}
                                  type="button"
                                  onClick={() => setSelectedModuleId(String(module.id))}
                                  className={`w-full text-left rounded-lg border p-3 transition-all ${
                                    active
                                      ? "border-Secondarycolor/50 bg-Secondarycolor/10 text-Secondarycolor"
                                      : "border-Primarycolor/20 hover:border-Primarycolor/40 hover:bg-Primarycolor/5"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {module.isCompleted && (
                                      <FaCheckCircle className="w-4 text-emerald-400 flex-shrink-0" />
                                    )}
                                    <div className="min-w-0">
                                      <p className="text-xs text-gray-500">Module {module.moduleOrder}</p>
                                      <p className="text-sm font-medium truncate">{module.title}</p>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </aside>

                      {/* Module content */}
                      <article className="flex-1 min-w-0 rounded-xl border border-Primarycolor/20 bg-bgcolor/30 p-6">
                        {!selectedModule && (
                          <p className="text-gray-400 text-sm">Select a module from the list to view content.</p>
                        )}
                        {!!selectedModule && (
                          <div className="space-y-6">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Module {selectedModule.moduleOrder}</p>
                                <h3 className="text-xl font-semibold text-textcolor2 mt-1">{selectedModule.title}</h3>
                              </div>
                              <button
                                type="button"
                                onClick={() => toggleModuleComplete(selectedModule)}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                                  selectedModule.isCompleted
                                    ? "border-emerald-400/50 text-emerald-400 bg-emerald-400/10"
                                    : "border-Primarycolor/40 text-textcolor2 hover:bg-Primarycolor/20"
                                }`}
                              >
                                <FaCheckCircle className="w-4" />
                                {selectedModule.isCompleted ? "Completed" : "Mark complete"}
                              </button>
                            </div>

                            <p className="text-xs text-gray-500">
                              Estimated duration: {selectedModule.durationMinutes} mins
                            </p>

                            {!!selectedModule.moduleContent && (
                              <div className="rounded-xl border border-Primarycolor/20 bg-bgcolor2/40 overflow-hidden">
                                <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-Primarycolor/20 bg-bgcolor/30">
                                  <span className="text-sm font-semibold text-textcolor2">Course notes</span>
                                  <button
                                    type="button"
                                    onClick={() => downloadModuleNotesPdf(selectedModule)}
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-Primarycolor/40 hover:bg-Primarycolor/20 text-xs font-medium transition-colors"
                                  >
                                    <FaDownload /> Download as PDF
                                  </button>
                                </div>
                                <div className="p-5 prose prose-invert prose-sm max-w-none">
                                  {/<[a-z][\s\S]*>/i.test(selectedModule.moduleContent) ? (
                                    <div
                                      className="lms-module-notes text-gray-200 leading-relaxed break-words [&_a]:text-Secondarycolor [&_a]:underline [&_ul]:list-disc [&_ol]:list-decimal [&_ul,_ol]:pl-5 [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm"
                                      dangerouslySetInnerHTML={{ __html: selectedModule.moduleContent }}
                                    />
                                  ) : (
                                    <p className="text-gray-200 leading-relaxed whitespace-pre-line break-words">
                                      {selectedModule.moduleContent}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}

                            <div className="rounded-xl border border-Primarycolor/20 bg-bgcolor2/40 overflow-hidden">
                              <div className="flex items-center gap-2 px-5 py-3 border-b border-Primarycolor/20 bg-bgcolor/30">
                                <FaStickyNote className="w-4 h-4 text-Secondarycolor" />
                                <span className="text-sm font-semibold text-textcolor2">My notes</span>
                              </div>
                              <div className="min-h-[180px] [&_.ql-container]:border-0 [&_.ql-editor]:min-h-[160px] [&_.ql-editor]:text-sm [&_.ql-toolbar]:border-Primarycolor/20 [&_.ql-toolbar]:bg-bgcolor/30 [&_.ql-toolbar_.ql-stroke]:stroke-gray-500 [&_.ql-toolbar_.ql-fill]:fill-gray-500 [&_.ql-toolbar_button]:text-gray-400 [&_.ql-editor]:text-gray-200">
                                <ReactQuill
                                  theme="snow"
                                  value={personalNotes}
                                  onChange={savePersonalNotes}
                                  modules={QUILL_MODULES}
                                  formats={QUILL_FORMATS}
                                  placeholder="Add your own notes for this module..."
                                />
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                              {!!selectedModule.resourceUrl && (
                                <a
                                  href={resolveAssetUrl(selectedModule.resourceUrl)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-Primarycolor/40 hover:bg-Primarycolor/20 text-sm font-medium transition-colors"
                                >
                                  <FaExternalLinkAlt /> Resource doc
                                </a>
                              )}
                            </div>

                            {!!selectedModule.videoUrl && (
                              <div className="rounded-xl border border-Primarycolor/20 bg-bgcolor2/40 p-4">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Video</p>
                                <a
                                  href={resolveAssetUrl(selectedModule.videoUrl)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-2 text-Secondarycolor hover:underline text-sm font-medium"
                                >
                                  <FaPlay /> Watch lesson video
                                </a>
                              </div>
                            )}

                            {!!selectedModule.referenceLinks?.length && (
                              <div className="rounded-xl border border-Primarycolor/20 bg-bgcolor2/40 p-4">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">References</p>
                                <ul className="space-y-2">
                                  {selectedModule.referenceLinks.map((link) => (
                                    <li key={link}>
                                      <a
                                        href={resolveAssetUrl(link)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm text-Secondarycolor hover:underline break-all"
                                      >
                                        {link}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </article>
                    </div>
                  )}
                </section>
              )}

              {/* Browse Courses */}
              {activeSection === "browse" && (
                <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 overflow-hidden">
                  <div className="px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
                    <h2 className="text-xl font-semibold text-textcolor2">Available courses</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Enroll to start your learning path</p>
                  </div>
                  <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course) => (
                      <article
                        key={course.id}
                        className="rounded-xl border border-Primarycolor/20 bg-bgcolor/50 overflow-hidden hover:border-Primarycolor/40 hover:shadow-lg hover:shadow-Primarycolor/5 transition-all duration-200"
                      >
                        <img
                          src={course.imageUrl || courseFallbacks[course.id % courseFallbacks.length]}
                          alt={course.title}
                          className="w-full h-44 object-cover border-b border-Primarycolor/20"
                        />
                        <div className="p-6">
                          <p className="font-semibold text-textcolor2 text-lg">{course.title}</p>
                          <p className="text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed">{course.summary}</p>
                          <p className="text-xs font-medium text-gray-500 mt-3 uppercase tracking-wider">
                            {course.level} · {course.durationWeeks} weeks
                          </p>
                          <button
                            type="button"
                            onClick={() => handleEnroll(course.id)}
                            disabled={enrolledIds.has(course.id)}
                            className="mt-4 w-full py-2.5 rounded-lg border border-Primarycolor/40 hover:bg-Primarycolor/20 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {enrolledIds.has(course.id) ? "Enrolled" : "Enroll"}
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                  {!courses.length && <p className="text-gray-400 text-sm">No courses published yet.</p>}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CareersDashboard;
