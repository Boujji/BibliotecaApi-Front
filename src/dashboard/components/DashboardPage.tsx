import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSessionStore } from '@/stores/sessionStore'
import SideBar from './SideBar'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { logout } = useSessionStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#0A0C12' }}>  
  
      <SideBar />  
  
      <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
        }}>
        <Typography>Dashboard</Typography>
        <Typography>Bienvenido al sistema</Typography>
        <Button variant="outlined" color="warning" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Box>
  
    </Box>
  )
}