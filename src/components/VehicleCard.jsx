import React from "react";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import SpeedIcon from "@mui/icons-material/Speed";

export default function VehicleCard({
  id,
  licensePlate,
  model,
  brand,
  batteryCapacity,
  status,
  imageUrl,
  description,
  stationName,
  onViewDetail,
}) {
  const navigate = useNavigate();

  // Map trạng thái tiếng Anh -> tiếng Việt
  const statusMap = {
    Available: "Sẵn sàng",
    Booked: "Đã đặt trước",
    Rented: "Đang thuê",
    Maintenance: "Bảo trì",
  };
  const displayStatus = statusMap[status] || status;

  // Gán màu cho chip trạng thái
  const statusColor = {
    "Sẵn sàng": "success",
    "Đã đặt trước": "info",
    "Đang thuê": "warning",
    "Bảo trì": "error",
  }[displayStatus] || "default";

  return (
    <Card
      sx={{
        width: 340,
        height: 420,
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        bgcolor: "background.paper",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
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
            }}
          />
        ) : (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: 48,
              opacity: 0.15,
              color: "#065F46",
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
        }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        {/* Tên xe */}
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {brand} {model}
        </Typography>

        {/* Biển số */}
        <Typography
          variant="body2"
          color="text.secondary"
          mb={1}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Biển số: {licensePlate}
        </Typography>

        {/* Dung lượng pin */}
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

        <Divider sx={{ my: 1 }} />

        {/* Các nút hành động */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ flex: 1, textTransform: "none", borderRadius: 2 }}
            onClick={() =>
              navigate(`/dashboard/vehicle-detail/${encodeURIComponent(licensePlate)}`, {
                state: {
                  id,
                  licensePlate,
                  model,
                  brand,
                  batteryCapacity,
                  status: displayStatus,
                  imageUrl,
                  description,
                  stationName,
                },
              })
            }
          >
            Xem chi tiết
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}