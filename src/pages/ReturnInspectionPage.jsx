import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  CircularProgress,
  TextField,
  Alert,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";
import dayjs from "dayjs";
import rentalService from "../../services/rentalService";
import { dismissToast, showLoading, showSuccess } from "../utils/toast";
import { useForm, Controller, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const returnInspectionSchema = yup.object({
  odometerAfterReturn: yup
    .number()
    .positive("ODO phải lớn hơn 0")
    .required("ODO sau khi trả bắt buộc"),
  returnBatteryLevel: yup
    .number()
    .min(0, "Mức pin từ 0 đến 100")
    .max(100, "Mức pin từ 0 đến 100")
    .required("Mức pin sau khi trả bắt buộc"),
  totalDistance: yup
    .number()
    .positive("Tổng quãng đường phải lớn hơn 0")
    .required("Tổng quãng đường bắt buộc"),
  returnNotes: yup.string().optional(),
  renterSignature: yup.string().required("Chữ ký người thuê bắt buộc"),
  staffSignature: yup.string().required("Chữ ký nhân viên bắt buộc"),
  damageReport: yup.object().shape({
    batteryOk: yup.boolean(),
    interiorOk: yup.boolean(),
    cleanOk: yup.boolean(),
    noTollFees: yup.boolean(),
    trunkOk: yup.boolean(),
  }),
  additionalFees: yup.number().optional(),
  additionalFeesReason: yup.string().optional(),
});

const ReturnInspectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pageLoading, setPageLoading] = useState(false);
  const [rental] = useState(location.state?.rentalInfo || null);
  const [rentalFee] = useState(location.state?.vehicleProps || null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([null, null, null, null, null]);
  const [damageReport, setDamageReport] = useState({
    batteryOk: false,
    interiorOk: false,
    cleanOk: false,
    noTollFees: false,
    trunkOk: false,
  });
  const renterSigRef = useRef(null);
  const staffSigRef = useRef(null);

  const {
    handleSubmit,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(returnInspectionSchema),
    defaultValues: {
      odometerAfterReturn: rental ? rental.odometerAfterReturn || 0 : 0,
      returnBatteryLevel: rental ? rental.returnBatteryLevel || 0 : 0,
      totalDistance: rental ? rental.totalDistance || 0 : 0,
      returnNotes: rental ? rental.returnNotes || "" : "",
      renterSignature: "",
      staffSignature: "",
      damageReport: {
        batteryOk: false,
        interiorOk: false,
        cleanOk: false,
        noTollFees: false,
        trunkOk: false,
      },
      additionalFees: rentalFee ? rentalFee.additionalFees || 0 : 0,
      additionalFeesReason: rentalFee ? rentalFee.additionalFeesReason || "" : "",
    },
  });

  const formValues = useWatch({ control });

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
    if (!file) return;

    const previewUrl = URL.createObjectURL(file); // string URL
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = previewUrl;
      return updated;
    });
  };

  const handleInputChange = (field) => (e) => {
    setValue(field, e.target.value);
  };

  const handleDamageCheckChange = (key) => (e) => {
    setDamageReport((prev) => ({
      ...prev,
      [key]: e.target.checked,
    }));
    setValue(`damageReport.${key}`, e.target.checked);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setPageLoading(true);
    try {
      const payload = {
        ...data,
        rentalId: rental.id,
        additionalFees: rentalFee.additionalFees || 0,
        additionalFeesReason: rentalFee.additionalFeesReason || "",
        damageReport: JSON.stringify(
          Object.fromEntries(
            Object.entries(damageReport).map(([k, v]) => [
              k,
              v ? "1" : "0",
            ])
          )
        ),
        returnImageUrls: images.filter(img => img !== null),
      };
      const toastId = showLoading("Đang xử lý...");
      const response = await rentalService.checkinRental(rental.id, payload);
      dismissToast(toastId);
      if (response.success) {
        showSuccess("Xác nhận trả xe thành công");
      }
      console.log("Submit data: ", payload);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setPageLoading(false);
      handleBack();
    }
  };

  return (
    <>
      {pageLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(255, 255, 255, 0.7)",
            zIndex: 2000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="success" size={60} />
        </Box>
      )}
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
              Đơn: {rental.rentalCode ? rental.rentalCode : "RB-20251025-00123"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Thời gian thuê: Từ{" "}
              {dayjs(rental.pickupTime).format("HH:mm DD/MM/YYYY")} đến{" "}
              {dayjs(rental.returnTime).format("HH:mm DD/MM/YYYY")}
            </Typography>
          </Alert>
        </Box>

        {/* Main Content */}
        <Box sx={{ maxWidth: 1200, mx: "auto", py: { xs: 2, md: 3 } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
              gap: 3,
            }}
          >
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
                  {rental ? rental.vehicle.vehicleName : vehicle.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mb={1.5}
                >
                  Biển số:{" "}
                  {rental.vehicle
                    ? rental.vehicle.licensePlate
                    : vehicle.licensePlate}
                </Typography>

                <Divider sx={{ my: 1.5 }} />

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Loại xe:
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color="text.primary"
                    >
                      {rental.vehicle ? rental.vehicle.model : "Sedan"} -{" "}
                      {rental ? rental.vehicle.year : vehicle.vin}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Nhân viên nhận xe:
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color="text.primary"
                    >
                      Nguyễn Văn A
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Khách thuê:
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color="text.primary"
                    >
                      {rental.customer
                        ? rental.customer.fullName
                        : vehicle.customer}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Thời gian bắt đầu:
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color="text.primary"
                    >
                      {rental.pickupTime
                        ? dayjs(rental.pickupTime).format("HH:mm DD/MM/YYYY")
                        : vehicle.startDate}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Thời gian kết thúc:
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color="text.primary"
                    >
                      {rental.returnTime
                        ? dayjs(rental.returnTime).format("HH:mm DD/MM/YYYY")
                        : vehicle.endDate}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Pricing Summary */}
              <Box
                sx={{
                  bgcolor: "#e8f5e9",
                  p: 2,
                  borderRadius: 1,
                  border: "1px solid #c8e6c9",
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="#2e7d32"
                  display="block"
                  mb={1}
                >
                  Thông tin lúc giao xe
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="caption">ODO lúc giao:</Typography>
                  <Typography variant="caption" fontWeight={700}>
                    {rental.totalDistance ? rental.totalDistance : "12,000"} km
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="caption">Pin lúc giao:</Typography>
                  <Typography variant="caption" fontWeight={700}>
                    {rental ? rental.pickupBatteryLevel : "100"}%
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* RIGHT CONTENT */}
            <Box>
              {/* General Check Section */}
              <Box sx={{ bgcolor: "white", p: 2.5, borderRadius: 1, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  Kiểm tra tổng quát
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 1.5,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.damageReport.batteryOk}
                        onChange={handleDamageCheckChange("batteryOk")}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="caption">
                        Không hao hụt pin
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.damageReport.interiorOk}
                        onChange={handleDamageCheckChange("interiorOk")}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="caption">
                        Nội thất xe không trầy xước
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.damageReport.cleanOk}
                        onChange={handleDamageCheckChange("cleanOk")}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="caption">
                        Xe không mất vệ sinh
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.damageReport.noTollFees}
                        onChange={handleDamageCheckChange("noTollFees")}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="caption">
                        Đã kiểm tra: không có phí cầu đường/VETC
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.damageReport.trunkOk}
                        onChange={handleDamageCheckChange("trunkOk")}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="caption">
                        Cốp xe bình thường
                      </Typography>
                    }
                  />
                </Box>
              </Box>

              {/* Vehicle Status Section */}
              <Box sx={{ bgcolor: "white", p: 2.5, borderRadius: 1, mb: 2 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <Box sx={{ color: "#4caf50" }}>⚙️</Box>
                  Thông tin nhập xe
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={0.5}
                    >
                      ODO sau khi trả (km):
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={formValues.odometerAfterReturn}
                      onChange={handleInputChange("odometerAfterReturn")}
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={0.5}
                    >
                      Mức pin sau khi trả (%):
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={formValues.returnBatteryLevel}
                      onChange={(e) => {
                        const val = Math.max(
                          0,
                          Math.min(100, Number(e.target.value))
                        );
                        handleInputChange("returnBatteryLevel")({
                          target: { value: val },
                        });
                      }}
                      variant="outlined"
                    />
                  </Box>
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mb={0.5}
                >
                  Ghi chú tình trạng xe
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={formValues.returnNotes}
                  onChange={handleInputChange("returnNotes")}
                  placeholder="Ghi chú tình trạng xe"
                  variant="outlined"
                  size="small"
                />
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 2,
                    my: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={0.5}
                    >
                      Tổng quãng đường (km)
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      value={formValues.totalDistance}
                      onChange={handleInputChange("totalDistance")}
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={0.5}
                    >
                      Phí phát sinh (VNĐ)
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      value={formValues.additionalFees}
                      disabled
                      variant="outlined"
                    />
                  </Box>
                </Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mb={0.5}
                >
                  Lý do phí phát sinh
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  value={formValues.additionalFeesReason}
                  disabled
                  placeholder="Nhập lý do nếu có phí phát sinh"
                  variant="outlined"
                  size="small"
                />
              </Box>

              {/* Photo Upload Section */}
              <Box sx={{ bgcolor: "white", p: 2.5, borderRadius: 1, mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <Box sx={{ color: "#4caf50" }}>📷</Box>
                  Chụp hình gửi BonbonCar nếu có vấn đề
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: 1.5,
                  }}
                >
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
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <ImageIcon sx={{ color: "#bbb", fontSize: 20 }} />
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            align="center"
                            sx={{ fontSize: "10px" }}
                          >
                            Ảnh {index + 1}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Signatures Section */}
              <Box sx={{ bgcolor: "white", p: 2.5, borderRadius: 1, mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <Box sx={{ color: "#4caf50" }}>✏️</Box>
                  Chữ ký xác nhận
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 3,
                  }}
                >
                  {/* Chữ ký người thuê */}
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      align="center"
                      display="block"
                      mb={1}
                    >
                      Chữ ký người thuê
                    </Typography>

                    <SignatureCanvas
                      ref={renterSigRef}
                      penColor="black"
                      backgroundColor="#fafafa"
                      canvasProps={{
                        width: 300,
                        height: 150,
                        style: {
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                        },
                      }}
                      onEnd={() => {
                        setValue("renterSignature", renterSigRef.current.toDataURL());
                      }}
                    />

                    <Button
                      size="small"
                      onClick={() => {
                        renterSigRef.current.clear();
                        setValue("renterSignature", "");
                      }}
                      sx={{ mt: 1 }}
                    >
                      Xóa chữ ký
                    </Button>
                  </Box>

                  {/* Chữ ký nhân viên */}
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      align="center"
                      display="block"
                      mb={1}
                    >
                      Chữ ký nhân viên
                    </Typography>

                    <SignatureCanvas
                      ref={staffSigRef}
                      penColor="black"
                      backgroundColor="#fafafa"
                      canvasProps={{
                        width: 300,
                        height: 150,
                        style: {
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                        },
                      }}
                      onEnd={() => {
                        setValue("staffSignature", staffSigRef.current.toDataURL());
                      }}
                    />

                    <Button
                      size="small"
                      onClick={() => {
                        staffSigRef.current.clear();
                        setValue("staffSignature", "");
                      }}
                      sx={{ mt: 1 }}
                    >
                      Xóa chữ ký
                    </Button>
                  </Box>
                </Box>
              </Box>

              {/* Submit Button */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "space-between",
                }}
              >
                <Button variant="text" onClick={handleBack}>
                  Hủy bỏ
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading}
                  sx={{
                    flex: 1,
                    height: 48,
                  }}
                >
                  {loading ? (
                    <>
                      <CircularProgress
                        size={20}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />
                      Đang xử lý...
                    </>
                  ) : (
                    "Xác nhận xe ổn"
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ReturnInspectionPage;
