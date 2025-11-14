import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import vehicleService from "../../services/vehicleService";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const vehicle = location.state?.vehicle || {
    name: "Honda City RS",
    license: params.vehicleId || "59T2-87343",
    type: "EV_Car",
    battery: 95,
    odo: 12500,
    branch: "Chi nhánh Quận 1",
    imageUrl: "",
    customer: "Nguyễn Văn A",
    start: "10/01/2025 09:00",
    end: "12/01/2025 09:00",
    reservationId: "#RT-002401",
  };

  const [images, setImages] = useState(Array(2).fill(null));
  const [previews, setPreviews] = useState(Array(2).fill(""));
  const [submitting, setSubmitting] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    severity: "success",
  });
  const [odoValue, setOdoValue] = useState(vehicle.odo || 0);
  const [batteryValue, setBatteryValue] = useState(vehicle.battery || 0);
  const [notesValue, setNotesValue] = useState("");
  const [renterSignature, setRenterSignature] = useState("");
  const [staffSignature, setStaffSignature] = useState("");
  const renterPad = useRef(null);
  const staffPad = useRef(null);

  const handleFileChange = (index, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setSnack({
        open: true,
        msg: "Kích thước ảnh tối đa 5MB",
        severity: "error",
      });
      return;
    }
    const url = URL.createObjectURL(file);
    setImages((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
    setPreviews((prev) => {
      const next = [...prev];
      if (next[index]) URL.revokeObjectURL(next[index]);
      next[index] = url;
      return next;
    });
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setPreviews((prev) => {
      const next = [...prev];
      if (next[index]) URL.revokeObjectURL(next[index]);
      next[index] = "";
      return next;
    });
  };

  useEffect(() => {
    return () => {
      previews.forEach((p) => p && URL.revokeObjectURL(p));
    };
  }, [previews]);

  const handleSubmit = async () => {
    const missing = images.some((i) => !i);
    if (missing) {
      setSnack({
        open: true,
        msg: "Vui lòng chụp đủ 2 ảnh trước khi xác nhận",
        severity: "error",
      });
      return;
    }

    const state = location.state || {};
    const bookingId = state.booking?.id || 0;
    const userId = state.booking?.customerId || state.rental?.customerId || 0;
    const vehicleId = state.id || state.raw?.id || 0;

    const pickupImageUrls = previews.map((p, i) => `image_slot_${i + 1}.jpg`);

    const payload = {
      bookingId: bookingId,
      userId: userId,
      vehicleId: vehicleId,
      pickupBatteryLevel: Number(batteryValue) || 0,
      odometerBeforePickup: Number(odoValue) || 0,
      pickupNotes: notesValue || "",
      pickupImageUrls: pickupImageUrls,
      renterSignature: renterSignature || "",
      staffSignature: staffSignature || "",
    };

    try {
      setSubmitting(true);
      const res = await vehicleService.checkoutRental(payload);
      console.log("checkout response:", res);
      console.log(
        "checkout typeof:",
        typeof res,
        "keys:",
        res ? Object.keys(res) : null
      );

      let success = false;
      if (res === true) success = true;
      else if (res === false) success = false;
      else if (res && typeof res === "object") {
        if ("success" in res) success = Boolean(res.success);
        else if (
          res.data &&
          typeof res.data === "object" &&
          "success" in res.data
        )
          success = Boolean(res.data.success);
      }

      let message = "";
      if (res && typeof res === "object") {
        if (typeof res.message === "string") message = res.message;
        else if (res.data && typeof res.data.message === "string")
          message = res.data.message;
        else if (res.data && typeof res.data === "string") message = res.data;
      } else if (typeof res === "string") {
        message = res;
      }
      if (!message) {
        try {
          message = JSON.stringify(res || {}).slice(0, 300);
        } catch {
          message = String(res || "");
        }
      }

      if (success) {
        setSnack({
          open: true,
          msg: message || "Giao xe thành công",
          severity: "success",
        });
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        console.warn(
          "Checkout treated as failure despite network response; full:",
          res
        );
        setSnack({
          open: true,
          msg: message || "Lỗi khi giao xe",
          severity: "error",
        });
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      setSnack({
        open: true,
        msg: "Lỗi kết nối - không thể giao xe",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card
          sx={{ borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="div"
              sx={{
                height: 180,
                bgcolor: "linear-gradient(135deg,#A7F3D0,#6EE7B7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  bgcolor: "#eaf9ef",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PhotoCameraIcon sx={{ color: "#2fb56c", fontSize: 34 }} />
              </Box>
            </CardMedia>
            <Chip
              label="Chuẩn bị"
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                bgcolor: "#fff3",
              }}
            />
          </Box>
          <CardContent>
            <Typography variant="h6" fontWeight={700}>
              {vehicle.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Biển số: {vehicle.license}
            </Typography>

            <Stack spacing={1} mt={2}>
              <Typography variant="body2" color="text.secondary">
                Loại xe
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {vehicle.type}
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={1}>
                Nhân viên giao xe
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                Nguyễn Văn A
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={1}>
                Khách thuê
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {vehicle.customer}
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={1}>
                Thời gian
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {vehicle.start} - {vehicle.end}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={3}>
            <Box>
              <Paper sx={{ p: 2, bgcolor: "#fff6", borderRadius: 2, mb: 2 }}>
                <Typography variant="body2" color="error">
                  Bạn có đơn thuê sắp theo vào {vehicle.start} - Vui lòng hoàn
                  thành giao xe trước thời gian này
                </Typography>
              </Paper>

              <Typography variant="h6" fontWeight={700} mb={2}>
                Thông tin giao xe
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="ODO trước giao (km)"
                    value={odoValue}
                    onChange={(e) => setOdoValue(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Mức pin hiện tại (%)"
                    value={batteryValue}
                    onChange={(e) => setBatteryValue(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Ghi chú tình trạng xe"
                    placeholder="Ví dụ: xe sạch, xăng đầy..."
                    value={notesValue}
                    onChange={(e) => setNotesValue(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Chụp ảnh xe (2 vị trí bắt buộc)
              </Typography>
              <Grid container spacing={2}>
                {Array.from({ length: 2 }).map((_, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Paper
                      sx={{
                        height: 130,
                        borderRadius: 2,
                        border: images[i]
                          ? "1px solid rgba(47,181,108,0.18)"
                          : "1px dashed #e6eee8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                        bgcolor: images[i] ? "#f7fff8" : "transparent",
                      }}
                    >
                      {images[i] ? (
                        <>
                          <Box
                            component="img"
                            src={previews[i]}
                            alt={`slot-${i}`}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => removeImage(i)}
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              bgcolor: "rgba(0,0,0,0.4)",
                              color: "#fff",
                            }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                          <CheckCircleIcon
                            sx={{
                              position: "absolute",
                              bottom: 8,
                              left: 8,
                              color: "#2fb56c",
                            }}
                          />
                        </>
                      ) : (
                        <label
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileChange(i, e)}
                          />
                          <Stack alignItems="center" spacing={1}>
                            <PhotoCameraIcon color="action" />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Thêm ảnh
                            </Typography>
                          </Stack>
                        </label>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              <Typography
                variant="caption"
                color="text.secondary"
                mt={1}
                display="block"
              >
                Yêu cầu: 2 ảnh, kích thước tối đa mỗi ảnh 5MB.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Chờ ký xác nhận
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ minHeight: 160, borderRadius: 2, p: 2 }}>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Chữ ký người thuê
                    </Typography>
                    <Box
                      sx={{
                        border: "1px solid #e6e6e6",
                        borderRadius: 1,
                        p: 0.5,
                      }}
                    >
                      <SignaturePad
                        ref={renterPad}
                        penColor="black"
                        canvasProps={{
                          style: {
                            width: "100%",
                            height: 120,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        mt: 1,
                        alignItems: "center",
                      }}
                    >
                      <Button
                        size="small"
                        onClick={() => {
                          if (!renterPad.current) return;
                          renterPad.current.clear();
                          setRenterSignature("");
                        }}
                      >
                        Xóa
                      </Button>
                      <Button
                        size="small"
                        onClick={() => {
                          if (!renterPad.current) return;
                          const dataUrl = renterPad.current
                            .getTrimmedCanvas()
                            .toDataURL("image/png");
                          setRenterSignature(dataUrl);
                        }}
                      >
                        Lưu chữ ký
                      </Button>
                      {renterSignature && (
                        <Box
                          component="img"
                          src={renterSignature}
                          sx={{ height: 40, ml: 1, borderRadius: 1 }}
                        />
                      )}
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ minHeight: 160, borderRadius: 2, p: 2 }}>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Chữ ký nhân viên
                    </Typography>
                    <Box
                      sx={{
                        border: "1px solid #e6e6e6",
                        borderRadius: 1,
                        p: 0.5,
                      }}
                    >
                      <SignaturePad
                        ref={staffPad}
                        penColor="black"
                        canvasProps={{
                          style: {
                            width: "100%",
                            height: 120,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        mt: 1,
                        alignItems: "center",
                      }}
                    >
                      <Button
                        size="small"
                        onClick={() => {
                          if (!staffPad.current) return;
                          staffPad.current.clear();
                          setStaffSignature("");
                        }}
                      >
                        Xóa
                      </Button>
                      <Button
                        size="small"
                        onClick={() => {
                          if (!staffPad.current) return;
                          const dataUrl = staffPad.current
                            .getTrimmedCanvas()
                            .toDataURL("image/png");
                          setStaffSignature(dataUrl);
                        }}
                      >
                        Lưu chữ ký
                      </Button>
                      {staffSignature && (
                        <Box
                          component="img"
                          src={staffSignature}
                          sx={{ height: 40, ml: 1, borderRadius: 1 }}
                        />
                      )}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => navigate(-1)}
                disabled={submitting}
              >
                Hủy bỏ
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "#2fb56c" }}
                onClick={handleSubmit}
                disabled={submitting}
                startIcon={
                  submitting ? (
                    <CircularProgress color="inherit" size={16} />
                  ) : null
                }
              >
                {submitting ? "Đang xử lý..." : "Xác nhận xe sẵn sàng cho thuê"}
              </Button>
            </Stack>
            <Snackbar
              open={snack.open}
              autoHideDuration={4000}
              onClose={() => setSnack((s) => ({ ...s, open: false }))}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={() => setSnack((s) => ({ ...s, open: false }))}
                severity={snack.severity}
              >
                {snack.msg}
              </MuiAlert>
            </Snackbar>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
