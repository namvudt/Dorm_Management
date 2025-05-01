import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ➡️ cần để quay lại

const MyProfile = () => {
  const navigate = useNavigate(); // ➡️ để điều hướng quay lại dashboard

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [editedName, setEditedName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setEditedName(storedUser.name || '');
      setEditedPhone(storedUser.phone || '');
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedUser = {
      ...user,
      name: editedName,
      phone: editedPhone,
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    alert('Cập nhật thông tin thành công!');
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedName(user.name);
    setEditedPhone(user.phone);
  };

  const handleGoBack = () => {
    navigate('/student/dashboard');
  };

  if (!user) {
    return <p style={styles.loading}>Đang tải thông tin sinh viên...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Thông tin cá nhân</h2>

      <div style={styles.infoContainer}>
        <div style={styles.infoRow}>
          <span style={styles.label}>Họ tên:</span>
          {isEditing ? (
            <input
              style={styles.input}
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          ) : (
            <span style={styles.value}>{user.name || 'Chưa cập nhật'}</span>
          )}
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>Tên đăng nhập:</span>
          <span style={styles.value}>{user.username || 'Chưa có'}</span>
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>Mã sinh viên:</span>
          <span style={styles.value}>{user.studentId || 'Chưa có'}</span>
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>Số điện thoại:</span>
          {isEditing ? (
            <input
              style={styles.input}
              value={editedPhone}
              onChange={(e) => setEditedPhone(e.target.value)}
            />
          ) : (
            <span style={styles.value}>{user.phone || 'Chưa cập nhật'}</span>
          )}
        </div>
      </div>

      <div style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <button style={styles.saveButton} onClick={handleSaveClick}>
              💾 Lưu
            </button>
            <button style={styles.cancelButton} onClick={handleCancelClick}>
              ❌ Hủy
            </button>
          </>
        ) : (
          <button style={styles.editButton} onClick={handleEditClick}>
            ✏️ Sửa thông tin
          </button>
        )}

        {/* Nút quay lại */}
        <button style={styles.backButton} onClick={handleGoBack}>
          🔙 Quay lại Dashboard
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#fff',
    borderRadius: '6px',
    border: '1px solid #ddd',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    flex: '1',
  },
  value: {
    color: '#333',
    flex: '2',
    textAlign: 'right',
  },
  input: {
    flex: '2',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#9E9E9E',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    color: '#777',
  },
};

export default MyProfile;
