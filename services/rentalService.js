import api from "../src/config/api";

const rentalService = {
    getRentalById: async (rentalId) => {
        try {
            const response = await api.get(`/Rentals/${rentalId}`);
            return response.data;
        } catch (error) {
            console.error('Get rental error:', error);
            throw error;
        }
    },

    getRentalCheckinInfoById: async (rentalId) => {
        try {
            const response = await api.get(`/Rentals/${rentalId}/checkin-info`);
            return response.data;
        } catch (error) {
            console.error('Get rental info error:', error);
            throw error;
        }
    },

    checkinRental: async (rentalId, checkinData) => {
        try {
            const response = await api.post(`/Rentals/${rentalId}/checkin`, checkinData);
            return response;
        } catch (error) {
            console.error('Checkin rental error:', error);
            throw error;
        }
    }
}

export default rentalService;