import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  FormControl,
  CircularProgress,
  TextField,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

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
    <Box sx={{ maxWidth: 800, mx: "auto", p: { xs: 2, md: 3 } }}>
        {/* Vehicle Information */}
        <Box sx={{ mb: 3, bgcolor: "white", p: 3, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            {vehicle.name}
          </Typography>
          <Box sx={{ display: "grid", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography sx={{ width: 120, color: "text.secondary" }}>
                Biển số:
              </Typography>
              <Typography>{vehicle.licensePlate}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography sx={{ width: 120, color: "text.secondary" }}>
                Số khung:
              </Typography>
              <Typography>{vehicle.vin}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography sx={{ width: 120, color: "text.secondary" }}>
                Khách thuê:
              </Typography>
              <Typography>{vehicle.customer}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography sx={{ width: 120, color: "text.secondary" }}>
                Thời gian bắt đầu:
              </Typography>
              <Typography>{vehicle.startDate}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography sx={{ width: 120, color: "text.secondary" }}>
                Thời gian kết thúc:
              </Typography>
              <Typography>{vehicle.endDate}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Condition Checkboxes */}
        <Box sx={{ mb: 4, bgcolor: "white", p: 3, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Kiểm tra tổng quát
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup>
              <FormControlLabel
                control={
                  <Radio 
                    checked={formValues.generalChecks.noScratches}
                    onChange={handleCheckChange('noScratches')}
                  />
                }
                label="Không xảy trạy xát"
              />
              <FormControlLabel
                control={
                  <Radio 
                    checked={formValues.generalChecks.noDamage}
                    onChange={handleCheckChange('noDamage')}
                  />
                }
                label="Xe không móp và không trầy xước"
              />
              <FormControlLabel
                control={
                  <Radio 
                    checked={formValues.generalChecks.clean}
                    onChange={handleCheckChange('clean')}
                  />
                }
                label="Xe không rính vệ sinh"
              />
              <FormControlLabel
                control={
                  <Radio 
                    checked={formValues.generalChecks.noIndicators}
                    onChange={handleCheckChange('noIndicators')}
                  />
                }
                label="Đèn báo lỗi trên bảng táp lô đều đã tắt/không/ETC"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Vehicle Status */}
        <Box sx={{ mb: 3, bgcolor: "white", p: 3, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Thông tin nhập xe
          </Typography>
          <Box sx={{ display: "grid", gap: 3 }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography sx={{ width: 180, color: "text.secondary" }}>
                ODO sau khi trả (km):
              </Typography>
              <TextField
                size="small"
                sx={{ width: 120 }}
                value={formValues.odo}
                onChange={handleInputChange('odo')}
                InputProps={{
                  sx: { bgcolor: "#f5f5f5" }
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography sx={{ width: 200, color: "text.secondary" }}>
                Mức PIN sau khi trả (%):
              </Typography>
              <TextField
                size="small"
                sx={{ width: 120 }}
                value={formValues.battery}
                onChange={handleInputChange('battery')}
                InputProps={{
                  sx: { bgcolor: "#f5f5f5" }
                }}
              />
            </Box>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Ghi chú tình trạng xe"
            value={formValues.notes}
            onChange={handleInputChange('notes')}
            sx={{ mt: 2 }}
          />
        </Box>

        {/* Photo Upload */}
        <Box sx={{ mb: 4, bgcolor: "white", p: 3, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Chụp hình gửi BonbonCar xác có vấn đề
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2 }}>
            {images.map((image, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  aspectRatio: "1",
                  border: "2px dashed #ccc",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                component="label"
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
                  "+"
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Journal Notes */}
        <Box sx={{ mb: 4, bgcolor: "white", p: 3, borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Phê nhật ký
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Thêm phê bình kiểm"
            value={formValues.journalNotes}
            onChange={handleInputChange('journalNotes')}
          />
        </Box>

        {/* Signatures */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Chữ ký xác nhận
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
            <Box sx={{ bgcolor: "white", p: 3, borderRadius: 1 }}>
              <Typography variant="subtitle1" gutterBottom align="center">
                Chữ ký người thuê
              </Typography>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  p: 2,
                  minHeight: 100,
                }}
              />
            </Box>
            <Box sx={{ bgcolor: "white", p: 3, borderRadius: 1 }}>
              <Typography variant="subtitle1" gutterBottom align="center">
                Chữ ký nhân viên
              </Typography>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  p: 2,
                  minHeight: 100,
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Submit Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            height: 48,
            px: 6,
            bgcolor: "#4caf50",
            "&:hover": {
              bgcolor: "#43a047",
            },
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              Đang xử lý...
            </>
          ) : (
            "Xác nhận xe đủ"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default ReturnInspectionPage;