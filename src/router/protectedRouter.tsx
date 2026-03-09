import { Navigate } from 'react-router-dom'
import { useSessionStore } from '@/stores/sessionStore'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { accessToken } = useSessionStore()
    console.log('ProtectedRoute - accessToken:', accessToken)
  
    if (!accessToken) {
      return <Navigate to="/login" replace />
    }
  
    return <>{children}</>
  }