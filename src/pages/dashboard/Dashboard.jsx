import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import VehicleCard from "../../components/VehicleCard";

const stats = [
  { title: "Xe sẵn sàng", value: 3 },
  { title: "Đã đặt trước", value: 2 },
  { title: "Đang cho thuê", value: 1 },
  { title: "Tổng số xe", value: 6 },
];

const vehicles = [
  {
    name: "Honda City RS",
    license: "59T2-87343",
    status: "Sẵn sàng",
    battery: 95,
    distance: 12500,
  },
  {
    name: "VinFast VF e34",
    license: "51F-12345",
    status: "Đã đặt trước",
    battery: 88,
    distance: 8200,
    customer: "Nguyễn Văn B",
    time: "2025-01-16 09:00",
  },
  {
    name: "Tesla Model 3",
    license: "30A-99999",
    status: "Đang thuê",
    battery: 72,
    distance: 15600,
    customer: "Trần Thị C",
    time: "2025-01-15 08:00",
  },
  {
    name: "Hyundai Kona",
    license: "92B-55555",
    status: "Sẵn sàng",
    battery: 100,
    distance: 5400,
  },
  {
    name: "Nissan Leaf",
    license: "43C-77777",
    status: "Đã đặt trước",
    battery: 65,
    distance: 22100,
    customer: "Lê Văn D",
    time: "2025-01-16 14:00",
  },
  {
    name: "BYD Atto 3",
    license: "79D-88888",
    status: "Sẵn sàng",
    battery: 80,
    distance: 9800,
  },
];

export default function Dashboard() {
  return (
    <Box
      sx={{
        backgroundColor: "#f9fbf9",
        minHeight: "100vh",
      }}
    >

      {/* Stats */}
      <Grid container spacing={2} mb={3}>
        {stats.map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.title}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 1,
                border: "1px solid #e0e0e0",
              }}
            >
              <CardContent>
                <Typography color="text.secondary" fontWeight={500}>
                  {s.title}
                </Typography>
                <Typography variant="h4" fontWeight={700}>
                  {s.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bộ lọc */}
      <Stack direction="row" spacing={1.5} mb={3}>
        <Button variant="contained" color="success">
          Tất cả xe
        </Button>
        <Button variant="outlined">Xe sẵn sàng</Button>
        <Button variant="outlined">Đã đặt trước</Button>
        <Button variant="outlined">Đang cho thuê</Button>
      </Stack>

      {/* Danh sách xe */}
      <Grid container spacing={2}>
        {vehicles.map((v) => (
          <Grid item xs={12} sm={6} md={4} key={v.license}>
            <VehicleCard {...v} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}