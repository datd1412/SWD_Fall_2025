import React from 'react';
import { Box, Stack, IconButton, Typography, Avatar } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useLocation, useParams, Outlet } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';

export default function CheckingLayout() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const location = useLocation();
  const params = useParams();

  const vehicle = location.state?.vehicle || { reservationId: params.vehicleId || '' };

  const getPageInfo = () => {
    const path = location.pathname;
    if (path.includes('/check-in/return')) {
      return {
        title: 'Kiểm tra xe sau thuê',
        subtitle: `Nhận xe từ khách hàng - Rental #${vehicle.reservationId}`
      };
    }
    if (path.includes('/check-out')) {
      return {
        title: 'Chuẩn bị xe cho thuê',
        subtitle: `Giao xe cho khách hàng - Rental #${vehicle.reservationId}`
      };
    }
    return {
      title: 'Kiểm tra xe',
      subtitle: `ID: ${vehicle.reservationId}`
    };
  };

  const pageInfo = getPageInfo();

  return (
    <Box sx={{ bgcolor: '#f5f7f6', minHeight: '100vh', pb: 6 }}>
      <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #eef2f1', py: 2, px: { xs: 2, md: 6 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton onClick={() => navigate(-1)} size="small">
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {pageInfo.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {pageInfo.subtitle}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2" color="text.secondary">Nhân viên: {user.fullName}</Typography>
            <Avatar sx={{ bgcolor: '#b2e5c2' }}>NA</Avatar>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 4, px: { xs: 2, md: 0 } }}>
        {/* Outlet will render the actual deliver page content (form, photos, signatures) */}
        <Outlet />
      </Box>
    </Box>
  );
}
