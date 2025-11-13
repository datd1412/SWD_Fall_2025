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

  // const handleViewDetail = (vehicle) => {
  //   navigate(`/dashboard/check-in/${encodeURIComponent(vehicle.licensePlate)}`, {
  //     state: { vehicle },
  //   });
  // };

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
    const ready = vehicles.filter((v) => v.status === "Available").length;
    const booked = vehicles.filter((v) => v.status === "Booked").length;
    const rented = vehicles.filter((v) => v.status === "InUse").length;
    const maintenance = vehicles.filter((v) => v.status === "Damaged" || v.status === "Maintenance").length;
    return [
      { title: "Xe sẵn sàng", value: ready },
      { title: "Đã đặt trước", value: booked },
      { title: "Đang cho thuê", value: rented },
      { title: "Đang bảo trì", value: maintenance },
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
            <Grid item xs={12} sm={6} md={4} key={v.id}>
              <VehicleCard {...v} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}