import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Chip,
  TextField,
  Button,
  Divider,
  Avatar,
  IconButton,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const vehicle = location.state?.vehicle || {
    name: 'Honda City RS',
    license: params.vehicleId || '59T2-87343',
    type: 'EV_Car',
    battery: 95,
    odo: 12500,
    branch: 'Chi nhánh Quận 1',
    imageUrl: '',
    customer: 'Nguyễn Văn A',
    start: '10/01/2025 09:00',
    end: '12/01/2025 09:00',
    reservationId: '#RT-002401',
  };

  // Images state for 6 required photos
  const [images, setImages] = useState(Array(6).fill(null));
  const [previews, setPreviews] = useState(Array(6).fill(''));
  const [submitting, setSubmitting] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: '', severity: 'success' });

  const handleFileChange = (index, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // basic size validation (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setSnack({ open: true, msg: 'Kích thước ảnh tối đa 5MB', severity: 'error' });
      return;
    }
    const url = URL.createObjectURL(file);
    setImages((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
    setPreviews((prev) => {
      const next = [...prev];
      // revoke previous if existed
      if (next[index]) URL.revokeObjectURL(next[index]);
      next[index] = url;
      return next;
    });
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setPreviews((prev) => {
      const next = [...prev];
      if (next[index]) URL.revokeObjectURL(next[index]);
      next[index] = '';
      return next;
    });
  };

  useEffect(() => {
    return () => {
      previews.forEach((p) => p && URL.revokeObjectURL(p));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    // validate: all 6 images present
    const missing = images.some((i) => !i);
    if (missing) {
      setSnack({ open: true, msg: 'Vui lòng chụp đủ 6 ảnh trước khi xác nhận', severity: 'error' });
      return;
    }
    setSubmitting(true);
    // mock submit
    setTimeout(() => {
      setSubmitting(false);
      setSnack({ open: true, msg: 'Xác nhận thành công — xe sẵn sàng cho thuê', severity: 'success' });
      // optional: navigate back after short delay
      // setTimeout(() => navigate('/dashboard'), 1000);
    }, 1200);
  };

  return (
    <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="div"
                  sx={{ height: 180, bgcolor: 'linear-gradient(135deg,#A7F3D0,#6EE7B7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Box sx={{ width: 80, height: 80, borderRadius: 2, bgcolor: '#eaf9ef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PhotoCameraIcon sx={{ color: '#2fb56c', fontSize: 34 }} />
                  </Box>
                </CardMedia>
                <Chip label="Chuẩn bị" sx={{ position: 'absolute', top: 12, right: 12, bgcolor: '#fff3' }} />
              </Box>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>{vehicle.name}</Typography>
                <Typography variant="body2" color="text.secondary">Biển số: {vehicle.license}</Typography>

                <Stack spacing={1} mt={2}>
                  <Typography variant="body2" color="text.secondary">Loại xe</Typography>
                  <Typography variant="body1" fontWeight={600}>{vehicle.type}</Typography>

                  <Typography variant="body2" color="text.secondary" mt={1}>Nhân viên giao xe</Typography>
                  <Typography variant="body1" fontWeight={600}>Nguyễn Văn A</Typography>

                  <Typography variant="body2" color="text.secondary" mt={1}>Khách thuê</Typography>
                  <Typography variant="body1" fontWeight={600}>{vehicle.customer}</Typography>

                  <Typography variant="body2" color="text.secondary" mt={1}>Thời gian</Typography>
                  <Typography variant="body1" fontWeight={600}>{vehicle.start} - {vehicle.end}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={3}>
                <Box>
                  <Paper sx={{ p: 2, bgcolor: '#fff6', borderRadius: 2, mb: 2 }}>
                    <Typography variant="body2" color="error">Bạn có đơn thuê sắp theo vào {vehicle.start} - Vui lòng hoàn thành giao xe trước thời gian này</Typography>
                  </Paper>

                  <Typography variant="h6" fontWeight={700} mb={2}>Thông tin giao xe</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth label="ODO trước giao (km)" defaultValue={vehicle.odo} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth label="Mức pin hiện tại (%)" defaultValue={vehicle.battery} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth multiline rows={3} label="Ghi chú tình trạng xe" placeholder="Ví dụ: xe sạch, xăng đầy..." />
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Typography variant="h6" fontWeight={700} mb={2}>Chụp ảnh xe (6 vị trí bắt buộc)</Typography>
                  <Grid container spacing={2}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Grid item xs={12} sm={6} md={4} key={i}>
                        <Paper
                          sx={{
                            height: 130,
                            borderRadius: 2,
                            border: images[i] ? '1px solid rgba(47,181,108,0.18)' : '1px dashed #e6eee8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            bgcolor: images[i] ? '#f7fff8' : 'transparent'
                          }}
                        >
                          {images[i] ? (
                            <>
                              <Box component="img" src={previews[i]} alt={`slot-${i}`} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <IconButton
                                size="small"
                                onClick={() => removeImage(i)}
                                sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.4)', color: '#fff' }}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                              <CheckCircleIcon sx={{ position: 'absolute', bottom: 8, left: 8, color: '#2fb56c' }} />
                            </>
                          ) : (
                            <label style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => handleFileChange(i, e)}
                              />
                              <Stack alignItems="center" spacing={1}>
                                <PhotoCameraIcon color="action" />
                                <Typography variant="caption" color="text.secondary">Thêm ảnh</Typography>
                              </Stack>
                            </label>
                          )}
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                  <Typography variant="caption" color="text.secondary" mt={1} display="block">Yêu cầu: 6 ảnh, kích thước tối đa mỗi ảnh 5MB.</Typography>
                </Box>

                <Box>
                  <Typography variant="h6" fontWeight={700} mb={2}>Chờ ký xác nhận</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ minHeight: 120, borderRadius: 2, p: 2 }}>Chữ ký người thuê</Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ minHeight: 120, borderRadius: 2, p: 2 }}>Chữ ký nhân viên</Paper>
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button variant="outlined" onClick={() => navigate(-1)} disabled={submitting}>Hủy bỏ</Button>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: '#2fb56c' }}
                    onClick={handleSubmit}
                    disabled={submitting}
                    startIcon={submitting ? <CircularProgress color="inherit" size={16} /> : null}
                  >
                    {submitting ? 'Đang xử lý...' : 'Xác nhận xe sẵn sàng cho thuê'}
                  </Button>
                </Stack>
                <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack((s)=>({...s, open:false}))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                  <MuiAlert elevation={6} variant="filled" onClose={() => setSnack((s)=>({...s, open:false}))} severity={snack.severity}>
                    {snack.msg}
                  </MuiAlert>
                </Snackbar>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
    );
}
