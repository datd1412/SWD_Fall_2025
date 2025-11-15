import React from "react";
import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Link,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import authService from "../../../services/authService";
import { showError, showLoading, showSuccess, dismissToast } from "../../utils/toast";

const resetSchema = yup.object({
  password: yup.string().min(6, "Mật khẩu ít nhất 6 ký tự").required("Mật khẩu bắt buộc"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không trùng khớp")
    .required("Xác nhận mật khẩu bắt buộc"),
});

export default function ResetPasswordPage() {
  const [showPw1, setShowPw1] = React.useState(false);
  const [showPw2, setShowPw2] = React.useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const toastId = showLoading("Đang cập nhật mật khẩu...");
      const response = await authService.resetPassword(data.password);
      dismissToast(toastId);

      if (response) {
        showSuccess("Đặt lại mật khẩu thành công!");
      }
    } catch (error) {
      showError(error.errors?.Password || "Đặt lại mật khẩu thất bại");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#4BAE7A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{ width: "100%", maxWidth: 1100, borderRadius: 3, overflow: "hidden" }}
      >
        <Grid container>
          {/* Left panel */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: "linear-gradient(135deg,#2fb56c 0%,#5ecf9a 100%)",
              color: "white",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              p: 6,
            }}
          >
            <Box sx={{ maxWidth: 360 }}>
              <Avatar
                sx={{ bgcolor: "rgba(255,255,255,0.12)", width: 72, height: 72, mb: 3 }}
              >
                <BoltIcon sx={{ color: "white", fontSize: 34 }} />
              </Avatar>

              <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                Xe cho thuê
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.95, mb: 3 }}>
                Hệ thống quản lý xe điện thông minh và hiệu quả
              </Typography>

              <Stack spacing={1.2}>
                <Typography variant="body2">• Quản lý giao nhận xe nhanh chóng</Typography>
                <Typography variant="body2">• Theo dõi tình trạng xe real-time</Typography>
                <Typography variant="body2">• Chữ ký điện tử và lưu trữ ảnh</Typography>
              </Stack>
            </Box>
          </Grid>

          {/* Right form panel */}
          <Grid item xs={12} md={6} sx={{ p: { xs: 4, md: 6 }, background: "white" }}>
            <Box sx={{ maxWidth: 460, mx: "auto" }}>
              <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                Đặt lại mật khẩu
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Nhập mật khẩu mới cho tài khoản của bạn.
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Password */}
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Mật khẩu mới"
                      margin="normal"
                      type={showPw1 ? "text" : "password"}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPw1((s) => !s)}>
                              {showPw1 ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                {/* Confirm Password */}
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Xác nhận mật khẩu"
                      margin="normal"
                      type={showPw2 ? "text" : "password"}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPw2((s) => !s)}>
                              {showPw2 ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    py: 1.6,
                    borderRadius: 3,
                    background: "linear-gradient(90deg,#3fc07a,#2fb56c)",
                    textTransform: "none",
                  }}
                >
                  Xác nhận
                </Button>
              </Box>

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Link href="/login" underline="none" color="success" variant="body2">
                  Quay lại đăng nhập
                </Link>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                align="center"
              >
                © 2025 EV Rental System. All rights reserved.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}