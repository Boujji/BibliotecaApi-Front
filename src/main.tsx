import { theme } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}></SnackbarProvider>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>)