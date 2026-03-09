import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./auth/pages/LoginPage";
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
