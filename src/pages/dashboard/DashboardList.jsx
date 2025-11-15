import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import staffService from "../../../services/staffService";
import VehicleCard from "../../components/VehicleCard";

export default function DashboardList() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = React.useState("all");
  const [vehicles, setVehicles] = React.useState([]);
  const [vehiclesSummary, setVehiclesSummary] = React.useState([]);
  const [bookings, setBookings] = React.useState([]);
  const [rentals, setRentals] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await staffService.getStaffDashboard();
        if (response && response.vehicles) {
          setVehiclesSummary(response.vehicles);
        }
        if (response && response.rentals) {
          setRentals(response.rentals);
        }
        if (response && response.bookings) {
          setBookings(response.bookings);
        }
        if (response && response.vehicleList) {
          setVehicles(response.vehicleList);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Không thể tải dữ liệu bảng điều khiển");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const filteredVehicles = React.useMemo(() => {
    if (selectedStatus === "all") return vehicles;
    return vehicles.filter((v) => {
      switch (selectedStatus) {
        case "ready":
          return v.status === "Available";
        case "booked":
          return v.status === "Booked";
        case "rented":
          return v.status === "InUse";
        default:
          return true;
      }
    });
  }, [selectedStatus, vehicles]);

  const stats = React.useMemo(() => {
    const ready = vehiclesSummary.available;
    const booked = vehiclesSummary.booked;
    const rented = vehiclesSummary.inUse;
    const maintenance = vehiclesSummary.total - (ready + booked + rented);
    return [
      { title: "Xe sẵn sàng", value: ready },
      { title: "Đã đặt trước", value: booked },
      { title: "Đang cho thuê", value: rented },
      { title: "Đang bảo trì", value: maintenance },
      { title: "Tổng số xe", value: vehiclesSummary.total },
    ];
  }, [vehiclesSummary]);

  if (error)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant="h4" color="error" gutterBottom>
          ⚠️ Lỗi
        </Typography>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Box>
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

      <Stack direction="row" spacing={1.5} mb={3}>
        <Button
          variant={selectedStatus === "all" ? "contained" : "outlined"}
          color="success"
          onClick={() => setSelectedStatus("all")}
        >
          Tất cả xe
        </Button>
        <Button
          variant={selectedStatus === "ready" ? "contained" : "outlined"}
          color="success"
          onClick={() => setSelectedStatus("ready")}
        >
          Xe sẵn sàng
        </Button>
        <Button
          variant={selectedStatus === "booked" ? "contained" : "outlined"}
          color="success"
          onClick={() => setSelectedStatus("booked")}
        >
          Đã đặt trước
        </Button>
        <Button
          variant={selectedStatus === "rented" ? "contained" : "outlined"}
          color="success"
          onClick={() => setSelectedStatus("rented")}
        >
          Đang cho thuê
        </Button>
      </Stack>

      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress color="success" />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredVehicles.map((v) => (
            <Grid item xs={12} sm={6} md={4} key={v.id}>
              <VehicleCard {...v} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
