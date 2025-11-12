import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Checkbox,
  Typography,
  FormControl,
  CircularProgress,
  TextField,
  Alert,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ReturnInspectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([null, null, null, null, null]);
  const [formValues, setFormValues] = useState({
    odo: "12,500",
    battery: "85",
    notes: "",
    journalNotes: "",
    generalChecks: {
      noScratches: false,
      noDamage: false,
      clean: false,
      noIndicators: false
    }
  });
  
  const vehicle = location.state?.vehicle || {
    name: "Honda City RS",
    licensePlate: "51F2-87743",
    vin: "KY-Car - 8126",
    customer: "Nguyễn Văn B",
    startDate: "25/10/2025 10:35",
    endDate: "26/10/2025 10:35",
  };

  const handleImageChange = (index) => (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };

  const handleInputChange = (field) => (event) => {
    setFormValues(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCheckChange = (field) => (event) => {
    setFormValues(prev => ({
      ...prev,
      generalChecks: {
        ...prev.generalChecks,
        [field]: event.target.checked
      }
    }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Validate form
      const allChecksCompleted = Object.values(formValues.generalChecks).every(value => value);
      if (!allChecksCompleted) {
        throw new Error("Vui lòng hoàn thành kiểm tra tổng quát");
      }
      
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Navigate back after success
      navigate(-1);
    } catch (error) {
      // Handle error
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#f5f7f6", minHeight: "100vh", pb: 4 }}>
      {/* Header */}
      <Box sx={{ bgcolor: "#fff", borderBottom: "1px solid #eef2f1" }}>
        <Alert
              severity="info"
              sx={{
                bgcolor: "#e3f2fd",
                border: "1px solid #90caf9",
                "& .MuiAlert-message": {
                  width: "100%",
                },
              }}
              icon={<CheckCircleIcon sx={{ color: "#1976d2" }} />}
            >
              <Typography variant="caption" fontWeight={700} display="block">
                ID: KH2025060180153
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Thái Lan xuất hiện trong hóa đơn kỳ vọng từ 12/12/2025 đến 08/1/2025
              </Typography>
            </Alert>
      </Box>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, mx: "auto", py: { xs: 2, md: 3 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "320px 1fr" }, gap: 3 }}>
          {/* LEFT SIDEBAR */}
          <Box>
            {/* Vehicle Card */}
            <Box sx={{ bgcolor: "white", p: 2.5, borderRadius: 1, mb: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 1,
                  bgcolor: "#e8f5e9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1.5,
                  fontSize: 24,
                }}
              >
                🚗
              </Box>

              <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                {vehicle.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" mb={1.5}>
                Biển số. {vehicle.licensePlate}
              </Typography>

              <Divider sx={{ my: 1.5 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Số khung
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {vehicle.vin}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Khách thuê
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {vehicle.customer}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Thời gian trả
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {vehicle.endDate}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Pricing Summary */}
            <Box sx={{ bgcolor: "#e8f5e9", p: 2, borderRadius: 1, border: "1px solid #c8e6c9" }}>
              <Typography variant="caption" fontWeight={700} color="#2e7d32" display="block" mb={1}>
                Thông tin cước phí
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="caption">Chi phí dự kiến:</Typography>
                <Typography variant="caption" fontWeight={700}>
                  14,000₫
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="caption">Chiết khấu:</Typography>
                <Typography variant="caption" fontWeight={700}>
                  10%
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* RIGHT CONTENT */}
          <Box>
            {/* General Check Section */}
            <Box sx={{ bgcolor: "white", p: 2.5, borderRadius: 1, mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                Kiểm tra tổng quát
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formValues.generalChecks.noScratches}
                      onChange={handleCheckChange("noScratches")}
                      size="small"
                    />
                  }
                  label={<Typography variant="caption">Không xảy trầy xát</Typography>}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formValues.generalChecks.noDamage}
                      onChange={handleCheckChange("noDamage")}
                      size="small"
                    />
                  }
                  label={<Typography variant="caption">Ngoài thất re không cụp xuối</Typography>}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formValues.generalChecks.clean}
                      onChange={handleCheckChange("clean")}
                      size="small"
                    />
                  }
                  label={<Typography variant="caption">Xa không rải vệ sinh</Typography>}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formValues.generalChecks.noIndicators}
                      onChange={handleCheckChange("noIndicators")}
                      size="small"
                    />
                  }
                  label={<Typography variant="caption">Cộp và làm thoộng</Typography>}
                />
              </Box>
            </Box>

            {/* Vehicle Status Section */}
            <Box sx={{ bgcolor: "white", p: 2.5, borderRadius: 1, mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box sx={{ color: "#4caf50" }}>⚙️</Box>
                Thông tin nhập xe
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    ODO sau khi trả (km):
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={formValues.odo}
                    onChange={handleInputChange("odo")}
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    Mức pin sau khi trả (%):
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={formValues.battery}
                    onChange={handleInputChange("battery")}
                    variant="outlined"
                  />
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                Ghi chú tình trạng xe
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={formValues.notes}
                onChange={handleInputChange("notes")}
                placeholder="Số xa với cách thể đi đạo với cách"
                variant="outlined"
                size="small"
              />
            </Box>

            {/* Photo Upload Section */}
            <Box sx={{ bgcolor: "white", p: 2.5, borderRadius: 1, mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box sx={{ color: "#4caf50" }}>📷</Box>
                Chụp hình gửi BonbonCar xác có vấn đề
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1.5 }}>
                {images.map((image, index) => (
                  <Box
                    component="label"
                    key={index}
                    sx={{
                      width: "100%",
                      aspectRatio: "1",
                      border: "2px dashed #ddd",
                      borderRadius: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      bgcolor: image ? "transparent" : "#f9f9f9",
                      overflow: "hidden",
                      transition: "all 0.2s",
                      "&:hover": {
                        borderColor: "#4caf50",
                        bgcolor: "#f0f7f0",
                      },
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange(index)}
                    />
                    {image ? (
                      <Box
                        component="img"
                        src={image}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
                        <ImageIcon sx={{ color: "#bbb", fontSize: 20 }} />
                        <Typography variant="caption" color="text.secondary" align="center" sx={{ fontSize: "10px" }}>
                          Ảnh {index + 1}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Additional Notes Section */}
            <Box sx={{ bgcolor: "white", p: 2.5, borderRadius: 1, mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box sx={{ color: "#4caf50" }}>📝</Box>
                Phê nhật ký
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    Chủ lý nguyên thứa
                  </Typography>
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 1,
                      minHeight: 80,
                      bgcolor: "#fafafa",
                      p: 1,
                    }}
                  >
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="Ghi chú"
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      size="small"
                    />
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    Chủ lý nhân viên
                  </Typography>
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 1,
                      minHeight: 80,
                      bgcolor: "#fafafa",
                      p: 1,
                    }}
                  >
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="Ghi chú"
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Signatures Section */}
            <Box sx={{ bgcolor: "white", p: 2.5, borderRadius: 1, mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box sx={{ color: "#4caf50" }}>✏️</Box>
                Chữ ký xác nhận
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" align="center" display="block" mb={1}>
                    Chữ ký người thuê
                  </Typography>
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 1,
                      minHeight: 100,
                      bgcolor: "#fafafa",
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" align="center" display="block" mb={1}>
                    Chữ ký nhân viên
                  </Typography>
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 1,
                      minHeight: 100,
                      bgcolor: "#fafafa",
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Submit Button */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
              <Button
                variant="text"
                onClick={handleBack}
              >
                Hủy bỏ
              </Button>
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  flex: 1,
                  height: 48,
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                    Đang xử lý...
                  </>
                ) : (
                  "Xác nhận xe đủ"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReturnInspectionPage;