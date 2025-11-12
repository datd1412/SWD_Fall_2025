import api from './api';

const bookingService = {
  /**
   * Lấy danh sách đặt xe
   * @returns {Promise}
   */
  getAllBookings: async () => {
    try {
      const response = await api.get('/bookings');
      return response;
    } catch (error) {
      console.error('Get bookings error:', error);
      throw error;
    }
  },

  /**
   * Lấy chi tiết đặt xe
   * @param {string} bookingId - ID đặt xe
   * @returns {Promise}
   */
  getBookingById: async (bookingId) => {
    try {
      const response = await api.get(`/bookings/${bookingId}`);
      return response;
    } catch (error) {
      console.error('Get booking error:', error);
      throw error;
    }
  },

  /**
   * Tạo đặt xe mới
   * @param {object} data - Thông tin đặt xe
   * @returns {Promise}
   */
  createBooking: async (data) => {
    try {
      const response = await api.post('/bookings', data);
      return response;
    } catch (error) {
      console.error('Create booking error:', error);
      throw error;
    }
  },

  /**
   * Cập nhật đặt xe
   * @param {string} bookingId - ID đặt xe
   * @param {object} data - Dữ liệu cập nhật
   * @returns {Promise}
   */
  updateBooking: async (bookingId, data) => {
    try {
      const response = await api.put(`/bookings/${bookingId}`, data);
      return response;
    } catch (error) {
      console.error('Update booking error:', error);
      throw error;
    }
  },

  /**
   * Hủy đặt xe
   * @param {string} bookingId - ID đặt xe
   * @returns {Promise}
   */
  cancelBooking: async (bookingId) => {
    try {
      const response = await api.delete(`/bookings/${bookingId}`);
      return response;
    } catch (error) {
      console.error('Cancel booking error:', error);
      throw error;
    }
  },

  /**
   * Xác nhận giao xe
   * @param {string} bookingId - ID đặt xe
   * @returns {Promise}
   */
  confirmDelivery: async (bookingId) => {
    try {
      const response = await api.post(`/bookings/${bookingId}/confirm-delivery`);
      return response;
    } catch (error) {
      console.error('Confirm delivery error:', error);
      throw error;
    }
  },

  /**
   * Xác nhận trả xe
   * @param {string} bookingId - ID đặt xe
   * @param {object} data - Thông tin trả xe (odo, battery, images, notes...)
   * @returns {Promise}
   */
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
