import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./auth/pages/LoginPage";
import './App.css';
import DashboardPage from "./dashboard/components/DashboardPage";
import ProtectedRoute from "./router/protectedRouter";
import BooksPage from "./books/components/BooksPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/libros"
        element={
          <ProtectedRoute>
            <BooksPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
