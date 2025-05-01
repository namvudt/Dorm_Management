import React, { useState } from 'react';

const RegisterRoom = () => {
  const rooms = [
    { id: 1, name: 'Phòng 101', capacity: 4, currentStudents: 2, deviceStatus: 'Tốt', area: '20m2', price: '1.500.000đ' },
    { id: 2, name: 'Phòng 102', capacity: 6, currentStudents: 5, deviceStatus: 'Bình thường', area: '30m2', price: '2.000.000đ' },
    { id: 3, name: 'Phòng 103', capacity: 3, currentStudents: 3, deviceStatus: 'Cần sửa chữa', area: '18m2', price: '1.200.000đ' }
  ];

  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRegisterClick = (room) => {
    setSelectedRoom(room);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Đăng Ký Thuê Phòng</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên phòng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={room.id}>
              <td>{index + 1}</td>
              <td>{room.name}</td>
              <td>
                <button onClick={() => handleRegisterClick(room)} style={styles.registerButton}>
                  Đăng Ký
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal hiển thị thông tin phòng */}
      {selectedRoom && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Chi tiết phòng: {selectedRoom.name}</h3>
            <p><strong>Sức chứa:</strong> {selectedRoom.capacity}</p>
            <p><strong>Số sinh viên hiện tại:</strong> {selectedRoom.currentStudents}</p>
            <p><strong>Trạng thái thiết bị:</strong> {selectedRoom.deviceStatus}</p>
            <p><strong>Diện tích:</strong> {selectedRoom.area}</p>
            <p><strong>Giá phòng:</strong> {selectedRoom.price}</p>

            <button onClick={handleCloseModal} style={styles.closeButton}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  table: {
    width: '80%',
    margin: '0 auto',
    borderCollapse: 'collapse',
  },
  registerButton: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    textAlign: 'left',
    minWidth: '300px',
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default RegisterRoom;
