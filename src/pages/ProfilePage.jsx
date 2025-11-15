import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Divider,
} from '@mui/material';
import { useUserStore } from '../stores/userStore';

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Không có thông tin người dùng. Vui lòng đăng nhập.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 1,
          border: '1px solid #e0e0e0',
          p: 3,
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                bgcolor: '#b2e5c2',
                color: '#222',
                fontWeight: 700,
                width: 80,
                height: 80,
                mr: 3,
              }}
            >
              {getInitials(user.fullName)}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700} color="#222">
                {user.fullName || 'Tên không có'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email || 'Email không có'}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Họ và tên
              </Typography>
              <Typography variant="body1">{user.fullName || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Email
              </Typography>
              <Typography variant="body1">{user.email || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Vai trò
              </Typography>
              <Typography variant="body1">{user.role || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Ngày tạo
              </Typography>
              <Typography variant="body1">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
