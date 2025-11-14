import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReceiptIcon from "@mui/icons-material/Receipt";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import { useUserStore } from "../../stores/userStore";

const menuItems = [
  { text: "Dashboard", icon: <HomeIcon />, path: "/dashboard" },
  {
    text: "Lịch sử giao nhận",
    icon: <HistoryIcon />,
    path: "/dashboard/history",
  },
  { text: "Hợp đồng", icon: <ReceiptIcon />, path: "/contracts" },
  { text: "Khách hàng", icon: <PeopleAltIcon />, path: "/customers" },
];

export default function Sidebar({ drawerWidth = 260 }) {
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const [userProfile, setUserProfile] = React.useState(null);

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await authService.getUserProfile();
        // response.data chính là object user luôn
        if (response) {
          setUserProfile(response);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    // Implement logout logic here
    logout();
    localStorage.clear();
    console.log("Logout clicked");
  };

  // Lấy chữ cái đầu của tên để làm avatar
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "none",
          bgcolor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 0,
        },
      }}
    >
      <Box>
        {/* Logo and title */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 3, py: 3 }}
        >
          <Avatar sx={{ bgcolor: "#2fb56c", width: 40, height: 40 }}>
            <ElectricBoltIcon sx={{ color: "#fff" }} />
          </Avatar>
          <Box>
            <Typography fontWeight={700} fontSize={18} color="#222">
              Xe cho thuê
            </Typography>
            <Typography fontSize={13} color="text.secondary">
              Staff Portal
            </Typography>
          </Box>
        </Box>
        {/* User info */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 3,
            py: 2,
            bgcolor: "#f6faf7",
            borderRadius: 2,
            mx: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#b2e5c2",
              color: "#222",
              width: 40,
              height: 40,
              fontWeight: 700,
            }}
          >
            {userProfile ? getInitials(userProfile.fullName) : "NA"}
          </Avatar>
          <Box>
            <Typography fontWeight={600} fontSize={15} color="#222">
              {userProfile?.fullName || "Đang tải..."}
            </Typography>
            <Typography fontSize={13} color="text.secondary">
              {userProfile?.stationName || "Chi nhánh"}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        {/* Navigation */}
        <List sx={{ px: 1 }}>
          {menuItems.map((item) => {
            // Exact match or match with sub-routes, but prioritize exact matches
            const isSelected = location.pathname === item.path;
            return (
              <ListItemButton
                key={item.text}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  mb: 0.5,
                  "&.Mui-selected, &.Mui-selected:hover": {
                    bgcolor: "#e9fbef",
                    color: "#2fb56c",
                    fontWeight: 700,
                  },
                  "&:hover": {
                    bgcolor: "#f6faf7",
                  },
                }}
                selected={isSelected}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
      {/* Logout button at the bottom */}
      <Box sx={{ px: 3, pb: 3 }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<LogoutIcon />}
          sx={{
            borderRadius: 2,
            color: "#222",
            borderColor: "#e0e0e0",
            bgcolor: "#fff",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              bgcolor: "#f6faf7",
              borderColor: "#2fb56c",
              color: "#2fb56c",
            },
          }}
          onClick={handleLogout}
        >
          Đăng xuất
        </Button>
      </Box>
    </Drawer>
  );
}
