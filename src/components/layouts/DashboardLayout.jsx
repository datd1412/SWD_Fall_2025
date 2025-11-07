import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <Box sx={{ backgroundColor: "#f9fbf9", minHeight: "100vh" }}>
      {/* Page-level shell (Header is global); Outlet will render children */}
      <Outlet />
    </Box>
  );
}
