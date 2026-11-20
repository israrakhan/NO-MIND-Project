/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import {
  setAccessToken,
  clearAccessToken,
  getAccessToken,
} from "../../../api/authTokenStore";
import { adminLogin } from "../api/usersApi";

const ADMIN_USER_KEY = "admin_user";

const AdminAuthContext = createContext(null);

const normalizeLoginPayload = (payload) => {
  if (!payload) return null;
  const token =
    payload?.token ||
    payload?.accessToken ||
    payload?.data?.token ||
    payload?.data?.accessToken ||
    null;
  // Backend adminLogging() returns { accessToken, refreshToken, userType } with no user object.
  // The userType will be either "ADMIN" or "OPERATOR"
  const userType = payload?.data?.userType || payload?.userType || "Admin";
  const fullName = payload?.data?.fullName || payload?.fullName;
  const user =
    payload?.user ||
    payload?.admin ||
    payload?.data?.user ||
    payload?.data?.admin ||
    (payload?.data?.accessToken
      ? { role: userType, username: fullName || userType }
      : null);

  if (!token || !user) return null;

  return {
    phone: user.phone || user.mobile || null,
    email: user.email || null,
    username: user.username || user.name || user.email || userType,
    fullName: user.fullName || fullName || user.username || userType,
    role: user.role || userType || "admin",
    userType: userType,
    token,
  };
};

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    // Rehydrate admin state from sessionStorage on mount.
    try {
      const stored = sessionStorage.getItem(ADMIN_USER_KEY);
      const token = getAccessToken();
      if (stored && token) return JSON.parse(stored);
    } catch {
      // ignore parse errors
    }
    return null;
  });

  // Keep sessionStorage in sync whenever admin changes.
  useEffect(() => {
    if (admin) {
      sessionStorage.setItem(ADMIN_USER_KEY, JSON.stringify(admin));
    } else {
      sessionStorage.removeItem(ADMIN_USER_KEY);
    }
  }, [admin]);

  const login = async (phone, password) => {
    try {
      const apiResponse = await adminLogin({ phone, password });
      const adminUser = normalizeLoginPayload(apiResponse);
      if (adminUser) {
        setAccessToken(adminUser.token);
        setAdmin(adminUser);
        return { success: true };
      }
      return { success: false, message: "Invalid login response from server." };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Invalid phone number or password",
      };
    }
  };

  const logout = () => {
    clearAccessToken();
    sessionStorage.removeItem(ADMIN_USER_KEY);
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
