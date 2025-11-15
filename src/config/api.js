import axios from "axios";
import { useUserStore } from "../stores/userStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const { token } = useUserStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Nếu token hết hạn, chuyển hướng đến login
    if (error.response?.status === 401) {
      const { clearUser } = useUserStore.getState();
      clearUser();
      window.location.href = "/login";
    }
    console.error("API Error:", error.response?.data || error.message);

    return Promise.reject(error.response?.data || error);
  }
);

export default api;
