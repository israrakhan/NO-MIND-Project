import { useEffect } from "react";
import { useLocation } from "react-router";
import { Search, X } from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";
import { useAdminSearch } from "../context/AdminSearchContext.jsx";

export function AdminNavbar() {
  const { admin } = useAdminAuth();
  const { globalSearchQuery, setGlobalSearchQuery } = useAdminSearch();
  const location = useLocation();

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Reset search when navigating between tabs/pages
  useEffect(() => {
    setGlobalSearchQuery("");
  }, [location.pathname]);

  return (
    <header className="bg-white shadow-sm px-6 py-3 grid grid-cols-1 md:grid-cols-3 items-center gap-4 border-b border-gray-100">
      {/* Left Column: Greeting */}
      <div className="flex items-center gap-3">
        <div className="text-left">
          <p className="text-sm font-semibold text-[#4A362D]">
            {greeting}, {admin?.fullName || "Admin"}
          </p>
          <p className="text-xs text-gray-500">
            {now.toLocaleDateString("en-IN", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Middle Column: Centered Search Bar */}
      <div className="flex justify-center w-full">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            placeholder="Search records in active tab..."
            className="w-full pl-9 pr-9 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs text-[#4A362D] placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#BC6034]/30 focus:border-[#BC6034] shadow-sm transition-all"
          />
          {globalSearchQuery && (
            <button
              onClick={() => setGlobalSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
