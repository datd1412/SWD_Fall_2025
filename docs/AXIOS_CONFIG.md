# Axios API Configuration

Dự án này sử dụng Axios để gọi API với các tính năng sau:

## Cài đặt

Trước tiên, cài đặt axios:

```bash
npm install axios
```

## Cấu hình

1. **Tạo file `.env.local`** từ `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

2. **Cập nhật URL API** trong `.env.local`:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

## Sử dụng

Import `api` từ `src/services/api.js` trong component của bạn:

```javascript
import api from '../services/api';

// GET request
const getVehicles = async () => {
  try {
    const response = await api.get('/vehicles');
    console.log(response);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
  }
};

// POST request
const createBooking = async (data) => {
  try {
    const response = await api.post('/bookings', data);
    console.log(response);
  } catch (error) {
    console.error('Error creating booking:', error);
  }
};

// PUT request
const updateVehicle = async (id, data) => {
  try {
    const response = await api.put(`/vehicles/${id}`, data);
    console.log(response);
  } catch (error) {
    console.error('Error updating vehicle:', error);
  }
};

// DELETE request
const deleteBooking = async (id) => {
  try {
    const response = await api.delete(`/bookings/${id}`);
    console.log(response);
  } catch (error) {
    console.error('Error deleting booking:', error);
  }
};
```

## Tính năng

### 1. **Tự động thêm Authorization header**
   - Lấy token từ Zustand store
   - Tự động thêm vào mỗi request: `Authorization: Bearer {token}`

### 2. **Xử lý lỗi 401 (Unauthorized)**
   - Nếu token hết hạn, tự động xóa user từ store
   - Chuyển hướng về trang login

### 3. **Timeout**
   - Mỗi request có timeout 10 giây

### 4. **Base URL động**
   - Sử dụng biến môi trường `VITE_API_URL`
   - Mặc định: `http://localhost:3000/api`

## Các phương thức HTTP được hỗ trợ

- `api.get(url, config)`
- `api.post(url, data, config)`
- `api.put(url, data, config)`
- `api.patch(url, data, config)`
- `api.delete(url, config)`

## Lưu ý

- File `.env.local` không được commit lên Git (đã có trong `.gitignore`)
- Luôn kiểm tra API response data trong error handler
- Token được quản lý bằng Zustand store (`useUserStore`)
