import axios from "axios";
import { getAccessToken, clearAccessToken } from "./authTokenStore";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

httpClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearAccessToken();
      sessionStorage.clear();
      window.location.href = "/admin/login";
      return Promise.reject(error);
    }
    const message =
      error?.response?.data?.error?.message ||
      error?.response?.data?.message ||
      error?.message ||
      "Request failed";
    return Promise.reject({
      ...error,
      message,
      status: error?.response?.status ?? null,
      details: error?.response?.data ?? null,
    });
  },
);
