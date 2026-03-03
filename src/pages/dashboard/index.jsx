import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaListUl, FaEnvelope, FaRegImages, FaAddressBook, FaUserGraduate, FaMoneyCheckAlt, FaBookOpen, FaPaperPlane, FaBars, FaTimes, FaChevronLeft, FaChevronRight, FaSignOutAlt } from "react-icons/fa";
import { clearAdminSession, getAdminUser } from "../../utils/adminAuth";

const menu = [
  { to: "/dashboard", label: "Overview", icon: <FaListUl /> },
  { to: "/dashboard/catalogues", label: "Catalogues", icon: <FaRegImages /> },
  { to: "/dashboard/createblog", label: "Create Blog", icon: <FaPlus /> },
  { to: "/dashboard/updateblog", label: "Update Blog", icon: <FaPlus /> },
  { to: "/dashboard/bloglist", label: "Blog Lists", icon: <FaListUl /> },
  { to: "/dashboard/subscriptions", label: "Subscribers", icon: <FaEnvelope /> },
  { to: "/dashboard/contacts", label: "Contacts", icon: <FaAddressBook /> },
  { to: "/dashboard/careers", label: "Careers", icon: <FaUserGraduate /> },
  { to: "/dashboard/lms", label: "LMS Courses", icon: <FaBookOpen /> },
  { to: "/dashboard/orders", label: "Orders", icon: <FaMoneyCheckAlt /> },
  { to: "/dashboard/bulk-email", label: "Bulk Email", icon: <FaPaperPlane /> },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const admin = getAdminUser();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((o) => !o);
  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bgcolor2 via-bgcolor to-bgcolor2 text-textcolor2 overflow-x-hidden">
      {/* Mobile menu button - fixed top-left when sidebar is closed */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button
          type="button"
          onClick={() => setMobileNavOpen((o) => !o)}
          className="p-2.5 rounded-lg border border-Primarycolor/30 bg-bgcolor2/80 backdrop-blur text-textcolor2 hover:bg-Primarycolor/20 transition"
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
        >
          {mobileNavOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile backdrop when nav is open */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={closeMobileNav}
          aria-hidden
        />
      )}

      <div className="flex flex-col md:flex-row min-h-screen overflow-x-hidden">
        <aside
          className={`
            fixed md:relative inset-y-0 left-0 z-20
            w-72 md:w-72 md:transition-[width] md:duration-200 ease-out
            border-r border-Primarycolor/20 p-4 md:p-6 bg-bgcolor2/95 md:bg-bgcolor2/60 backdrop-blur
            flex flex-col
            ${mobileNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            ${sidebarOpen ? "md:w-72" : "md:w-[4.5rem] md:overflow-hidden"}
          `}
        >
          {/* Toggle button - visible on desktop; in sidebar on mobile */}
          <div className="flex items-center justify-between mb-4 md:mb-2">
            {sidebarOpen && (
              <>
                <p className="text-xs font-semibold uppercase tracking-widest text-Secondarycolor truncate">Control center</p>
                <button
                  type="button"
                  onClick={toggleSidebar}
                  className="hidden md:flex p-2 rounded-lg text-gray-400 hover:text-textcolor2 hover:bg-Primarycolor/20 transition shrink-0"
                  aria-label="Collapse sidebar"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>
              </>
            )}
            {!sidebarOpen && (
              <button
                type="button"
                onClick={toggleSidebar}
                className="hidden md:flex w-full justify-center p-2 rounded-lg text-gray-400 hover:text-textcolor2 hover:bg-Primarycolor/20 transition"
                aria-label="Expand sidebar"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {sidebarOpen && (
            <>
              <h2 className="text-lg font-semibold text-textcolor2 mt-1 truncate">Lasglow Admin</h2>
              <p className="text-sm text-gray-500 mt-0.5 truncate">{admin?.email || "Administrator"}</p>
            </>
          )}

          <nav className="mt-5 md:mt-6 space-y-1 flex-1">
            {menu.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileNav}
                  title={!sidebarOpen ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-colors ${
                    active
                      ? "bg-Primarycolor/30 border border-Primarycolor/40 text-Secondarycolor font-medium"
                      : "text-gray-400 hover:bg-Primarycolor/10 hover:text-textcolor2"
                  } ${!sidebarOpen ? "justify-center md:justify-center" : ""}`}
                >
                  <span className="flex-shrink-0 w-5 flex items-center justify-center">{item.icon}</span>
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {sidebarOpen && (
            <button
              onClick={() => {
                clearAdminSession();
                navigate("/admin/login", { replace: true });
              }}
              className="mt-6 w-full px-4 py-3 rounded-xl border border-red-400/50 text-red-300 hover:bg-red-500/10 font-medium transition-colors"
            >
              Logout
            </button>
          )}
          {!sidebarOpen && (
            <button
              onClick={() => {
                clearAdminSession();
                navigate("/admin/login", { replace: true });
              }}
              className="mt-6 w-full flex justify-center p-3 rounded-xl border border-red-400/50 text-red-300 hover:bg-red-500/10 transition"
              title="Logout"
              aria-label="Logout"
            >
              <FaSignOutAlt className="w-4 h-4" />
            </button>
          )}
        </aside>

        <main className="flex-1 p-4 md:p-8 min-w-0 overflow-x-hidden pt-16 md:pt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
