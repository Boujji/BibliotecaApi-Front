import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Person, MenuBook, SwapHoriz } from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

const SideBarItem = [ 
    {label : 'Usuarios', icon: <Person />, path: '/usuarios'}, 
    {label : 'Libros', icon: <MenuBook />, path: '/libros'}, 
    {label : 'Prestamos', icon: <SwapHoriz />, path: '/prestamos'}]

export default function SideBar() {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Box sx={{
          width: 240,
          minHeight: '100vh',
          background: '#0F1117',
          borderRight: '1px solid #1E2130',
          display: 'flex',
          flexDirection: 'column',
          py: 3,
        }}>
    
          {/* Logo */}
          <Box sx={{ px: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight={800} color="warning.main">
              📚 Biblioteca
            </Typography>
          </Box>
    
          {/* Menu */}
          <List>
            {SideBarItem.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <ListItemButton
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    mb: 0.5,
                    backgroundColor: isActive ? '#1E2130' : 'transparent',
                    '&:hover': { backgroundColor: '#1E2130' },
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? 'warning.main' : 'text.secondary', minWidth: 36 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      color: isActive ? 'white' : 'text.secondary',
                      fontWeight: isActive ? 700 : 400,
                      fontSize: 14,
                    }}
                  />
                </ListItemButton>
              )
            })}
          </List>
    
        </Box>
      )
}
