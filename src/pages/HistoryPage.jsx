import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Pagination,
  InputAdornment,
} from "@mui/material";
import {
  CheckCircleOutlined,
  AssignmentOutlined,
  DirectionsCar,
  SearchOutlined,
} from "@mui/icons-material";

const mockHistoryData = [
  {
    id: 1,
    type: "checkout",
    rental_id: "RT-2024001",
    vehicle_id: 1,
    vehicle_model: "Honda City RS",
    license_plate: "59T2-87343",
    renter_name: "Nguyễn Văn B",
    staff_name: "Nguyễn Văn A",
    timestamp: "2024-01-15T08:00:00",
    odo: 12500,
    battery_level: 95,
    condition: "Xe trong tình trạng tốt, vệ sinh sạch sẽ",
  },
  {
    id: 2,
    type: "checkin",
    rental_id: "RT-2024001",
    vehicle_id: 1,
    vehicle_model: "Honda City RS",
    license_plate: "59T2-87343",
    renter_name: "Nguyễn Văn B",
    staff_name: "Nguyễn Văn A",
    timestamp: "2024-01-17T08:00:00",
    odo: 12850,
    battery_level: 65,
    condition: "Xe trả đúng hẹn, tình trạng tốt",
  },
  {
    id: 3,
    type: "checkout",
    rental_id: "RT-2024002",
    vehicle_id: 2,
    vehicle_model: "VinFast VF e34",
    license_plate: "51F-12345",
    renter_name: "Trần Thị C",
    staff_name: "Nguyễn Văn A",
    timestamp: "2024-01-16T09:00:00",
    odo: 8200,
    battery_level: 88,
    condition: "Xe mới, đầy đủ phụ kiện",
  },
  {
    id: 4,
    type: "checkin",
    rental_id: "RT-2024002",
    vehicle_id: 2,
    vehicle_model: "VinFast VF e34",
    license_plate: "51F-12345",
    renter_name: "Trần Thị C",
    staff_name: "Nguyễn Văn A",
    timestamp: "2024-01-18T10:00:00",
    odo: 8450,
    battery_level: 45,
    condition: "Xe có vết xước nhỏ ở cản trước",
  },
  {
    id: 5,
    type: "checkout",
    rental_id: "RT-2024003",
    vehicle_id: 3,
    vehicle_model: "Tesla Model 3",
    license_plate: "30A-99999",
    renter_name: "Lê Văn D",
    staff_name: "Nguyễn Văn A",
    timestamp: "2024-01-17T14:00:00",
    odo: 15600,
    battery_level: 72,
    condition: "Xe cao cấp, đầy đủ tính năng",
  },
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Filter and paginate data
  const filteredData = useMemo(() => {
    return mockHistoryData.filter((item) => {
      // Search filter
      const matchesSearch =
        !searchTerm ||
        item.license_plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.renter_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rental_id.toLowerCase().includes(searchTerm.toLowerCase());

      // Type filter
      const matchesType = typeFilter === "all" || item.type === typeFilter;

      // Date filter
      const itemDate = new Date(item.timestamp).toISOString().split("T")[0];
      const matchesDateFrom = !dateFrom || itemDate >= dateFrom;
      const matchesDateTo = !dateTo || itemDate <= dateTo;

      return matchesSearch && matchesType && matchesDateFrom && matchesDateTo;
    });
  }, [searchTerm, typeFilter, dateFrom, dateTo]);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page]);

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    const todayData = mockHistoryData.filter(
      (item) => new Date(item.timestamp).toDateString() === today
    );

    return {
      todayCheckouts: todayData.filter((item) => item.type === "checkout")
        .length,
      todayCheckins: todayData.filter((item) => item.type === "checkin").length,
      totalVehicles: new Set(todayData.map((item) => item.vehicle_id)).size,
    };
  }, []);

  const handleViewDetails = (item) => {
    alert(
      `Chi tiết giao dịch:\n\nMã thuê: ${item.rental_id}\nBiển số: ${
        item.license_plate
      }\nKhách hàng: ${item.renter_name}\nLoại: ${
        item.type === "checkout" ? "Giao xe" : "Nhận xe"
      }\nThời gian: ${new Date(item.timestamp).toLocaleString(
        "vi-VN"
      )}\nODO: ${item.odo.toLocaleString()} km\nPin: ${
        item.battery_level
      }%\nTình trạng: ${item.condition}`
    );
  };

  const handleDownloadPDF = (id) => {
    alert(`Đang tải báo cáo PDF cho giao dịch #${id}...`);
  };

  const handleExport = () => {
    alert("Đang xuất dữ liệu ra file Excel...");
  };

  const handleRefresh = () => {
    alert("Đang làm mới dữ liệu...");
  };

  const handlePrint = () => {
    alert("Đang in báo cáo...");
  };

  return (
    <Box sx={{ p: "32px 40px" }}>
      {/* Filters Section */}
      <Paper
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: "16px",
          p: "24px",
          mb: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} md={3}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#1F2937",
                mb: "8px",
              }}
            >
              Tìm kiếm
            </Typography>
            <TextField
              fullWidth
              placeholder="Biển số, khách hàng, mã thuê..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "12px 16px",
                  borderRadius: "12px",
                  fontSize: "15px",
                  bgcolor: "#F9FAFB",
                  "& fieldset": {
                    borderColor: "#E5E7EB",
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#E5E7EB",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#10B981",
                  },
                  "&.Mui-focused": {
                    bgcolor: "#FFFFFF",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: 0,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#1F2937",
                mb: "8px",
              }}
            >
              Loại giao dịch
            </Typography>
            <FormControl fullWidth>
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                sx={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  fontSize: "15px",
                  bgcolor: "#F9FAFB",
                  "& fieldset": {
                    borderColor: "#E5E7EB",
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#E5E7EB",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#10B981",
                  },
                  "&.Mui-focused": {
                    bgcolor: "#FFFFFF",
                  },
                  "& .MuiSelect-select": {
                    padding: 0,
                  },
                }}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="checkout">Giao xe</MenuItem>
                <MenuItem value="checkin">Nhận xe</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#1F2937",
                mb: "8px",
              }}
            >
              Từ ngày
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "12px 16px",
                  borderRadius: "12px",
                  fontSize: "15px",
                  bgcolor: "#F9FAFB",
                  "& fieldset": {
                    borderColor: "#E5E7EB",
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#E5E7EB",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#10B981",
                  },
                  "&.Mui-focused": {
                    bgcolor: "#FFFFFF",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: 0,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#1F2937",
                mb: "8px",
              }}
            >
              Đến ngày
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "12px 16px",
                  borderRadius: "12px",
                  fontSize: "15px",
                  bgcolor: "#F9FAFB",
                  "& fieldset": {
                    borderColor: "#E5E7EB",
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#E5E7EB",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#10B981",
                  },
                  "&.Mui-focused": {
                    bgcolor: "#FFFFFF",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: 0,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleExport}
              sx={{
                padding: "12px 24px",
                bgcolor: "#10B981",
                color: "#FFFFFF",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#059669",
                },
              }}
            >
              Xuất Excel
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3} sx={{ mb: "32px" }}>
        {/* Card 1 */}
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper
            sx={{
              bgcolor: "#FFFFFF",
              p: "28px",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              height: "100%",
              transition: "all 0.25s",
              "&:hover": {
                borderColor: "#10B981",
                boxShadow: "0 6px 18px rgba(16,185,129,0.12)",
                transform: "translateY(-3px)",
              },
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "16px",
                  bgcolor: "#DBEAFE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircleOutlined sx={{ color: "#2563EB", fontSize: 36 }} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "#6B7280",
                    fontWeight: 500,
                    mb: "6px",
                  }}
                >
                  Giao xe hôm nay
                </Typography>
                <Typography
                  sx={{
                    fontSize: "40px",
                    fontWeight: 700,
                    color: "#111827",
                    lineHeight: 1,
                  }}
                >
                  {stats.todayCheckouts}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper
            sx={{
              bgcolor: "#FFFFFF",
              p: "28px",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              height: "100%",
              transition: "all 0.25s",
              "&:hover": {
                borderColor: "#10B981",
                boxShadow: "0 6px 18px rgba(16,185,129,0.12)",
                transform: "translateY(-3px)",
              },
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "16px",
                  bgcolor: "#D1FAE5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AssignmentOutlined sx={{ color: "#059669", fontSize: 36 }} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "#6B7280",
                    fontWeight: 500,
                    mb: "6px",
                  }}
                >
                  Nhận xe hôm nay
                </Typography>
                <Typography
                  sx={{
                    fontSize: "40px",
                    fontWeight: 700,
                    color: "#111827",
                    lineHeight: 1,
                  }}
                >
                  {stats.todayCheckins}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper
            sx={{
              bgcolor: "#FFFFFF",
              p: "28px",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              height: "100%",
              transition: "all 0.25s",
              "&:hover": {
                borderColor: "#10B981",
                boxShadow: "0 6px 18px rgba(16,185,129,0.12)",
                transform: "translateY(-3px)",
              },
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "16px",
                  bgcolor: "#F3E8FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DirectionsCar sx={{ color: "#9333EA", fontSize: 36 }} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "#6B7280",
                    fontWeight: 500,
                    mb: "6px",
                  }}
                >
                  Xe đã xử lý
                </Typography>
                <Typography
                  sx={{
                    fontSize: "40px",
                    fontWeight: 700,
                    color: "#111827",
                    lineHeight: 1,
                  }}
                >
                  {stats.totalVehicles}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* History Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "white",
          border: "1px solid #e0e0e0",
        }}
      >
        <Box
          sx={{
            p: 2.5,
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} color="#1a1a1a">
            Danh sách giao dịch gần đây
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              size="small"
              onClick={handleRefresh}
              sx={{
                textTransform: "none",
                color: "#4caf50",
                fontWeight: 500,
                "&:hover": { bgcolor: "transparent" },
              }}
            >
              Làm mới
            </Button>
            <Button
              size="small"
              onClick={handlePrint}
              sx={{
                textTransform: "none",
                color: "#4caf50",
                fontWeight: 500,
                "&:hover": { bgcolor: "transparent" },
              }}
            >
              In báo cáo
            </Button>
          </Stack>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#757575",
                    bgcolor: "#fafafa",
                    py: 2,
                  }}
                >
                  Thời gian
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#757575",
                    bgcolor: "#fafafa",
                    py: 2,
                  }}
                >
                  Loại
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#757575",
                    bgcolor: "#fafafa",
                    py: 2,
                  }}
                >
                  Mã thuê
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#757575",
                    bgcolor: "#fafafa",
                    py: 2,
                  }}
                >
                  Biển số
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#757575",
                    bgcolor: "#fafafa",
                    py: 2,
                  }}
                >
                  Khách hàng
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#757575",
                    bgcolor: "#fafafa",
                    py: 2,
                  }}
                >
                  Nhân viên
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#757575",
                    bgcolor: "#fafafa",
                    py: 2,
                  }}
                >
                  ODO
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#757575",
                    bgcolor: "#fafafa",
                    py: 2,
                  }}
                >
                  Pin
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#757575",
                    bgcolor: "#fafafa",
                    py: 2,
                  }}
                >
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9}>
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 8,
                        color: "#9e9e9e",
                      }}
                    >
                      <AssignmentOutlined
                        sx={{ fontSize: 64, opacity: 0.3, mb: 2 }}
                      />
                      <Typography variant="h6" mb={1} color="#757575">
                        Không có dữ liệu
                      </Typography>
                      <Typography variant="body2" color="#9e9e9e">
                        Không tìm thấy giao dịch nào phù hợp với bộ lọc
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item) => {
                  const date = new Date(item.timestamp);
                  const dateStr = date.toLocaleDateString("vi-VN");

                  return (
                    <TableRow
                      key={item.id}
                      sx={{
                        "&:hover": { bgcolor: "#fafafa" },
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      <TableCell sx={{ color: "#424242", py: 2 }}>
                        {dateStr}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            item.type === "checkout" ? "Giao xe" : "Nhận xe"
                          }
                          size="small"
                          sx={{
                            bgcolor:
                              item.type === "checkout" ? "#e3f2fd" : "#e8f5e9",
                            color:
                              item.type === "checkout" ? "#1976d2" : "#4caf50",
                            fontWeight: 500,
                            fontSize: 12,
                            height: 24,
                            borderRadius: 1,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: "#424242", py: 2 }}>
                        {item.rental_id}
                      </TableCell>
                      <TableCell
                        sx={{ color: "#1a1a1a", fontWeight: 600, py: 2 }}
                      >
                        {item.license_plate}
                      </TableCell>
                      <TableCell sx={{ color: "#424242", py: 2 }}>
                        {item.renter_name}
                      </TableCell>
                      <TableCell sx={{ color: "#424242", py: 2 }}>
                        {item.staff_name}
                      </TableCell>
                      <TableCell sx={{ color: "#424242", py: 2 }}>
                        {item.odo.toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ color: "#424242", py: 2 }}>
                        {item.battery_level}%
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleViewDetails(item)}
                            sx={{
                              bgcolor: "#4caf50",
                              "&:hover": { bgcolor: "#43a047" },
                              minWidth: 60,
                              px: 2,
                              py: 0.5,
                              fontSize: 13,
                              textTransform: "none",
                              boxShadow: "none",
                              fontWeight: 500,
                            }}
                          >
                            Xem
                          </Button>
                          <Button
                            size="small"
                            onClick={() => handleDownloadPDF(item.id)}
                            sx={{
                              minWidth: 50,
                              px: 1.5,
                              py: 0.5,
                              fontSize: 13,
                              textTransform: "none",
                              color: "#757575",
                              fontWeight: 500,
                            }}
                          >
                            PDF
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box
          sx={{
            p: 2.5,
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="#757575">
            Hiển thị {(page - 1) * rowsPerPage + 1}-
            {Math.min(page * rowsPerPage, filteredData.length)} của{" "}
            {filteredData.length} bản ghi
          </Typography>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            size="small"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#757575",
                "&.Mui-selected": {
                  bgcolor: "#4caf50",
                  color: "white",
                  "&:hover": {
                    bgcolor: "#43a047",
                  },
                },
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
