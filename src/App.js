import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MyProfile from './components/student/MyProfile';
import Login from './components/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import SuperAdminDashboard from './components/SuperAdmin/SuperAdminDashboard';
import ManageAccounts from './components/SuperAdmin/ManageAccount';
import ViewRooms from './components/student/ViewRooms'; // ✅ Thêm dòng này
import ManageRooms from './components/admin/ManageRooms';
import ManageStudents from './components/admin/ManageStudents';
import RoomDetail from './components/student/RoomDetail'; // Import component mới
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    setToken(storedToken);
    setRole(storedRole);
  }, []);

  const handleLoginSuccess = (accessToken, userRole) => {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('role', userRole);
    setToken(accessToken);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setToken(null);
    setRole(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !token ? (
              <Login onLoginSuccess={handleLoginSuccess} />
            ) : role === 'superadmin' ? (
              <Navigate to="/superadmin/dashboard" replace />
            ) : role === 'admin' ? (
              <Navigate to="/admin/dashboard" replace />
            ) : role === 'student' ? (
              <Navigate to="/student/dashboard" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/superadmin/dashboard"
          element={
            token && role === 'superadmin' ? (
              <SuperAdminDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/superadmin/manage-accounts"
          element={
            token && role === 'superadmin' ? (
              <ManageAccounts onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            token && role === 'admin' ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/admin/manage-students"
          element={
            token && role === 'admin' ? (
              <ManageStudents onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        
        <Route
          path="/student/dashboard"
          element={
            token && role === 'student' ? (
              <StudentDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/student/my-profile"
          element={
            token && role === 'student' ? (
              <MyProfile onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
            path="/admin/manage-rooms"
            element={
              token && role === 'admin' ? (
                <ManageRooms onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
        />
        {/* ✅ Thêm route ViewRooms */}
        <Route
          path="/student/view-rooms"
          element={
            token && role === 'student' ? (
              <ViewRooms onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

          <Route
            path="/student/room-detail"
            element={
              token && role === 'student' ? (
                <RoomDetail onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
