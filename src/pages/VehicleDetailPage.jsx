import React from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import BoltIcon from "@mui/icons-material/Bolt";
import SpeedIcon from "@mui/icons-material/Speed";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

// Mock data for demo - replace with API calls later
const currentRental = {
  status: "ĐANG HOẠT ĐỘNG",
  customer: "Trần Thị C",
  contractId: "#RT-00123",
  startDate: "15/01/2025 08:00",
  endDate: "17/01/2025 08:00",
};

const rentalHistory = [
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
  {
    id: 3,
    customer: "Phạm Văn D",
    period: "28/12/2024 - 01/01/2025",
    duration: "4 ngày",
    distance: "680 km",
    status: "Hoàn thành",
  },
  {
    id: 4,
    customer: "Hoàng Thị E",
    period: "20/12/2024 - 22/12/2024",
    duration: "2 ngày",
    distance: "180 km",
    status: "Hoàn thành",
  },
];

export default function VehicleDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const vehicle = location.state?.vehicle || {
    name: "Tesla Model 3",
    licensePlate: "30A-99999",
    type: "EV_Car",
    battery: 72,
    odo: 15600,
    imageUrl: "https://images2.thanhnien.vn/528068263637045248/2023/9/2/tesla-model-3-2024-18-a708-16936389423651348740155.jpg", // Replace with actual image URL
    status: "Sẵn sàng", // Assume available by default
  };

  const isAvailable = vehicle.status === "Sẵn sàng";

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
              <Chip
                label={vehicle.status}
                color={vehicle.status === "Sẵn sàng" ? "success" : "warning"}
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  bgcolor: vehicle.status === "Sẵn sàng" ? "rgba(47, 181, 108, 0.95)" : "rgba(255, 152, 0, 0.95)",
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
            <Typography
              variant="h5"
              component="div"
              fontWeight={700}
              gutterBottom
            >
              {vehicle.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
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
                  {vehicle.type}
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
                  {vehicle.battery}%
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
                  <Typography variant="body2">ODO</Typography>
                </Stack>
                <Typography variant="body2" fontWeight={600} mt={0.5}>
                  {vehicle.odo?.toLocaleString()} km
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: isAvailable ? "#2fb56c" : "#ff9800",
                  height: 48,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: isAvailable ? "#2aa561" : "#e68900",
                    transform: "translateY(-2px)",
                    boxShadow: isAvailable ? "0 4px 12px rgba(47, 181, 108, 0.4)" : "0 4px 12px rgba(255, 152, 0, 0.4)",
                  },
                }}
                // onClick={() => {
                //   if (isAvailable) {
                //     navigate(
                //       `/check-out/${encodeURIComponent(vehicle.licensePlate)}`,
                //       { state: { vehicle } }
                //     );
                //   } else {
                //     navigate(
                //       `/check-in/return/${encodeURIComponent(vehicle.licensePlate)}`,
                //       { state: { vehicle } }
                //     );
                //   }
                // }}
              >
                {isAvailable ? "Đặt xe" : "Nhận xe"}
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/dashboard")}
                sx={{
                  height: 48,
                  borderRadius: 2,
                  borderColor: isAvailable ? "#2fb56c" : "#ff9800",
                  borderWidth: 1.5,
                  color: isAvailable ? "#2fb56c" : "#ff9800",
                  textTransform: "none",
                  fontWeight: 600,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    borderColor: isAvailable ? "#2aa561" : "#e68900",
                    borderWidth: 1.5,
                    color: isAvailable ? "#2aa561" : "#e68900",
                    bgcolor: isAvailable ? "rgba(47, 181, 108, 0.04)" : "rgba(255, 152, 0, 0.04)",
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

      {/* Right section - Current rental and history */}
      <Grid item xs={12} md={7}>
        {/* Current rental info */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            },
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
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.1) rotate(5deg)",
                },
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
                position: "relative",
                p: 3,
                bgcolor: "#f9f9f9",
                borderRadius: 2,
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
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
                position: "relative",
                p: 3,
                bgcolor: "#f6faf7",
                borderRadius: 2,
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Chip
                label={currentRental.status}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  bgcolor: "rgba(47, 181, 108, 0.95)",
                  backdropFilter: "blur(4px)",
                  color: "white",
                  fontWeight: 600,
                  px: 1.5,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  "& .MuiChip-label": {
                    px: 0.5,
                  },
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

        {/* Rental history */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            },
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
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.1) rotate(-5deg)",
                },
              }}
            >
              <DirectionsCarIcon sx={{ color: "#2fb56c" }} />
            </Box>
            <Typography variant="h6" fontWeight={600}>
              Lịch sử giao dịch
            </Typography>
          </Stack>

          <Stack
            spacing={2}
            sx={{
              "& > *": {
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateX(4px)",
                },
              },
            }}
          >
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
