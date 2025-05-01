import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RoomDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const room = location.state?.room;

  const handleBackClick = () => {
    navigate('/student/dashboard');
  };

  if (!room) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p style={styles.errorText}>Không có thông tin phòng.</p>
          <button
            onClick={() => navigate('/register-room')}
            style={styles.backButton}
          >
            ← Quay lại đăng ký
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Chi tiết phòng</h1>

      <div style={styles.card}>
        <h2 style={styles.roomName}>{room.name}</h2>

        <div style={styles.detailItem}>
          <span style={styles.label}>Sức chứa:</span>
          <span>{room.capacity}</span>
        </div>

        <div style={styles.detailItem}>
          <span style={styles.label}>Số sinh viên hiện tại:</span>
          <span>{room.currentStudents}</span>
        </div>

        <div style={styles.detailItem}>
          <span style={styles.label}>Trạng thái thiết bị:</span>
          <span>{room.deviceStatus}</span>
        </div>

        <div style={styles.detailItem}>
          <span style={styles.label}>Diện tích:</span>
          <span>{room.area}</span>
        </div>

        <div style={styles.detailItem}>
          <span style={styles.label}>Giá phòng:</span>
          <span>{room.price}</span>
        </div>

        <button onClick={handleBackClick} style={styles.backButton}>
          ← Quay lại Dashboard
        </button>
      </div>
    </div>
  );
};

export default RoomDetail;

const styles = {
  container: {
    padding: '20px',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    flexDirection: 'column', // ➡️ Thêm dòng này để sắp xếp từ trên xuống dưới
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '36px',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px',
  },
  roomName: {
    fontSize: '28px',
    color: '#2196F3',
    marginBottom: '20px',
    textAlign: 'center',
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    fontSize: '16px',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    fontSize: '18px',
    color: '#f44336',
    marginBottom: '20px',
  },
  backButton: {
    marginTop: '20px',
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '8px',
    width: '100%',
    transition: 'background-color 0.3s',
  },
};
