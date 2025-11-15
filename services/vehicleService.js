import api from "../src/config/api";
import { useUserStore } from "../src/stores/userStore";

const { user } = useUserStore.getState();
const stationId = user?.stationId || "";

const vehicleService = {
  getAllVehicles: async () => {
    try {
      if (!stationId) throw new Error("Missing stationId in user");
      const response = await api.get(`/Vehicles`, {
        params: { stationId },
      });
      return response;
    } catch (error) {
      console.error("Get vehicles error:", error);
      throw error;
    }
  },

  getVehicleById: async (vehicleId) => {
    try {
      const response = await api.get(`/Vehicles/${vehicleId}`);
      // Response có cấu trúc: { success, message, data: {...}, errors }
      return response.data;
    } catch (error) {
      console.error("Get vehicle error:", error);
      throw error;
    }
  },

  createVehicle: async (data) => {
    try {
      const response = await api.post("/vehicles", data);
      return response;
    } catch (error) {
      console.error("Create vehicle error:", error);
      throw error;
    }
  },

  updateVehicle: async (vehicleId, data) => {
    try {
      const response = await api.put(`/vehicles/${vehicleId}`, data);
      return response;
    } catch (error) {
      console.error("Update vehicle error:", error);
      throw error;
    }
  },

  deleteVehicle: async (vehicleId) => {
    try {
      const response = await api.delete(`/vehicles/${vehicleId}`);
      return response;
    } catch (error) {
      console.error("Delete vehicle error:", error);
      throw error;
    }
  },

  getVehiclesByStatus: async (status) => {
    try {
      const response = await api.get(`/vehicles?status=${status}`);
      return response;
    } catch (error) {
      console.error("Get vehicles by status error:", error);
      throw error;
    }
  },

  getStaffDashboard: async (stationId) => {
    try {
      const response = await api.get(`/staff/dashboard`, {
        params: { stationId },
      });
      // Response: { success, message, data: { stationId, vehicles, bookings, vehicleList: [...] }, errors }
      return response.data;
    } catch (error) {
      console.error("Get staff dashboard error:", error);
      throw error;
    }
  },

  checkoutRental: async (payload) => {
    try {
      const response = await api.post(`/Rentals/checkout`, payload);
      // Response sample: { success, message, data: { ...rental }, errors }
      return response.data;
    } catch (error) {
      console.error("Checkout rental error:", error);
      throw error;
    }
  },
};

export default vehicleService;
