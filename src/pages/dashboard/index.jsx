import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaListUl, FaEnvelope, FaRegImages, FaAddressBook, FaUserGraduate, FaMoneyCheckAlt, FaBookOpen, FaPaperPlane } from "react-icons/fa";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-bgcolor2 via-bgcolor to-bgcolor2 text-textcolor2 overflow-x-hidden">
      <div className="flex flex-col md:flex-row min-h-screen overflow-x-hidden">
        <aside className="md:w-72 border-r border-Primarycolor/20 p-6 bg-bgcolor2/60 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-widest text-Secondarycolor">Control center</p>
          <h2 className="text-xl font-semibold text-textcolor2 mt-2">Lasglow Admin</h2>
          <p className="text-sm text-gray-500 mt-1 truncate">{admin?.email || "Administrator"}</p>

          <nav className="mt-7 space-y-1.5">
            {menu.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    active
                      ? "bg-Primarycolor/30 border border-Primarycolor/40 text-Secondarycolor font-medium"
                      : "text-gray-400 hover:bg-Primarycolor/10 hover:text-textcolor2"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => {
              clearAdminSession();
              navigate("/admin/login", { replace: true });
            }}
            className="mt-8 w-full px-4 py-3 rounded-xl border border-red-400/50 text-red-300 hover:bg-red-500/10 font-medium transition-colors"
          >
            Logout
          </button>
        </aside>

        <main className="flex-1 p-4 md:p-8 min-w-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
