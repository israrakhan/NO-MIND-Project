import { useLocation, Link } from "react-router";
import { Home, ChevronRight } from "lucide-react";

export function AdminBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Only render inside admin routes, but skip for just '/admin' without subroutes
  if (pathnames.length === 0 || pathnames[0] !== "admin") return null;
  if (pathnames.length === 1) return null; // e.g. exactly '/admin'

  const isId = (path) => {
    return (
      /^[0-9a-fA-F]{24}$/.test(path) ||
      /^[0-9a-fA-F-]{36}$/.test(path) ||
      /^\d+$/.test(path)
    );
  };

  const formatLabel = (path) => {
    if (isId(path)) return "Details";
    return path;
  };

  // Build breadcrumbs array
  const breadcrumbs = [];
  let currentPath = "";

  for (let i = 1; i < pathnames.length; i++) {
    const value = pathnames[i];
    currentPath += `/${value}`;

    // Skip showing the intermediate ID if we are heading to an 'edit' page.
    // This avoids an unclickable "Details" breadcrumb when no detail page exists.
    if (
      isId(value) &&
      i + 1 < pathnames.length &&
      pathnames[i + 1] === "edit"
    ) {
      continue;
    }

    breadcrumbs.push({
      label: formatLabel(value),
      to: `/admin${currentPath}`,
      isIdValue: isId(value),
    });
  }

  return (
    <div className="mb-1 flex px-6">
      <div className="inline-flex items-center rounded-full bg-[#4A362D]/10 p-1 pl-6">
        <Link
          to="/admin/dashboard"
          className="flex items-center text-[#4A362D]/70 hover:text-[#4A362D] transition-colors"
        >
          <Home className="w-4 h-4" />
        </Link>

        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <div key={crumb.to} className="flex items-center">
              <ChevronRight className="w-3.5 h-3.5 mx-3 text-[#4A362D]/30" />
              {isLast ? (
                <div className="bg-white text-[#BC6034] px-6 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-sm">
                  {crumb.label}
                </div>
              ) : crumb.isIdValue ? (
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#4A362D]/70">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.to}
                  className="text-[11px] font-bold tracking-widest uppercase text-[#4A362D]/70 hover:text-[#4A362D] transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
