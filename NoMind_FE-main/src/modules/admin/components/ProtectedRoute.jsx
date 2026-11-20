import { Navigate } from 'react-router';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';

export function ProtectedRoute({ children }) {
  const { admin } = useAdminAuth();

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export function AdminOnlyRoute({ children }) {
  const { admin } = useAdminAuth();
  
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  const isAdmin = admin?.userType?.toUpperCase() === "ADMIN" || admin?.role?.toUpperCase() === "ADMIN";
  if (!isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}
