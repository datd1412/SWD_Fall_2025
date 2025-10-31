import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ textAlign: "center", py: 2, borderTop: "1px solid #ddd", mt: 4 }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} EV Rental System
      </Typography>
    </Box>
  );
}