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
  name,
  license,
  battery,
  mileage,
  status,
  image,
  customer,
  onViewDetail,
}) {
  const navigate = useNavigate();

  // Removed unused handlePrimaryClick
  // Gán màu trạng thái
  const statusColor = {
    "Sẵn sàng": "success",
    "Đã đặt trước": "info",
    "Đang thuê": "warning",
  }[status] || "default";

  return (
    <Card
      sx={{
        width: 340,
        height: 460, // Taller card to accommodate all content
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
      {/* Ảnh hoặc nền gradient với aspect ratio 16:9 */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          pt: '56.25%', // 16:9 Aspect Ratio
          background: image ? 'none' : 'linear-gradient(135deg, #A7F3D0 0%, #6EE7B7 50%, #34D399 100%)',
          overflow: 'hidden',
        }}
      >
        {image ? (
          <CardMedia
            component="img"
            src={image}
            alt={name}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 48,
              opacity: 0.15,
              color: "#065F46",
            }}
          >
            🚗
          </Box>
        )}
      </Box>

      {/* Tag trạng thái góc trên bên phải */}
      <Chip
        label={status}
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
          justifyContent: "space-between"
        }}
      >
        {/* Tên xe */}
        <Typography 
          variant="subtitle1" 
          fontWeight={600}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          mb={1}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          Biển số: {license}
        </Typography>

        {/* Pin + Km */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <ElectricBoltIcon fontSize="small" color="success" />
            <Typography variant="body2">{battery}%</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <SpeedIcon fontSize="small" color="action" />
            <Typography variant="body2">
              {Number(mileage).toLocaleString()} km
            </Typography>
          </Box>
        </Box>

        {/* Nếu có khách hàng */}
        {customer && (
          <Box
            sx={{
              bgcolor: "#f9fafb",
              borderRadius: 2,
              p: 1.5,
              mb: 1,
              border: "1px solid #e5e7eb",
              minHeight: 'auto', // Allow box to shrink
            }}
          >
            <Typography 
              variant="body2" 
              fontWeight={500}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              Khách hàng: {customer.name}
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block'
              }}
            >
              Thời gian: {customer.time}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 1 }} />

        {/* Các nút */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            mt: 2
          }}
        >
          {status === "Đang thuê" ? (
            <>
              <Button
                variant="contained"
                color="primary"
                sx={{ flex: 1, textTransform: "none", borderRadius: 2 }}
                onClick={() => {
                  navigate(`/check-in/return/${encodeURIComponent(license)}`, {
                    state: { name, license, battery, mileage, status, image, customer }
                  });
                }}
              >
                Nhận xe
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  if (onViewDetail) {
                    onViewDetail({ name, license, battery, mileage, status, image, customer });
                    return;
                  }
                  // fallback navigate
                  navigate(`/dashboard/check-in/${encodeURIComponent(license)}`, { 
                    state: { name, license, battery, mileage, status, image, customer } 
                  });
                }}
                sx={{ flex: 1, textTransform: "none", borderRadius: 2 }}
              >
                Chi tiết
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="success"
                sx={{ flex: 1, textTransform: "none", borderRadius: 2 }}
                onClick={() => {
                  if (status === 'Đã đặt trước') {
                    // navigate to delivery/prepare page
                    navigate(`/check-out/${encodeURIComponent(license)}`, { state: { name, license, battery, mileage, status, image, customer } });
                    return;
                  }
                  // fallback: view checkout/detail
                  if (onViewDetail) {
                    onViewDetail({ name, license, battery, mileage, status, image, customer });
                    return;
                  }
                  navigate(`/dashboard/check-in/${encodeURIComponent(license)}`, { state: { name, license, battery, mileage, status, image, customer } });
                }}
              >
                {status === "Đã đặt trước" ? "Giao xe" : "Xem chi tiết"}
              </Button>
              {status !== "Sẵn sàng" && (
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ flex: 1, textTransform: "none", borderRadius: 2 }}
                >
                  Chi tiết
                </Button>
              )}
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
