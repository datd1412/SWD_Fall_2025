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
  Checkbox,
  FormControlLabel,
  Link,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import EmailIcon from "@mui/icons-material/Email";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useUserStore } from "../../stores/userStore";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const login = useUserStore((state) => state.login);
  const token = useUserStore((state) => state.token);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with real auth logic
    const userData = { email, password };
    const token = "abc123token"
    login(userData, token);
    localStorage.setItem("token", token);
    console.log("submit", { email, password });
  };

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

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
                <Typography variant="body2">
                  • Quản lý giao nhận xe nhanh chóng
                </Typography>
                <Typography variant="body2">
                  • Theo dõi tình trạng xe real-time
                </Typography>
                <Typography variant="body2">
                  • Chữ ký điện tử và lưu trữ ảnh
                </Typography>
              </Stack>
            </Box>
          </Grid>

          {/* Right form panel */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: { xs: 4, md: 6 },
              background: "white",
              flexGrow: 1,
            }}
          >
            <Box sx={{ maxWidth: 460, mx: "auto" }}>
              <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                Đăng nhập
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Chào mừng trở lại! Vui lòng đăng nhập vào tài khoản của bạn.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  fullWidth
                  label="Email"
                  placeholder="staff@example.com"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#2fb56c",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#2fb56c",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu của bạn"
                  margin="normal"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#2fb56c",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#2fb56c",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          onClick={() => setShowPassword((s) => !s)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Ghi nhớ đăng nhập"
                  />
                  <Link href="#" underline="none" variant="body2" color="success">
                    Quên mật khẩu?
                  </Link>
                </Box>

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
                  Đăng nhập
                </Button>
              </Box>

              {/* <Box sx={{ mt: 3 }}>
								<Paper variant="outlined" sx={{ bgcolor: '#e9fbef', p: 2, borderRadius: 2 }}>
									<Stack direction="row" spacing={2} alignItems="center">
										<InfoOutlined color="action" />
										<Box>
											<Typography variant="subtitle2" fontWeight={600}>Tài khoản demo</Typography>
											<Typography variant="body2">Email: staff@station1.com</Typography>
											<Typography variant="body2">Mật khẩu: 123456</Typography>
										</Box>
									</Stack>
								</Paper>
							</Box> */}

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
