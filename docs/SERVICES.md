# API Services Documentation

Dự án này sử dụng các service để quản lý gọi API. Tất cả các service đều sử dụng Axios instance được cấu hình trong `services/api.js`.

## Cấu trúc Services

```
services/
├── api.js              # Axios instance chính (base, interceptors)
├── authService.js      # Các hàm liên quan đến xác thực
├── vehicleService.js   # Các hàm liên quan đến xe
└── bookingService.js   # Các hàm liên quan đến đặt xe
```

## Các Service

### 1. **authService.js** - Xác thực người dùng

Các hàm:

```javascript
import authService from '../services/authService';

// Đăng nhập
const result = await authService.login('user@example.com', 'password');

// Đăng xuất
await authService.logout();

// Quên mật khẩu
await authService.forgotPassword('user@example.com');

// Reset mật khẩu
await authService.resetPassword(resetToken, 'newPassword', 'newPassword');

// Lấy thông tin user hiện tại
const user = await authService.getCurrentUser();

// Refresh token
await authService.refreshToken();

// Kiểm tra xem đã đăng nhập chưa
const isAuth = authService.isAuthenticated();

// Lấy token
const token = authService.getToken();
```

### 2. **vehicleService.js** - Quản lý xe

Các hàm:

```javascript
import vehicleService from '../services/vehicleService';

// Lấy tất cả xe
const vehicles = await vehicleService.getAllVehicles();

// Lấy chi tiết một xe
const vehicle = await vehicleService.getVehicleById('vehicle123');

// Tạo xe mới (admin only)
const newVehicle = await vehicleService.createVehicle({
  name: 'Tesla Model 3',
  license: '30A-12345',
  status: 'ready',
  // ... other fields
});

// Cập nhật xe
await vehicleService.updateVehicle('vehicle123', {
  status: 'maintenance'
});

// Xóa xe (admin only)
await vehicleService.deleteVehicle('vehicle123');

// Lấy xe theo trạng thái
const readyVehicles = await vehicleService.getVehiclesByStatus('ready');
```

### 3. **bookingService.js** - Quản lý đặt xe

Các hàm:

```javascript
import bookingService from '../services/bookingService';

// Lấy tất cả đặt xe
const bookings = await bookingService.getAllBookings();

// Lấy chi tiết đặt xe
const booking = await bookingService.getBookingById('booking123');

// Tạo đặt xe mới
const newBooking = await bookingService.createBooking({
  vehicleId: 'vehicle123',
  customerId: 'customer456',
  startDate: '2025-01-16',
  endDate: '2025-01-18',
  // ... other fields
});

// Cập nhật đặt xe
await bookingService.updateBooking('booking123', {
  startDate: '2025-01-17'
});

// Hủy đặt xe
await bookingService.cancelBooking('booking123');

// Xác nhận giao xe
await bookingService.confirmDelivery('booking123');

// Xác nhận trả xe với thông tin kiểm tra
await bookingService.confirmReturn('booking123', {
  odo: 12500,
  battery: 85,
  notes: 'Tình trạng xe tốt',
  images: ['url1', 'url2'],
  // ... other inspection data
});
```

## Cách sử dụng trong Component

### Ví dụ 1: Đăng nhập

```javascript
import React, { useState } from 'react';
import authService from '../services/authService';
import { useUserStore } from '../stores/userStore';

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async () => {
    try {
      const response = await authService.login(email, password);
      // Lưu user và token vào store
      setUser({
        token: response.token,
        user: response.user,
      });
      // Chuyển hướng về dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại');
    }
  };

  return (
    // JSX...
  );
}
```

### Ví dụ 2: Lấy danh sách xe

```javascript
import React, { useEffect, useState } from 'react';
import vehicleService from '../services/vehicleService';

export default function VehicleListComponent() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehicleService.getAllVehicles();
        setVehicles(data);
      } catch (err) {
        setError('Lỗi khi tải danh sách xe');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      {vehicles.map((v) => (
        <div key={v.id}>{v.name}</div>
      ))}
    </div>
  );
}
```

### Ví dụ 3: Xác nhận trả xe

```javascript
import React, { useState } from 'react';
import bookingService from '../services/bookingService';

export default function ReturnInspectionComponent({ bookingId }) {
  const [loading, setLoading] = useState(false);

  const handleReturn = async (inspectionData) => {
    setLoading(true);
    try {
      await bookingService.confirmReturn(bookingId, inspectionData);
      // Hiển thị thành công
      alert('Xác nhận trả xe thành công!');
    } catch (err) {
      alert('Lỗi: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // JSX...
  );
}
```

## Xử lý Lỗi

Tất cả các service đều sử dụng try-catch. Lỗi sẽ được throw ra để component xử lý:

```javascript
try {
  const data = await someService.someFunction();
} catch (error) {
  // error.message: Thông báo lỗi
  // error.status: Mã HTTP (nếu có)
  // error.data: Dữ liệu lỗi từ API (nếu có)
  console.error(error);
}
```

## Lưu ý

1. **Token tự động**: Tất cả request sẽ tự động thêm `Authorization: Bearer {token}` header
2. **Logout tự động**: Nếu token hết hạn (401), user sẽ tự động bị logout
3. **Base URL**: Lấy từ biến môi trường `VITE_API_URL` (mặc định: http://localhost:3000/api)
4. **Timeout**: Mỗi request có timeout 10 giây
5. **Response**: Response data được trích xuất tự động, không cần `.data`

## Mở rộng Services

Để thêm service mới, tạo file `services/newService.js`:

```javascript
import api from './api';

const newService = {
  getAll: async () => {
    try {
      const response = await api.get('/endpoint');
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  // ... other methods
};

export default newService;
```
