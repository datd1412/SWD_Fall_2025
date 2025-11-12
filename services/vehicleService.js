import api from './api';

const vehicleService = {
  /**
   * Lấy danh sách tất cả xe
   * @returns {Promise}
   */
  getAllVehicles: async () => {
    try {
      const response = await api.get('/vehicles');
      return response;
    } catch (error) {
      console.error('Get vehicles error:', error);
      throw error;
    }
  },

  /**
   * Lấy chi tiết một xe
   * @param {string} vehicleId - ID của xe
   * @returns {Promise}
   */
  getVehicleById: async (vehicleId) => {
    try {
      const response = await api.get(`/vehicles/${vehicleId}`);
      return response;
    } catch (error) {
      console.error('Get vehicle error:', error);
      throw error;
    }
  },

  /**
   * Tạo xe mới
   * @param {object} data - Thông tin xe
   * @returns {Promise}
   */
  createVehicle: async (data) => {
    try {
      const response = await api.post('/vehicles', data);
      return response;
    } catch (error) {
      console.error('Create vehicle error:', error);
      throw error;
    }
  },

  /**
   * Cập nhật thông tin xe
   * @param {string} vehicleId - ID của xe
   * @param {object} data - Dữ liệu cập nhật
   * @returns {Promise}
   */
  updateVehicle: async (vehicleId, data) => {
    try {
      const response = await api.put(`/vehicles/${vehicleId}`, data);
      return response;
    } catch (error) {
      console.error('Update vehicle error:', error);
      throw error;
    }
  },

  /**
   * Xóa xe
   * @param {string} vehicleId - ID của xe
   * @returns {Promise}
   */
  deleteVehicle: async (vehicleId) => {
    try {
      const response = await api.delete(`/vehicles/${vehicleId}`);
      return response;
    } catch (error) {
      console.error('Delete vehicle error:', error);
      throw error;
    }
  },

  /**
   * Lấy xe theo trạng thái
   * @param {string} status - Trạng thái xe (ready, booked, rented, maintenance)
   * @returns {Promise}
   */
  getVehiclesByStatus: async (status) => {
    try {
      const response = await api.get(`/vehicles?status=${status}`);
      return response;
    } catch (error) {
      console.error('Get vehicles by status error:', error);
      throw error;
    }
  },
};

export default vehicleService;
