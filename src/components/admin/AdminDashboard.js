import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePasswordPopup from '../ChangePasswordPopup';

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showChangePassword, setShowChangePassword] = useState(false);

  const availableRooms = 5;
  const activeStudents = 12;

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div style={styles.statsContainer}>
            <div style={styles.statBox}>
              <h3 style={styles.statNumber}>{availableRooms}</h3>
              <p style={styles.statLabel}>Phòng còn trống</p>
            </div>
            <div style={styles.statBox}>
              <h3 style={styles.statNumber}>{activeStudents}</h3>
              <p style={styles.statLabel}>Sinh viên đang sử dụng</p>
            </div>
          </div>
        );
      case 'rooms':
        return <h2>Trang Quản lý Phòng</h2>;
      case 'students':
        return <h2>Trang Quản lý Yêu cầu</h2>;
      default:
        return null;
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Quản Trị</h2>
        <button onClick={() => setActiveTab('dashboard')} style={styles.sidebarButton}>📊 Thống kê</button>
        <button onClick={() => setActiveTab('rooms')} style={styles.sidebarButton}>🏢 Quản lý Phòng</button>
        <button onClick={() => setActiveTab('students')} style={styles.sidebarButton}>👨‍🎓 Quản lý Yêu cầu</button>
        <button onClick={() => setShowChangePassword(true)} style={styles.sidebarButton}>🔒 Đổi Mật Khẩu</button>
        <button onClick={handleLogoutClick} style={{ ...styles.sidebarButton, backgroundColor: '#f44336' }}>🚪 Đăng Xuất</button>
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        {renderContent()}
      </div>

      {showChangePassword && (
        <ChangePasswordPopup onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;

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
  statsContainer: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
  },
  statBox: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '200px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: '16px',
    marginTop: '10px',
  },
};
