import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  MessageSquare,
  CalendarCheck,
  Users,
  BookOpen,
  TrendingUp,
  ClipboardList,
  LogOut,
  Menu,
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";
import { getMediaUrl } from "../../../utils/cloudinary.js";

const navItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/enrollments", label: "Enrollments", icon: ClipboardList },
  { path: "/admin/programs", label: "Workshops", icon: BookOpen },
  { path: "/admin/experience", label: "About", icon: TrendingUp },
  { path: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { path: "/admin/bookings", label: "Custom Bookings", icon: CalendarCheck },
  { path: "/admin/users", label: "Users", icon: Users },
];

export function AdminSidebar() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // userType/role can be "ADMIN" or "OPERATOR"
  const isAdmin =
    admin?.userType?.toUpperCase() === "ADMIN" ||
    admin?.role?.toUpperCase() === "ADMIN";

  const filteredNavItems = navItems.filter((item) => {
    if (item.label === "Users" || item.label === "About") {
      return isAdmin;
    }
    return true;
  });

  return (
    <aside className="w-64 bg-[#4A362D] text-white flex flex-col">
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img
            src={getMediaUrl('logo.png')}
            alt="No Mind Foundation"
            className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover flex-shrink-0 shadow-md ring-2 ring-white/20"
          />
          <div className="flex flex-col leading-tight">
            <span
              className="text-sm sm:text-sm font-bold text-white tracking-wide"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              No Mind
            </span>
            <span
              className="text-sm sm:text-sm font-semibold text-white tracking-widest uppercase"
              style={{
                fontFamily: "'Cinzel', serif",
                letterSpacing: "0.15em",
              }}
            >
              Foundation
            </span>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {filteredNavItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#BC6034] text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 px-4 py-4 space-y-2">
        <div className="flex w-full items-center justify-center rounded-lg border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-medium text-white">
          {admin?.userType || "Admin"}
        </div>
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-500/80"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A362D]/40 backdrop-blur-sm">
          <div className="bg-[#FFF8F3] rounded-2xl p-7 max-w-sm w-full shadow-2xl border border-[#EEDCC8] text-gray-800">
            <h3 className="text-xl font-bold text-[#4A362D] mb-2 text-center">Confirm Logout</h3>
            <p className="text-center text-gray-600 mb-6 text-sm">
              Are you sure you want to log out of the admin panel?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 px-4 py-2 bg-white border border-[#D8B49F] text-[#BC6034] rounded-lg text-sm font-bold hover:bg-[#F6E4D5] transition-all shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  handleLogout();
                }}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600 border border-red-600 transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
