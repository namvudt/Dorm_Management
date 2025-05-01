import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePasswordPopup from '../ChangePasswordPopup';

const StudentDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <h2>Chào mừng bạn đến với Student Dashboard!</h2>;
      case 'rooms':
        return <h2>📋 Danh sách Phòng </h2>;
      case 'profile':
        return <h2>👤 Thông Tin Cá Nhân </h2>;
      default:
        return null;
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Sinh Viên</h2>
        <button onClick={() => setActiveTab('home')} style={styles.sidebarButton}>🏠 Trang Chủ</button>
        <button onClick={() => setActiveTab('rooms')} style={styles.sidebarButton}>📋 Xem Danh sách Phòng</button>
        <button onClick={() => setActiveTab('profile')} style={styles.sidebarButton}>👤 Thông Tin Cá Nhân</button>
        <button onClick={() => setShowChangePasswordPopup(true)} style={styles.sidebarButton}>🔒 Đổi Mật Khẩu</button>
        <button onClick={handleLogoutClick} style={{ ...styles.sidebarButton, backgroundColor: '#f44336' }}>🚪 Đăng Xuất</button>
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>Student Dashboard</h1>
        {renderContent()}
      </div>

      {showChangePasswordPopup && (
        <ChangePasswordPopup onClose={() => setShowChangePasswordPopup(false)} />
      )}
    </div>
  );
};

export default StudentDashboard;

const styles = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#2c3e50',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
  },
  logo: {
    fontSize: '24px',
    marginBottom: '30px',
    color: '#ecf0f1',
  },
  sidebarButton: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#34495e',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    marginBottom: '12px',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  content: {
    flex: 1,
    padding: '30px',
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: '32px',
    color: '#2c3e50',
    marginBottom: '20px',
  },
};
