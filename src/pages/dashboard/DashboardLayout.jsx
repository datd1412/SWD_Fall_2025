import React from 'react'
import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <Box sx={{ backgroundColor: '#f9fbf9', minHeight: '100vh', pb: 4 }}>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        {/* Page-level shell (Header is global); Outlet will render children */}
        <Outlet />
      </Container>
    </Box>
  )
}
