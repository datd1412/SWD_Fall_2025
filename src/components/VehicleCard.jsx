import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Divider,
  Tooltip,
} from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import SpeedIcon from "@mui/icons-material/Speed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export default function VehicleCard({
  id,
  licensePlate,
  model,
  brand,
  year,
  color,
  batteryCapacity,
  pricePerHour,
  pricePerDay,
  status,
  imageUrl,
  description,
  stationName,
}) {
  const navigate = useNavigate();

  const statusMap = {
    Available: "Sẵn sàng",
    Booked: "Đã đặt trước",
    InUse: "Đang thuê",
    Maintenance: "Bảo trì",
  };
  const displayStatus = statusMap[status] || status;

  const statusColor =
    {
      "Sẵn sàng": "success",
      "Đã đặt trước": "info",
      "Đang thuê": "warning",
      "Bảo trì": "error",
    }[displayStatus] || "default";

  const vehicleData = {
    id,
    licensePlate,
    model,
    brand,
    year,
    color,
    batteryCapacity,
    pricePerHour,
    pricePerDay,
    status,
    imageUrl,
    description,
    stationName,
  };

  const handleViewDetail = () => {
    navigate(`/dashboard/vehicle-detail/${encodeURIComponent(licensePlate)}`, {
      state: { vehicle: vehicleData },
    });
  };

  const handleCheckOut = () => {
    navigate(`/check-out/${encodeURIComponent(licensePlate)}`, {
      state: { vehicle: vehicleData },
    });
  };

  const handleCheckIn = () => {
    navigate(`/check-in/return/${encodeURIComponent(licensePlate)}`, {
      state: { vehicle: vehicleData },
    });
  };

  return (
    <Card
      sx={{
        width: 340,
        height: 440,
        borderRadius: 4,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        bgcolor: "background.paper",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Ảnh xe hoặc nền mặc định */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          pt: "56.25%",
          background: imageUrl
            ? "none"
            : "linear-gradient(135deg, #A7F3D0 0%, #6EE7B7 50%, #34D399 100%)",
          overflow: "hidden",
        }}
      >
        {imageUrl ? (
          <CardMedia
            component="img"
            src={imageUrl}
            alt={model}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
        ) : (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: 56,
              opacity: 0.25,
            }}
          >
            🚗
          </Box>
        )}
      </Box>

      {/* Chip trạng thái */}
      <Chip
        label={displayStatus}
        color={statusColor}
        size="small"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          fontWeight: 600,
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2.5,
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        {/* Tên xe */}
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {brand} {model}
        </Typography>

        {/* Biển số + năm + màu */}
        <Typography variant="body2" color="text.secondary" mb={1}>
          Biển số: <strong>{licensePlate}</strong>
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexWrap: "wrap",
            mb: 1,
          }}
        >
          <Tooltip title="Năm sản xuất">
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarMonthIcon fontSize="small" color="action" />
              <Typography variant="body2">{year}</Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Màu xe">
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <ColorLensIcon fontSize="small" sx={{ color: color?.toLowerCase() || "#666" }} />
              <Typography variant="body2">{color}</Typography>
            </Box>
          </Tooltip>
        </Box>

        {/* Pin + Điểm thuê */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <ElectricBoltIcon fontSize="small" color="success" />
            <Typography variant="body2">{batteryCapacity}%</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <SpeedIcon fontSize="small" color="action" />
            <Typography variant="body2">{stationName}</Typography>
          </Box>
        </Box>

        {/* Giá thuê */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          <MonetizationOnIcon fontSize="small" color="primary" />
          <Typography variant="body2">
            <strong>{pricePerHour.toLocaleString("vi-VN")}₫/giờ</strong> —{" "}
            {pricePerDay.toLocaleString("vi-VN")}₫/ngày
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Nút hành động */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            mt: 2,
          }}
        >
          {(status === "Available" ||
            status === "Maintenance" ||
            status === "Damaged") && (
            <Button
              variant="contained"
              color="inherit"
              sx={{
                flex: 1,
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
              }}
              onClick={handleViewDetail}
            >
              Xem chi tiết
            </Button>
          )}

          {status === "Booked" && (
            <>
              <Button
                variant="contained"
                color="primary"
                sx={{ flex: 1, textTransform: "none", borderRadius: 2 }}
                onClick={handleCheckOut}
              >
                Giao xe
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ flex: 1, textTransform: "none", borderRadius: 2 }}
                onClick={handleViewDetail}
              >
                Chi tiết
              </Button>
            </>
          )}

          {status === "InUse" && (
            <>
              <Button
                variant="contained"
                color="success"
                sx={{ flex: 1, textTransform: "none", borderRadius: 2 }}
                onClick={handleCheckIn}
              >
                Nhận xe
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ flex: 1, textTransform: "none", borderRadius: 2 }}
                onClick={handleViewDetail}
              >
                Chi tiết
              </Button>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}