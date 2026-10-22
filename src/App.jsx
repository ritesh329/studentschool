import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Public from './UserFace/Home/StHome';

// Staff / teacher / admin live in the separate "staff-panel" app. The home page has "Staff Login" links
// (/admin-login) — send those to that app.
const STAFF_PANEL_URL = (import.meta.env.VITE_STAFF_PANEL_URL || '').replace(/\/+$/, '');
const ToStaffPanel = () => {
  if (!STAFF_PANEL_URL) return <Navigate to="/" replace />;
  window.location.replace(`${STAFF_PANEL_URL}${window.location.pathname}`);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Home page + Admission form + Student portal (login inside) */}
          <Route path="/" element={<Public />} />
          <Route path="/admin-login" element={<ToStaffPanel />} />
          <Route path="/admin/*" element={<ToStaffPanel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
