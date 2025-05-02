import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePasswordPopup from '../ChangePasswordPopup';

const SuperAdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);

  const totalAccounts = 100;
  const totalAdmins = 10;
  const totalStudents = 90;

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Thông tin tài khoản</h2>
              <p><strong>Tên đăng nhập:</strong> superadmin</p>
              <p><strong>Vai trò:</strong> Super Admin</p>
            </div>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Thống kê hệ thống</h2>
              <div style={styles.statsContainer}>
                <div style={styles.statBox}>
                  <h3>{totalAccounts}</h3>
                  <p>Tổng tài khoản</p>
                </div>
                <div style={styles.statBox}>
                  <h3>{totalAdmins}</h3>
                  <p>Số Admin</p>
                </div>
                <div style={styles.statBox}>
                  <h3>{totalStudents}</h3>
                  <p>Số Sinh viên</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Super Admin</h2>
        <button onClick={() => handleMenuClick('/superadmin/dashboard')} style={styles.sidebarButton}>📊 Tổng Quan</button>
        <button onClick={() => handleMenuClick('/superadmin/manage-accounts')} style={styles.sidebarButton}>👤 Quản lý Tài khoản</button>
        <button onClick={() => setShowChangePasswordPopup(true)} style={styles.sidebarButton}>🔒 Đổi mật khẩu</button>
        <button onClick={handleLogoutClick} style={{ ...styles.sidebarButton, backgroundColor: '#f44336' }}>🚪 Đăng xuất</button>
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>Super Admin Dashboard</h1>
        {renderContent()}
      </div>

      {showChangePasswordPopup && (
        <ChangePasswordPopup onClose={() => setShowChangePasswordPopup(false)} />
      )}
    </div>
  );
};

export default SuperAdminDashboard;
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
  section: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#333',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  statBox: {
    backgroundColor: '#2196F3',
    color: '#fff',
    borderRadius: '8px',
    padding: '20px',
    width: '200px',
    textAlign: 'center',
    marginBottom: '10px',
  },
};

