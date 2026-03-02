import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { FaEnvelope, FaUser, FaSearch, FaCopy, FaCalendarAlt } from "react-icons/fa";
import instance from "../../config/axios.config";
import { getAdminToken } from "../../utils/adminAuth";

const SITE_URL = "https://www.lasglowtech.com.ng";

const PAGE_TITLE = "Contact Messages | Lasglow Admin";
const PAGE_DESCRIPTION =
  "View and manage contact form submissions and leads from the Lasglowtech website. Admin dashboard for enquiries and customer messages.";

const ContactsAdmin = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const headers = useMemo(() => ({ Authorization: `Bearer ${getAdminToken()}` }), []);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const res = await instance.get("/contacts", { headers });
        setContacts(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Unable to load contacts.");
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [headers]);

  const fullName = useCallback(
    (item) =>
      [item.firstName, item.lastName].map((s) => (s || "").trim()).filter(Boolean).join(" ") || "—",
    []
  );

  const filteredContacts = useMemo(() => {
    if (!search.trim()) return contacts;
    const q = search.trim().toLowerCase();
    return contacts.filter(
      (item) =>
        fullName(item).toLowerCase().includes(q) ||
        (item.email || "").toLowerCase().includes(q) ||
        (item.subject || "").toLowerCase().includes(q) ||
        (item.message || "").toLowerCase().includes(q)
    );
  }, [contacts, search, fullName]);

  const sortedContacts = useMemo(() => {
    return [...filteredContacts].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : 0;
      const dateB = b.createdAt ? new Date(b.createdAt) : 0;
      return dateB - dateA;
    });
  }, [filteredContacts]);

  const copyEmail = useCallback((email) => {
    if (!email) return;
    navigator.clipboard.writeText(email).then(
      () => toast.success("Email copied to clipboard"),
      () => toast.error("Could not copy")
    );
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? null : d.toLocaleDateString(undefined, { dateStyle: "medium" });
    } catch {
      return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${SITE_URL}/dashboard/contacts`} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/dashboard/contacts`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <main
        className="contacts-admin"
        role="main"
        aria-label="Contact messages dashboard"
      >
        <section
          className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 overflow-hidden"
          aria-labelledby="contacts-heading"
        >
          <header className="px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
            <h1 id="contacts-heading" className="text-xl font-semibold text-textcolor2">
              Contact messages
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Leads and enquiries from your website contact form.
            </p>
            {!loading && (
              <p className="text-sm text-gray-400 mt-2" aria-live="polite">
                {contacts.length === 0
                  ? "No messages yet"
                  : `${contacts.length} message${contacts.length === 1 ? "" : "s"} total${search.trim() ? ` · ${sortedContacts.length} match${sortedContacts.length === 1 ? "" : "es"}` : ""}`}
              </p>
            )}
          </header>

          {!loading && contacts.length > 0 && (
            <div className="px-6 pt-4 pb-2 border-b border-Primarycolor/10">
              <label htmlFor="contacts-search" className="sr-only">
                Search contacts by name, email, subject or message
              </label>
              <div className="relative">
                <FaSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                  aria-hidden
                />
                <input
                  id="contacts-search"
                  type="search"
                  placeholder="Search by name, email, subject…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-Primarycolor/20 bg-bgcolor/50 text-textcolor2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Secondarycolor/50 focus:border-Secondarycolor/50"
                  aria-label="Search contacts"
                />
              </div>
            </div>
          )}

          <div className="p-6">
            {loading && (
              <div className="space-y-4" role="status" aria-label="Loading contacts">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-Primarycolor/20 bg-bgcolor/50 p-5 md:p-6 animate-pulse"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-Primarycolor/20" />
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="h-4 w-48 bg-Primarycolor/20 rounded" />
                        <div className="h-4 w-64 bg-Primarycolor/20 rounded" />
                        <div className="h-16 bg-Primarycolor/20 rounded-lg" />
                      </div>
                    </div>
                  </div>
                ))}
                <span className="sr-only">Loading contact messages…</span>
              </div>
            )}

            {!loading && (
              <div className="space-y-4">
                {sortedContacts.length === 0 && (
                  <div
                    className="text-center py-12 px-4 rounded-xl border border-Primarycolor/20 bg-bgcolor/30"
                    role="status"
                  >
                    {filteredContacts.length === 0 && contacts.length > 0 ? (
                      <p className="text-gray-400">No contacts match your search.</p>
                    ) : (
                      <p className="text-gray-400">No contact messages yet.</p>
                    )}
                  </div>
                )}

                {sortedContacts.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-Primarycolor/20 bg-bgcolor/50 p-5 md:p-6 hover:border-Primarycolor/30 transition-colors"
                    aria-labelledby={`contact-name-${item.id}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-xl bg-Primarycolor/20 flex items-center justify-center text-Secondarycolor"
                        aria-hidden
                      >
                        <FaUser className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
                          <p
                            id={`contact-name-${item.id}`}
                            className="font-semibold text-textcolor2"
                          >
                            {fullName(item)}
                          </p>
                          <span className="inline-flex items-center gap-2 flex-wrap">
                            <a
                              href={`mailto:${item.email}`}
                              className="inline-flex items-center gap-1.5 text-Secondarycolor hover:underline break-all"
                              aria-label={`Email ${item.email}`}
                            >
                              <FaEnvelope className="w-4 h-4 flex-shrink-0" aria-hidden />
                              {item.email}
                            </a>
                            <button
                              type="button"
                              onClick={() => copyEmail(item.email)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-Secondarycolor hover:bg-Primarycolor/20 transition-colors"
                              aria-label={`Copy email ${item.email}`}
                              title="Copy email"
                            >
                              <FaCopy className="w-4 h-4" aria-hidden />
                            </button>
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">
                          <span className="text-gray-500">Subject:</span>{" "}
                          {item.subject || "—"}
                        </p>
                        {item.createdAt && formatDate(item.createdAt) && (
                          <p className="text-xs text-gray-500 flex items-center gap-1.5">
                            <FaCalendarAlt className="w-3.5 h-3.5" aria-hidden />
                            <time dateTime={item.createdAt}>
                              {formatDate(item.createdAt)}
                            </time>
                          </p>
                        )}
                        <div className="rounded-lg border border-Primarycolor/20 bg-bgcolor2/50 p-4">
                          <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                            {item.message || "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactsAdmin;
