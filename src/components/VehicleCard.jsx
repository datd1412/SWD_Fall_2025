import React from "react";
import { Card, CardContent, Typography, Box, Button, Chip } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export default function VehicleCard({
  name,
  license,
  customer,
  status,
  battery,
  distance,
  time,
}) {
  const getStatusColor = () => {
    switch (status) {
      case "Sẵn sàng":
        return "success";
      case "Đã đặt trước":
        return "info";
      case "Đang thuê":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        background:
          "linear-gradient(145deg, #e8f5e9 0%, #f8fbf8 100%)",
      }}
    >
      <CardContent>
        {/* Trạng thái */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <InsertDriveFileIcon sx={{ fontSize: 48, color: "#7bd39d" }} />
          <Chip
            label={status}
            color={getStatusColor()}
            variant="outlined"
            size="small"
          />
        </Box>

        {/* Thông tin xe */}
        <Typography variant="h6" fontWeight={600} mt={2}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Biển số: {license}
        </Typography>

        {/* Khách hàng */}
        {customer && (
          <Box
            mt={2}
            p={1.5}
            borderRadius={2}
            bgcolor="#f5f7f5"
            border="1px solid #e0e0e0"
          >
            <Typography variant="body2">
              Khách hàng: <b>{customer}</b>
            </Typography>
            {time && (
              <Typography variant="caption" color="text.secondary">
                Thời gian: {time}
              </Typography>
            )}
          </Box>
        )}

        {/* Dòng pin và km */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Typography variant="body2">
            ⚡ {battery}% 
          </Typography>
          <Typography variant="body2">
            📏 {distance} km
          </Typography>
        </Box>

        {/* Nút hành động */}
        <Box display="flex" gap={1.5} mt={2}>
          {status === "Đang thuê" || status === "Đã đặt trước" ? (
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ flex: 1 }}
            >
              Giao xe
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              sx={{ flex: 1 }}
            >
              Xem chi tiết
            </Button>
          )}
          {status === "Đang thuê" && (
            <Button variant="contained" color="primary" size="small" sx={{ flex: 1 }}>
              Nhận xe
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}