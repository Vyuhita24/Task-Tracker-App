import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://localhost:44351/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

apiClient.interceptors.request.use((config) => {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const token = user?.token || user?.Token;
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) { console.warn("Failed to parse stored user token:", e); }
  return config;
}, (error) => Promise.reject(error));

apiClient.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) console.warn("Session expired or unauthorized. Redirecting to login.");
  return Promise.reject(error);
});

export function getApiErrorMessage(error, fallbackMessage = "An unexpected error occurred.") {
  if (typeof error === "string") return error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.message) return error.message;
  return fallbackMessage;
}

export async function apiRequest(endpoint, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  let data = options.body;
  if (typeof data === "string") { try { data = JSON.parse(data); } catch {} }
  const response = await apiClient({ url, method, data, params: options.params, headers: options.headers });
  return response.data;
}

export default apiClient;
