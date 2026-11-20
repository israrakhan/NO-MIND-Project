import { Outlet } from 'react-router';
import { AdminNavbar } from './AdminNavbar.jsx';
import { AdminSidebar } from './AdminSidebar.jsx';
import { AdminBreadcrumbs } from './AdminBreadcrumbs.jsx';
import { AdminSearchProvider } from '../context/AdminSearchContext.jsx';

export function AdminLayout() {
  return (
    <AdminSearchProvider>
      <div className="flex h-screen w-full overflow-hidden bg-gray-100">
        <AdminSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminNavbar />
          <main className="flex-1 overflow-y-auto">
            <div className="pt-6">
              <AdminBreadcrumbs />
            </div>
            <Outlet />
          </main>
        </div>
      </div>
    </AdminSearchProvider>
  );
}
