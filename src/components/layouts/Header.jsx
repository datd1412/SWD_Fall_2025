import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  Avatar,
  Stack,
  alpha,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import Link from "@mui/material/Link";
import React from "react";

const today = new Date();
const dayOfWeek = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
][today.getDay()];
const dateString = `${dayOfWeek}, ${today.toLocaleDateString("vi-VN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
})}`;

export default function Header({ drawerWidth = 260 }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();

  const getHeaderTitle = () => {
    const path = location.pathname;
    if (path.includes("/dashboard")) {
      return {
        title: "Dashboard",
      };
    }
    if (path.includes("/profile")) {
      return {
        title: "My Profile",
      };
    }
    return {
      title: "Home",
    };
  };

  // Breadcrumb generation from pathname
  const pathParts = location.pathname.split("/").filter(Boolean);
  const routeLabelMap = {
    dashboard: "Dashboard",
    checkout: "Chi tiết xe",
    profile: "Hồ sơ",
  };

  const crumbs = [];
  let acc = "";
  pathParts.forEach((part, idx) => {
    acc += `/${part}`;
    let label = routeLabelMap[part] || decodeURIComponent(part);
    // if last segment is likely an id and we have vehicle in state, use its name
    if (idx === pathParts.length - 1 && location.state?.vehicle?.name) {
      label = location.state.vehicle.name;
    }
    crumbs.push({ label, to: acc });
  });

  // Removed unused variables as we now check pathParts directly

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        borderBottom: "1px solid #f0f0f0",
        bgcolor: "#fff",
        zIndex: 1201,
      }}
    >
      <Toolbar
        sx={{
          minHeight: 80,
          px: 4,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {/* Show Dashboard title and date ONLY on the dashboard page */}
          {pathParts[0] === "dashboard" && !pathParts[1] && (
            <>
              <Typography variant="h5" fontWeight={700} color="#222">
                {getHeaderTitle().title}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
                <CalendarTodayIcon sx={{ fontSize: 18, color: "#bdbdbd" }} />
                <Typography variant="body2" color="text.secondary">
                  {dateString}
                </Typography>
              </Stack>
            </>
          )}

          {/* Show breadcrumbs on nested routes (not on dashboard) */}
          {pathParts[0] === "dashboard" && pathParts[1] && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {crumbs.map((c, i) => (
                <React.Fragment key={c.to}>
                  {i < crumbs.length - 1 ? (
                    // clickable ancestors
                    <Link
                      component="button"
                      underline="hover"
                      onClick={() => navigate(c.to)}
                      sx={{
                        mr: 0.5,
                        color: i === 0 ? "#2fb56c" : "text.secondary",
                        fontWeight: i === 0 ? 700 : 500,
                      }}
                    >
                      {c.label}
                    </Link>
                  ) : (
                    // current page (last crumb) - plain text with aria-current
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", fontWeight: 600 }}
                      aria-current="page"
                    >
                      {c.label}
                    </Typography>
                  )}
                  {i < crumbs.length - 1 && (
                    <Box
                      component="span"
                      sx={{ color: "text.secondary", mx: 0.5 }}
                    >
                      ›
                    </Box>
                  )}
                </React.Fragment>
              ))}
            </Box>
          )}
        </Box>
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Search bar */}
          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              background: alpha("#f6faf7", 1),
              border: "1px solid #e0e0e0",
              minWidth: 220,
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 0.5,
            }}
          >
            <SearchIcon sx={{ color: "#bdbdbd", mr: 1 }} />
            <InputBase
              placeholder="Tìm kiếm..."
              sx={{
                flex: 1,
                fontSize: 15,
                color: "#222",
                background: "transparent",
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </Box>
          {/* Notification icon */}
          <IconButton
            sx={{ bgcolor: "#f6faf7", border: "1px solid #e0e0e0", mr: 1 }}
          >
            <NotificationsNoneIcon sx={{ color: "#2fb56c" }} />
          </IconButton>
          {/* User avatar with dropdown */}
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                bgcolor: "#b2e5c2",
                color: "#222",
                fontWeight: 700,
                width: 40,
                height: 40,
              }}
            >
              NA
            </Avatar>
          </IconButton>
        </Stack>

        {/* User menu dropdown */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            sx: {
              mt: 1.5,
              borderRadius: 2,
              minWidth: 180,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              "& .MuiMenuItem-root": {
                py: 1,
                px: 2,
              },
            },
          }}
        >
          <MenuItem onClick={handleProfile}>
            <ListItemIcon>
              <PersonOutlineIcon fontSize="small" color="action" />
            </ListItemIcon>
            <Typography variant="body2">Hồ sơ của tôi</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="action" />
            </ListItemIcon>
            <Typography variant="body2">Đăng xuất</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
