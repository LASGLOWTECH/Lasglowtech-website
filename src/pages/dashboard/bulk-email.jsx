import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import instance from "../../config/axios.config";
import { getAdminToken } from "../../utils/adminAuth";

const BulkEmailAdmin = () => {
  const headers = useMemo(() => ({ Authorization: `Bearer ${getAdminToken()}` }), []);
  const [form, setForm] = useState({
    subject: "",
    message: "",
    emails: "",
    includeSubscribers: false,
  });
  const [csvFile, setCsvFile] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [sending, setSending] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const loadCampaigns = async () => {
    try {
      const res = await instance.get("/admin/bulk-email/campaigns", { headers });
      setCampaigns(res.data || []);
    } catch (error) {
      setCampaigns([]);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const sendManual = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const hasAttachments = attachments.length > 0;
      const endpoint = hasAttachments ? "/admin/bulk-email/send-with-files" : "/admin/bulk-email/send";
      const payload = hasAttachments ? new FormData() : form;

      if (hasAttachments) {
        payload.append("subject", form.subject);
        payload.append("message", form.message);
        payload.append("emails", form.emails);
        payload.append("includeSubscribers", String(form.includeSubscribers));
        attachments.forEach((file) => payload.append("attachments", file));
      }

      const res = await instance.post(endpoint, payload, {
        headers: hasAttachments ? { ...headers, "Content-Type": "multipart/form-data" } : headers,
      });
      toast.success(
        `Campaign sent. Sent: ${res.data.totalSent}, Failed: ${res.data.totalFailed}`
      );
      setForm((prev) => ({ ...prev, emails: "" }));
      setAttachments([]);
      loadCampaigns();
    } catch (error) {
      toast.error(error.response?.data?.message || "Bulk send failed.");
    } finally {
      setSending(false);
    }
  };

  const sendCsv = async (e) => {
    e.preventDefault();
    if (!csvFile) return toast.error("Select a CSV file first.");
    setSending(true);
    try {
      const body = new FormData();
      body.append("subject", form.subject);
      body.append("message", form.message);
      body.append("file", csvFile);
      attachments.forEach((file) => body.append("attachments", file));
      const res = await instance.post("/admin/bulk-email/send-csv", body, {
        headers: { ...headers, "Content-Type": "multipart/form-data" },
      });
      toast.success(
        `CSV campaign sent. Sent: ${res.data.totalSent}, Failed: ${res.data.totalFailed}`
      );
      setCsvFile(null);
      setAttachments([]);
      loadCampaigns();
    } catch (error) {
      toast.error(error.response?.data?.message || "CSV send failed.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 overflow-hidden">
        <div className="px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
          <h1 className="text-xl font-semibold text-textcolor2">Bulk email campaigns</h1>
          <p className="text-sm text-gray-500 mt-0.5">Send updates to manual emails or CSV exported from Excel.</p>
        </div>
        <div className="p-6">
        <form onSubmit={sendManual} className="grid grid-cols-1 gap-4">
          <input
            value={form.subject}
            onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
            placeholder="Email subject"
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
            required
          />
          <textarea
            value={form.message}
            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
            placeholder="Campaign message"
            rows={6}
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
            required
          />
          <textarea
            value={form.emails}
            onChange={(e) => setForm((p) => ({ ...p, emails: e.target.value }))}
            placeholder="Manual recipient emails (comma, space or newline separated)"
            rows={4}
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
          />
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={form.includeSubscribers}
              onChange={(e) => setForm((p) => ({ ...p, includeSubscribers: e.target.checked }))}
            />
            Include subscribers + users + career applicants
          </label>
          <div>
            <label className="text-sm text-gray-300 block mb-2">Attachments (PDF, Word, image)</label>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={(e) => setAttachments(Array.from(e.target.files || []))}
              className="text-sm"
            />
            {!!attachments.length && (
              <p className="text-xs text-gray-400 mt-1">{attachments.length} attachment(s) selected.</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={sending}
              className="px-6 py-3 rounded-md bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor text-white font-semibold"
            >
              {sending ? "Sending..." : "Send Manual Campaign"}
            </button>
          </div>
        </form>
        </div>
      </section>

      <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 overflow-hidden">
        <div className="px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
          <h2 className="text-xl font-semibold text-textcolor2">Send from CSV (Excel export)</h2>
          <p className="text-sm text-gray-500 mt-0.5">Upload a .csv file with any column containing emails.</p>
        </div>
        <div className="p-6">
        <form onSubmit={sendCsv} className="flex flex-col md:flex-row md:items-center gap-3">
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
            className="text-sm"
          />
          <button
            type="submit"
            disabled={sending || !csvFile}
            className="px-5 py-2 rounded-md border border-Primarycolor/40 text-textcolor2 hover:bg-Primarycolor/30 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send CSV campaign"}
          </button>
        </form>
        </div>
      </section>

      <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 overflow-hidden">
        <div className="px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
          <h3 className="text-lg font-semibold text-textcolor2">Recent campaigns</h3>
          <p className="text-sm text-gray-500 mt-0.5">History of sent bulk emails.</p>
        </div>
        <div className="p-6">
        {!campaigns.length && <p className="text-gray-400 text-sm">No campaigns sent yet.</p>}
        {!!campaigns.length && (
          <div className="space-y-4">
            {campaigns.map((item) => (
              <article key={item.id} className="rounded-xl border border-Primarycolor/20 bg-bgcolor/50 p-4 hover:border-Primarycolor/30 transition-colors">
                <p className="font-semibold text-textcolor2">{item.subject}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Recipients: {item.total_recipients} · Sent: {item.total_sent} · Failed: {item.total_failed}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(item.created_at).toLocaleString()} · {item.created_by}
                </p>
              </article>
            ))}
          </div>
        )}
        </div>
      </section>
    </div>
  );
};

export default BulkEmailAdmin;
