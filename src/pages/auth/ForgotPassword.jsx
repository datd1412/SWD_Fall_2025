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
import EmailIcon from "@mui/icons-material/Email";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import authService from "../../../services/authService";
import { showError, showLoading, showSuccess, dismissToast } from "../../utils/toast";

const forgotSchema = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Email bắt buộc"),
});

export default function ForgotPasswordPage() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const toastId = showLoading("Đang xử lý...");
      const response = await authService.forgotPassword(data.email);
      dismissToast(toastId);

      if (response) {
        showSuccess("Vui lòng kiểm tra email để đặt lại mật khẩu");
      }
    } catch (error) {
      showError(error.errors?.Email || "Yêu cầu thất bại");
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
        sx={{
          width: "100%",
          maxWidth: 1100,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Grid container sx={{ flex: 1 }}>
          {/* Left info panel */}
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
                sx={{
                  bgcolor: "rgba(255,255,255,0.12)",
                  width: 72,
                  height: 72,
                  mb: 3,
                }}
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
          <Grid
            item
            xs={12}
            md={6}
            sx={{ p: { xs: 4, md: 6 }, background: "white", flexGrow: 1 }}
          >
            <Box sx={{ maxWidth: 460, mx: "auto" }}>
              <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                Quên mật khẩu
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Email */}
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      placeholder="staff@example.com"
                      margin="normal"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="action" />
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
                  Gửi yêu cầu
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