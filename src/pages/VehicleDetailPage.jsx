import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import BoltIcon from "@mui/icons-material/Bolt";
import SpeedIcon from "@mui/icons-material/Speed";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import vehicleService from "../../services/vehicleService";

export default function VehicleDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicleId } = useParams();

  const [vehicle, setVehicle] = useState(location.state?.vehicle || null);
  const [loading, setLoading] = useState(!location.state);
  const [error, setError] = useState(null);

  // Fetch lại nếu reload (mất state)
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        if (!vehicle) {
          setLoading(true);
          const res = await vehicleService.getAllVehicles();
          const found = res.data.find(
            (v) => String(v.licensePlate) === decodeURIComponent(vehicleId)
          );
          if (!found) throw new Error("Không tìm thấy xe");
          setVehicle(found);
        }
      } catch (err) {
        console.error(err);
        setError("Không thể tải dữ liệu xe");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [vehicle, vehicleId]);

  if (loading) return <Typography>Đang tải...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!vehicle) return <Typography>Không có dữ liệu xe.</Typography>;

  const statusMap = {
    Available: {
      label: "Sẵn sàng",
      color: "#2fb56c",
      buttonText: "Đặt xe",
    },
    Booked: {
      label: "Đã đặt trước",
      color: "#2196f3",
      buttonText: "Giao xe",
    },
    InUse: {
      label: "Đang thuê",
      color: "#ff9800",
      buttonText: "Nhận xe",
    },
    Maintenance: {
      label: "Bảo trì",
      color: "#f44336",
      buttonText: "Đang bảo trì",
    },
    Damaged: {
      label: "Hư hỏng",
      color: "#9e9e9e",
      buttonText: "Xe hư hỏng",
    },
  };

  const statusInfo =
    statusMap[vehicle.status] || {
      label: "Không rõ",
      color: "#9e9e9e",
      buttonText: "Xem chi tiết",
    };

  const currentRental = vehicle.currentRental || {
    status: "ĐANG HOẠT ĐỘNG",
    customer: "Trần Thị C",
    contractId: "#RT-00123",
    startDate: "15/01/2025 08:00",
    endDate: "17/01/2025 08:00",
  };

  const rentalHistory = vehicle.rentalHistory || [
    {
      id: 1,
      customer: "Nguyễn Văn A",
      period: "10/01/2025 - 12/01/2025",
      duration: "2 ngày",
      distance: "250 km",
      location: "Chi nhánh Quận 1",
      status: "Hoàn thành",
    },
    {
      id: 2,
      customer: "Lê Thị B",
      period: "05/01/2025 - 08/01/2025",
      duration: "3 ngày",
      distance: "420 km",
      status: "Hoàn thành",
    },
  ];

  // ✅ Cập nhật điều kiện khả dụng
  const isAvailable = vehicle.status === "Available";

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 0 } }}>
      <Grid container spacing={3}>
        {/* Left card - Vehicle details */}
        <Grid item xs={12} md={5}>
          <Card
            sx={{
              position: "relative",
              height: "100%",
              borderRadius: 3,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  width: "100%",
                  height: 300,
                  background: vehicle.imageUrl
                    ? `url(${vehicle.imageUrl}) center/cover no-repeat`
                    : "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
                  borderRadius: "12px 12px 0 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 80,
                  color: "white",
                }}
              >
                {!vehicle.imageUrl && "🚗"}
              </Box>

              {/* ✅ Hiển thị chip trạng thái đúng màu */}
              <Chip
                label={statusInfo.label}
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  bgcolor: `${statusInfo.color}E6`,
                  backdropFilter: "blur(4px)",
                  color: "white",
                  fontWeight: 600,
                  px: 1.5,
                  "& .MuiChip-label": {
                    px: 0.5,
                  },
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
            </Box>

            <CardContent>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {vehicle.brand} {vehicle.model}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                Biển số: {vehicle.licensePlate}
              </Typography>

              <Stack direction="row" spacing={3} mt={2} mb={3}>
                <Box>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    color="text.secondary"
                  >
                    <DirectionsCarIcon />
                    <Typography variant="body2">Loại xe</Typography>
                  </Stack>
                  <Typography variant="body2" fontWeight={600} mt={0.5}>
                    {vehicle.type || "EV_Car"}
                  </Typography>
                </Box>

                <Box>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    color="text.secondary"
                  >
                    <BoltIcon />
                    <Typography variant="body2">Mức pin</Typography>
                  </Stack>
                  <Typography variant="body2" fontWeight={600} mt={0.5}>
                    {vehicle.batteryCapacity ?? 0}%
                  </Typography>
                </Box>

                <Box>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    color="text.secondary"
                  >
                    <SpeedIcon />
                    <Typography variant="body2">Trạm</Typography>
                  </Stack>
                  <Typography variant="body2" fontWeight={600} mt={0.5}>
                    {vehicle.stationName || "Không rõ"}
                  </Typography>
                </Box>
              </Stack>

              {/* ✅ Button đổi màu & text theo trạng thái */}
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: statusInfo.color,
                    height: 48,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      bgcolor: `${statusInfo.color}CC`,
                      transform: "translateY(-2px)",
                      boxShadow: `0 4px 12px ${statusInfo.color}66`,
                    },
                  }}
                >
                  {statusInfo.buttonText}
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate("/dashboard")}
                  sx={{
                    height: 48,
                    borderRadius: 2,
                    borderColor: statusInfo.color,
                    borderWidth: 1.5,
                    color: statusInfo.color,
                    textTransform: "none",
                    fontWeight: 600,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      borderColor: `${statusInfo.color}CC`,
                      color: `${statusInfo.color}CC`,
                      bgcolor: `${statusInfo.color}10`,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Quay lại
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Phần bên phải giữ nguyên */}
        <Grid item xs={12} md={7}>
          {/* ... Current rental + history giữ nguyên code gốc ... */}
          <Paper
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "#f6faf7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BoltIcon sx={{ color: "#2fb56c" }} />
              </Box>
              <Typography variant="h6" fontWeight={600}>
                Thông tin thuê hiện tại
              </Typography>
            </Stack>

            {isAvailable ? (
              <Box
                sx={{
                  p: 3,
                  bgcolor: "#f9f9f9",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Xe hiện tại chưa được thuê. Sẵn sàng cho thuê mới.
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  p: 3,
                  bgcolor: "#f6faf7",
                  borderRadius: 2,
                }}
              >
                <Chip
                  label={currentRental.status}
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    bgcolor: "rgba(47, 181, 108, 0.95)",
                    color: "white",
                    fontWeight: 600,
                  }}
                />

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Khách hàng
                    </Typography>
                    <Typography variant="body1" fontWeight={600} mt={0.5}>
                      {currentRental.customer}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Mã hợp đồng
                    </Typography>
                    <Typography variant="body1" fontWeight={600} mt={0.5}>
                      {currentRental.contractId}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Thời gian bắt đầu
                    </Typography>
                    <Typography variant="body1" fontWeight={600} mt={0.5}>
                      {currentRental.startDate}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Dự kiến trả xe
                    </Typography>
                    <Typography variant="body1" fontWeight={600} mt={0.5}>
                      {currentRental.endDate}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>

          {/* History giữ nguyên */}
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "#f6faf7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DirectionsCarIcon sx={{ color: "#2fb56c" }} />
              </Box>
              <Typography variant="h6" fontWeight={600}>
                Lịch sử giao dịch
              </Typography>
            </Stack>

            <Stack spacing={2}>
              {rentalHistory.map((rental, index) => (
                <React.Fragment key={rental.id}>
                  {index > 0 && <Divider />}
                  <Box sx={{ py: 1 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      mb={1}
                    >
                      <Typography variant="subtitle2" fontWeight={600}>
                        {rental.period}
                      </Typography>
                      <Chip
                        label={rental.status}
                        size="small"
                        sx={{
                          bgcolor: "#f6faf7",
                          color: "#2fb56c",
                          fontWeight: 600,
                        }}
                      />
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                      Khách hàng: {rental.customer}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      mt={0.5}
                      color="text.secondary"
                    >
                      <Typography variant="body2">{rental.duration}</Typography>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          bgcolor: "currentColor",
                        }}
                      />
                      <Typography variant="body2">{rental.distance}</Typography>
                      {rental.location && (
                        <>
                          <Box
                            component="span"
                            sx={{
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              bgcolor: "currentColor",
                            }}
                          />
                          <Typography variant="body2">
                            {rental.location}
                          </Typography>
                        </>
                      )}
                    </Stack>
                  </Box>
                </React.Fragment>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
