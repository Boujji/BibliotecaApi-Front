import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Box, Card, CardContent, TextField, Button,
  Typography, InputAdornment, IconButton, CircularProgress,
} from '@mui/material'
import { Email, Lock, Visibility, VisibilityOff, MenuBook } from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import { authService } from '../services/authService'
import { useSessionStore } from '@/stores/sessionStore'

const schema = z.object({
  eMail: z.string().email('Email inválido'),
  Password: z.string().min(1, 'Contraseña requerida'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useSessionStore()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await authService.login(data)
      const payload = res.data

      if (!payload.success || !payload.data) {
        enqueueSnackbar(payload.message || 'Credenciales incorrectas', { variant: 'error' })
        return
      }

      login(payload.data)
      enqueueSnackbar('Bienvenido ' + payload.data.Name, { variant: 'success' })
      navigate('/dashboard')
    } catch {
      enqueueSnackbar('Error de conexión', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0A0C12',
      p: 2,
    }}>
      <Card sx={{ width: '100%', maxWidth: 420 }}>
        <CardContent sx={{ p: 4 }}>

          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64, height: 64,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              mb: 2,
            }}>
              <MenuBook sx={{ fontSize: 32, color: '#0F1117' }} />
            </Box>
            <Typography variant="h4" fontWeight={800} gutterBottom>
              Biblioteca
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ingresá tus credenciales para continuar
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            <TextField
              label="Correo electrónico"
              type="email"
              fullWidth
              {...register('eMail')}
              error={!!errors.eMail}
              helperText={errors.eMail?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              {...register('Password')}
              error={!!errors.Password}
              helperText={errors.Password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ mt: 1, py: 1.5 }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Iniciar sesión'}
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Box>
  )
}