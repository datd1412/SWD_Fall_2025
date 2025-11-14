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
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import vehicleService from "../../../services/vehicleService";
import VehicleCard from "../../components/VehicleCard";

export default function DashboardList() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [vehicles, setVehicles] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mapStatus = (status) => {
    if (!status) return "";
    const ss = String(status).toLowerCase();
    if (ss === "available") return "Sẵn sàng";
    if (ss === "booked") return "Đã đặt trước";
    if (ss === "inuse") return "Đang thuê";
    if (ss === "maintenance") return "Bảo trì";
    if (ss === "damaged") return "Hỏng hóc";
    return status;
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;
        const stationId = user?.stationId || 1;

        console.log(" Fetching dashboard for stationId:", stationId);
        const response = await vehicleService.getStaffDashboard(stationId);
        console.log(" Dashboard response:", response);

        if (response) {
          const dashData = response;

          setDashboardStats({
            vehicles: dashData.vehicles,
            bookings: dashData.bookings,
            rentals: dashData.rentals,
            unverifiedUsers: dashData.unverifiedUsers,
          });

          const normalized = dashData.vehicleList.map((v) => ({
            id: v.id,
            name: `${v.brand || ""} ${v.model || ""}`.trim(),
            license: v.licensePlate,
            battery: v.batteryCapacity ?? 0,
            mileage: 0,
            status: mapStatus(v.status),
            image: v.imageUrl,
            customer: v.booking
              ? {
                  name: v.booking.customerName,
                  time: new Date(v.booking.scheduledPickupTime).toLocaleString(
                    "vi-VN"
                  ),
                }
              : v.rental
              ? {
                  name: v.rental.customerName,
                  time: new Date(v.rental.pickupTime).toLocaleString("vi-VN"),
                }
              : null,
            booking: v.booking,
            rental: v.rental,
            raw: v,
          }));

          setVehicles(normalized);
        }
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        setError("Không thể tải danh sách xe");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleViewDetail = (vehicle) => {
    navigate(`/dashboard/check-in/${encodeURIComponent(vehicle.license)}`, {
      state: { vehicle },
    });
  };

  const filteredVehicles = useMemo(() => {
    if (selectedStatus === "all") return vehicles;
    return vehicles.filter((v) => {
      switch (selectedStatus) {
        case "ready":
          return v.status === "Sẵn sàng";
        case "booked":
          return v.status === "Đã đặt trước";
        case "rented":
          return v.status === "Đang thuê";
        default:
          return true;
      }
    });
  }, [selectedStatus, vehicles]);

  const stats = useMemo(() => {
    if (dashboardStats?.vehicles) {
      return [
        { title: "Xe sẵn sàng", value: dashboardStats.vehicles.available },
        { title: "Đã đặt trước", value: dashboardStats.vehicles.booked },
        { title: "Đang cho thuê", value: dashboardStats.vehicles.inUse },
        { title: "Tổng số xe", value: dashboardStats.vehicles.total },
      ];
    }

    const ready = vehicles.filter((v) => v.status === "Sẵn sàng").length;
    const booked = vehicles.filter((v) => v.status === "Đã đặt trước").length;
    const rented = vehicles.filter((v) => v.status === "Đang thuê").length;
    return [
      { title: "Xe sẵn sàng", value: ready },
      { title: "Đã đặt trước", value: booked },
      { title: "Đang cho thuê", value: rented },
      { title: "Tổng số xe", value: vehicles.length },
    ];
  }, [vehicles, dashboardStats]);

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
            <Grid item xs={12} sm={6} md={4} key={v.license}>
              <VehicleCard {...v} onViewDetail={handleViewDetail} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
