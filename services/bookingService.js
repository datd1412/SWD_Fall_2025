import api from "../src/config/api";

const bookingService = {
  getAllBookings: async () => {
    try {
      const response = await api.get('/bookings');
      return response;
    } catch (error) {
      console.error('Get bookings error:', error);
      throw error;
    }
  },

  getBookingById: async (bookingId) => {
    try {
      const response = await api.get(`/Bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Get booking error:', error);
      throw error;
    }
  },

  createBooking: async (data) => {
    try {
      const response = await api.post('/bookings', data);
      return response;
    } catch (error) {
      console.error('Create booking error:', error);
      throw error;
    }
  },

  updateBooking: async (bookingId, data) => {
    try {
      const response = await api.put(`/bookings/${bookingId}`, data);
      return response;
    } catch (error) {
      console.error('Update booking error:', error);
      throw error;
    }
  },

  cancelBooking: async (bookingId) => {
    try {
      const response = await api.delete(`/bookings/${bookingId}`);
      return response;
    } catch (error) {
      console.error('Cancel booking error:', error);
      throw error;
    }
  },

  confirmDelivery: async (bookingId) => {
    try {
      const response = await api.post(`/bookings/${bookingId}/confirm-delivery`);
      return response;
    } catch (error) {
      console.error('Confirm delivery error:', error);
      throw error;
    }
  },

  confirmReturn: async (bookingId, data) => {
    try {
      const response = await api.post(`/bookings/${bookingId}/confirm-return`, data);
      return response;
    } catch (error) {
      console.error('Confirm return error:', error);
      throw error;
    }
  },
};

export default bookingService;
