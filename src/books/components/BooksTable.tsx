import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Chip, Typography
  } from '@mui/material'
  import type { Libro } from '@/types'
  
  interface Props {
    books: Libro[]
  }
  
  export default function BookTable({ books }: Props) {
    return (
      <TableContainer component={Paper} sx={{ background: '#0F1117', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Título</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Categoría</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Cantidad</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Disponible</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="text.secondary">No hay libros registrados</Typography>
                </TableCell>
              </TableRow>
            ) : (
              books.map((book) => (
                <TableRow key={book.Id} sx={{ '&:hover': { background: '#1E2130' } }}>
                  <TableCell sx={{ color: 'white' }}>{book.Titulo}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{book.Categoria}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{book.CantidadLibro}</TableCell>
                  <TableCell>
                    <Chip
                      label={book.Disponibilidad ? 'Disponible' : 'No disponible'}
                      color={book.Disponibilidad ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }