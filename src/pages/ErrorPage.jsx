import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f7f6', p: 3 }}>
      <Box sx={{ textAlign: 'center', bgcolor: 'white', p: { xs: 4, md: 6 }, borderRadius: 3, boxShadow: 3, maxWidth: 760, width: '100%' }}>
        <Stack spacing={2} alignItems="center">
          <Box sx={{ width: 120, height: 120, borderRadius: '50%', bgcolor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SentimentDissatisfiedIcon sx={{ fontSize: 56, color: '#4caf50' }} />
          </Box>

          <Typography variant="h4" component="h1" fontWeight={800}>
            Không tìm thấy trang
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640 }}>
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Có thể đường dẫn bị sai hoặc tài nguyên đã được gỡ. Hãy thử quay lại trang trước hoặc về trang chủ.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 1 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              size="large"
            >
              Về trang chính
            </Button>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              size="large"
            >
              Quay lại
            </Button>
          </Stack>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
            Nếu bạn nghĩ đây là lỗi, vui lòng liên hệ quản trị viên hoặc thử làm mới trang.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
