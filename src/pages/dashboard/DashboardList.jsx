import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  CircularProgress,
} from "@mui/material";
import VehicleCard from "../../components/VehicleCard";
import { useNavigate } from "react-router-dom";
import vehicleService from "../../../services/vehicleService";

// const stats = [
//   { title: "Xe sẵn sàng", value: 3 },
//   { title: "Đã đặt trước", value: 2 },
//   { title: "Đang cho thuê", value: 1 },
//   { title: "Tổng số xe", value: 6 },
// ];

// const vehicles = [
//   {
//     name: "Honda City RS",
//     license: "59T2-87343",
//     status: "Sẵn sàng",
//     battery: 95,
//     distance: 12500,
//   },
//   {
//     name: "VinFast VF e34",
//     license: "51F-12345",
//     status: "Đã đặt trước",
//     battery: 88,
//     distance: 8200,
//     customer: "Nguyễn Văn B",
//     time: "2025-01-16 09:00",
//   },
//   {
//     name: "Tesla Model 3",
//     license: "30A-99999",
//     status: "Đang thuê",
//     battery: 72,
//     distance: 15600,
//     customer: "Trần Thị C",
//     time: "2025-01-15 08:00",
//   },
//   {
//     name: "Hyundai Kona",
//     license: "92B-55555",
//     status: "Sẵn sàng",
//     battery: 100,
//     distance: 5400,
//   },
//   {
//     name: "Nissan Leaf",
//     license: "43C-77777",
//     status: "Đã đặt trước",
//     battery: 65,
//     distance: 22100,
//     customer: "Lê Văn D",
//     time: "2025-01-16 14:00",
//   },
//   {
//     name: "BYD Atto 3",
//     license: "79D-88888",
//     status: "Sẵn sàng",
//     battery: 80,
//     distance: 9800,
//   },
// ];

export default function DashboardList() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = React.useState("all");
  const [vehicles, setVehicles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await vehicleService.getAllVehicles();
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setError("Không thể tải danh sách xe");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const handleViewDetail = (vehicle) => {
    navigate(`/dashboard/check-in/${encodeURIComponent(vehicle.license)}`, {
      state: { vehicle },
    });
  };

  const filteredVehicles = React.useMemo(() => {
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

  const stats = React.useMemo(() => {
    const ready = vehicles.filter((v) => v.status === "Sẵn sàng").length;
    const booked = vehicles.filter((v) => v.status === "Đã đặt trước").length;
    const rented = vehicles.filter((v) => v.status === "Đang thuê").length;
    return [
      { title: "Xe sẵn sàng", value: ready },
      { title: "Đã đặt trước", value: booked },
      { title: "Đang cho thuê", value: rented },
      { title: "Tổng số xe", value: vehicles.length },
    ];
  }, [vehicles]);

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

      {/* Bộ lọc */}
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

      {/* Loading / Error / Danh sách xe */}
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