import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { FaUser, FaSave, FaTrash } from "react-icons/fa";
import instance from "../../config/axios.config";
import { getAdminToken } from "../../utils/adminAuth";

const statusOptions = [
  { value: "new", label: "New" },
  { value: "reviewing", label: "Reviewing" },
  { value: "accepted", label: "Accepted" },
  { value: "waitlist", label: "Waitlist" },
  { value: "rejected", label: "Rejected" },
];

const paymentOptions = [
  { value: "unpaid", label: "Unpaid" },
  { value: "part_paid", label: "Part Paid" },
  { value: "paid", label: "Paid" },
  { value: "waived", label: "Waived" },
];

const statusBadgeClass = {
  new: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  reviewing: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  accepted: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  waitlist: "bg-orange-500/20 text-orange-300 border-orange-500/40",
  rejected: "bg-red-500/20 text-red-300 border-red-500/40",
};

const inputClass =
  "w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Primarycolor/50 focus:border-transparent text-sm";
const labelClass = "block text-sm font-medium text-gray-400 mb-1.5";

const CareersAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState({});

  const headers = useMemo(() => ({ Authorization: `Bearer ${getAdminToken()}` }), []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/careers/admin", { headers });
      setApplications(res.data || []);
      const nextDrafts = {};
      (res.data || []).forEach((app) => {
        nextDrafts[app.id] = {
          status: app.status || "new",
          adminNotes: app.admin_notes || "",
          feeAmount: app.fee_amount || 0,
          paymentStatus: app.payment_status || "unpaid",
          followUpDate: app.follow_up_date ? String(app.follow_up_date).slice(0, 10) : "",
          cohort: app.cohort || "",
        };
      });
      setDrafts(nextDrafts);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load career applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id) => {
    const payload = drafts[id] || {};
    try {
      await instance.put(`/careers/admin/${id}`, payload, { headers });
      toast.success("Application updated.");
      fetchApplications();
    } catch (error) {
      toast.error("Unable to update application.");
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await instance.delete(`/careers/admin/${id}`, { headers });
      toast.success("Application deleted.");
      fetchApplications();
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  return (
    <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 overflow-hidden">
      <div className="px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
        <h2 className="text-xl font-semibold text-textcolor2">Career applications</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage candidates applying to learn skills with Lasglowtech.
        </p>
      </div>

      <div className="p-6">
        {loading && (
          <p className="text-gray-400 py-8 text-center">Loading applications…</p>
        )}

        {!loading && (
          <div className="space-y-6">
            {applications.map((app) => (
              <article
                key={app.id}
                className="rounded-xl border border-Primarycolor/20 bg-bgcolor/50 overflow-hidden"
              >
                {/* Candidate info */}
                <div className="p-5 md:p-6 border-b border-Primarycolor/20">
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-shrink-0">
                      {app.picture_url ? (
                        <img
                          src={app.picture_url}
                          alt={app.full_name}
                          className="w-20 h-20 rounded-xl object-cover border border-Primarycolor/30"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-xl border border-Primarycolor/30 bg-bgcolor2 flex items-center justify-center text-gray-500">
                          <FaUser className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      <p className="font-semibold text-textcolor2 sm:col-span-2">{app.full_name}</p>
                      <p className="text-gray-300">
                        <span className="text-gray-500">Email</span>
                        <br />
                        <a href={`mailto:${app.email}`} className="text-Secondarycolor hover:underline break-all">
                          {app.email}
                        </a>
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-500">Phone</span>
                        <br />
                        {app.phone || "—"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-500">Skill</span>
                        <br />
                        {app.skill_interest || "—"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-500">Experience</span>
                        <br />
                        {app.experience_level || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-500">Availability</span>
                        <br />
                        {app.availability || "N/A"}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-gray-500">Location</span>
                        <br />
                        {[app.city, app.country].filter(Boolean).join(", ") || "—"}
                      </p>
                      {app.portfolio_url && (
                        <p className="text-gray-300 sm:col-span-2">
                          <span className="text-gray-500">Portfolio</span>
                          <br />
                          <a
                            href={app.portfolio_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-Secondarycolor hover:underline break-all"
                          >
                            {app.portfolio_url}
                          </a>
                        </p>
                      )}
                      <p className="text-gray-300 sm:col-span-2">
                        <span className="text-gray-500">Learning goal</span>
                        <br />
                        <span className="leading-relaxed">{app.learning_goal || "—"}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Admin controls */}
                <div className="p-5 md:p-6 bg-bgcolor2/30">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Admin actions
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className={labelClass}>Status</label>
                      <select
                        value={drafts[app.id]?.status || "new"}
                        onChange={(e) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [app.id]: { ...prev[app.id], status: e.target.value },
                          }))
                        }
                        className={inputClass}
                      >
                        {statusOptions.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Payment status</label>
                      <select
                        value={drafts[app.id]?.paymentStatus || "unpaid"}
                        onChange={(e) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [app.id]: { ...prev[app.id], paymentStatus: e.target.value },
                          }))
                        }
                        className={inputClass}
                      >
                        {paymentOptions.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Training fee (NGN)</label>
                      <input
                        type="number"
                        value={drafts[app.id]?.feeAmount ?? 0}
                        onChange={(e) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [app.id]: { ...prev[app.id], feeAmount: e.target.value },
                          }))
                        }
                        className={inputClass}
                        placeholder="0"
                        min={0}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Follow-up date</label>
                      <input
                        type="date"
                        value={drafts[app.id]?.followUpDate || ""}
                        onChange={(e) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [app.id]: { ...prev[app.id], followUpDate: e.target.value },
                          }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Cohort</label>
                      <input
                        type="text"
                        value={drafts[app.id]?.cohort || ""}
                        onChange={(e) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [app.id]: { ...prev[app.id], cohort: e.target.value },
                          }))
                        }
                        className={inputClass}
                        placeholder="e.g. Cohort 2025-01"
                      />
                    </div>
                    <div className="sm:col-span-2 lg:col-span-4">
                      <label className={labelClass}>Admin notes</label>
                      <textarea
                        value={drafts[app.id]?.adminNotes || ""}
                        onChange={(e) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [app.id]: { ...prev[app.id], adminNotes: e.target.value },
                          }))
                        }
                        rows={2}
                        className={`${inputClass} resize-y`}
                        placeholder="Internal notes about this application"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => updateStatus(app.id)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-Primarycolor/40 bg-Primarycolor/20 text-Secondarycolor font-medium text-sm hover:bg-Primarycolor/30 transition-colors"
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteApplication(app.id)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-400/50 text-red-300 font-medium text-sm hover:bg-red-500/10 transition-colors"
                    >
                      <FaTrash /> Delete
                    </button>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium ${
                        statusBadgeClass[drafts[app.id]?.status || app.status] || "text-gray-400 border-gray-500/40"
                      }`}
                    >
                      {drafts[app.id]?.status || app.status}
                    </span>
                  </div>
                </div>
              </article>
            ))}
            {!applications.length && (
              <p className="text-gray-400 text-center py-12">No career applications yet.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CareersAdmin;
