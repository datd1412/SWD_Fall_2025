
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const today = new Date();
const dayOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"][today.getDay()];
const dateString = `${dayOfWeek}, ${today.toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })}`;

export default function Header({ drawerWidth = 260 }) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        borderBottom: '1px solid #f0f0f0',
        bgcolor: '#fff',
        zIndex: 1201,
      }}
    >
      <Toolbar sx={{ minHeight: 80, px: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="#222">
            Dashboard
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
            <CalendarTodayIcon sx={{ fontSize: 18, color: '#bdbdbd' }} />
            <Typography variant="body2" color="text.secondary">
              {dateString}
            </Typography>
          </Stack>
        </Box>
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Search bar */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: 2,
              background: alpha('#f6faf7', 1),
              border: '1px solid #e0e0e0',
              minWidth: 220,
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 0.5,
            }}
          >
            <SearchIcon sx={{ color: '#bdbdbd', mr: 1 }} />
            <InputBase
              placeholder="Tìm kiếm..."
              sx={{ flex: 1, fontSize: 15, color: '#222', background: 'transparent' }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
          {/* Notification icon */}
          <IconButton sx={{ bgcolor: '#f6faf7', border: '1px solid #e0e0e0', mr: 1 }}>
            <NotificationsNoneIcon sx={{ color: '#2fb56c' }} />
          </IconButton>
          {/* User avatar */}
          <Avatar sx={{ bgcolor: '#b2e5c2', color: '#222', fontWeight: 700, width: 40, height: 40 }}>NA</Avatar>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}