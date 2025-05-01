import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageRooms = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [roomData, setRoomData] = useState({
    name: "",
    capacity: "",
    description: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      // Giả lập fetch dữ liệu, thay bằng API thật nếu có
      const response = [
        { id: 1, name: "Phòng 101", capacity: 30, description: "Phòng học máy tính" },
        { id: 2, name: "Phòng 102", capacity: 25, description: "Phòng học tiếng Anh" },
      ];
      setRooms(response);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phòng:", error);
    }
  };

  const openAddModal = () => {
    setRoomData({ name: "", capacity: "", description: "" });
    setEditingRoom(null);
    setIsModalOpen(true);
  };

  const openEditModal = (room) => {
    setRoomData({
      name: room.name,
      capacity: room.capacity,
      description: room.description,
    });
    setEditingRoom(room.id);
    setIsModalOpen(true);
  };

  const handleDeleteRoom = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phòng này?")) {
      const updatedRooms = rooms.filter((room) => room.id !== id);
      setRooms(updatedRooms);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveRoom = () => {
    if (!roomData.name || !roomData.capacity || !roomData.description) {
      alert("Vui lòng điền đầy đủ thông tin phòng");
      return;
    }

    if (editingRoom !== null) {
      // Sửa phòng
      const updatedRooms = rooms.map((room) =>
        room.id === editingRoom ? { ...room, ...roomData } : room
      );
      setRooms(updatedRooms);
    } else {
      // Thêm phòng mới
      const newRoom = {
        id: rooms.length > 0 ? rooms[rooms.length - 1].id + 1 : 1,
        ...roomData,
      };
      setRooms([...rooms, newRoom]);
    }

    closeModal();
  };

  const handleGoBack = () => {
    navigate("/admin"); // Thay đổi đường dẫn tùy nơi bạn cần quay lại
  };

  return (
    <div style={styles.container}>
      <button onClick={handleGoBack} style={styles.backButton}>
        ← Quay lại
      </button>

      <h2 style={styles.title}>Quản lý phòng học</h2>

      <button onClick={openAddModal} style={styles.addButton}>
        Thêm phòng
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Tên phòng</th>
            <th style={styles.th}>Sức chứa</th>
            <th style={styles.th}>Mô tả</th>
            <th style={styles.th}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td style={styles.td}>{room.name}</td>
              <td style={styles.td}>{room.capacity}</td>
              <td style={styles.td}>{room.description}</td>
              <td style={styles.td}>
                <button
                  onClick={() => openEditModal(room)}
                  style={styles.editButton}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteRoom(room.id)}
                  style={styles.deleteButton}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>{editingRoom !== null ? "Sửa phòng" : "Thêm phòng mới"}</h3>

            <input
              type="text"
              placeholder="Tên phòng"
              value={roomData.name}
              onChange={(e) =>
                setRoomData({ ...roomData, name: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Sức chứa"
              value={roomData.capacity}
              onChange={(e) =>
                setRoomData({ ...roomData, capacity: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Mô tả"
              value={roomData.description}
              onChange={(e) =>
                setRoomData({ ...roomData, description: e.target.value })
              }
              style={styles.input}
            />

            <div style={styles.modalButtons}>
              <button onClick={handleSaveRoom} style={styles.saveButton}>
                Lưu
              </button>
              <button onClick={closeModal} style={styles.cancelButton}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRooms;

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  backButton: {
    marginBottom: "15px",
    backgroundColor: "#2196F3",
    color: "white",
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px",
    borderRadius: "4px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f2f2f2",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  editButton: {
    backgroundColor: "#FFA500",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px",
    marginRight: "8px",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    boxSizing: "border-box",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  saveButton: {
    backgroundColor: "green",
    color: "white",
    padding: "8px 16px",
    marginRight: "10px",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
  },
  cancelButton: {
    backgroundColor: "gray",
    color: "white",
    padding: "8px 16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
  },
};
