import api from "../src/config/api";

const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post("/Auth/login", {
        email,
        password,
      });
      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post("/Auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post("/Auth/forgot-password", {
        email,
      });
      return response;
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  },

  resetPassword: async (token, newPassword, confirmPassword) => {
    try {
      const response = await api.post("/Auth/reset-password", {
        token,
        newPassword,
        confirmPassword,
      });
      return response;
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get("/Auth/me");
      return response;
    } catch (error) {
      console.error("Get current user error:", error);
      throw error;
    }
  },

  getUserProfile: async () => {
    try {
      const response = await api.get("/Users/profile");
      // API trả về response.data là object user trực tiếp
      return response.data;
    } catch (error) {
      console.error("Get user profile error:", error);
      throw error;
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.post("/Auth/refresh-token");
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      return response;
    } catch (error) {
      console.error("Refresh token error:", error);
      throw error;
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },
};

export default authService;
