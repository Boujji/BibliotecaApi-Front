import { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, Alert } from '@mui/material'
import { MenuBook } from '@mui/icons-material'
import SideBar from '@/dashboard/components/SideBar'
import BooksTable from './BooksTable'
import { booksService } from '../services/BooksServices'
import type { Libro } from '@/types'

export default function BooksPage() {
    const [books, setBooks] = useState<Libro[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        booksService.getBooks().then((response)=>setBooks(response.data.data??[]))
        .catch(()=>setError('Error al obtener los libros'))
        .finally(()=>setLoading(false))
    }, [])

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', background: '#0A0C12' }}>
          <SideBar />
    
          <Box sx={{ flex: 1, p: 4 }}>
    
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
              <MenuBook sx={{ fontSize: 32, color: 'warning.main' }} />
              <Typography variant="h4" fontWeight={800} color="white">
                Libros
              </Typography>
            </Box>
    
            {/* Contenido */}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress color="warning" />
              </Box>
            )}
    
            {error && (
              <Alert severity="error">{error}</Alert>
            )}
    
            {!loading && !error && (
              <BooksTable books={books} />
            )}
    
          </Box>
        </Box>
      )
}