import api from "../src/config/api";
import { useUserStore } from "../src/stores/userStore";

const { user } = useUserStore.getState();
const stationId = user?.stationId || '';

const staffService = {
    getStaffDashboard: async () => {
        try {
            if (!stationId) throw new Error("Missing stationId in user");
            const response = await api.get(`/staff/dashboard`, {
                params: { stationId }
            })
            return response.data;
        } catch (error) {
            console.error('Get staff dashboard error:', error);
            throw error;
        }
    },

    getStaffDashboardVehicles: async () => {
        try {
            if (!stationId) throw new Error("Missing stationId in user");
            const response = await api.get(`/staff/dashboard/vehicles`, {
                params: { stationId }
            })
            return response.data;
        } catch (error) {
            console.error('Get staff dashboard vehicles error:', error);
            throw error;
        }
    }
}

export default staffService;