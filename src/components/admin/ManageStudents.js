import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageStudents = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyễn Văn A', studentId: 'SV001', room: 'P101' },
    { id: 2, name: 'Trần Thị B', studentId: 'SV002', room: 'P102' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [studentData, setStudentData] = useState({
    name: '',
    studentId: '',
    room: ''
  });

  const handleBack = () => {
    navigate('/dashboard');
  };

  const openAddModal = () => {
    setStudentData({ name: '', studentId: '', room: '' });
    setEditingStudentId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    setStudentData({
      name: student.name,
      studentId: student.studentId,
      room: student.room
    });
    setEditingStudentId(student.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveStudent = () => {
    if (!studentData.name || !studentData.studentId || !studentData.room) {
      alert('Vui lòng điền đầy đủ thông tin sinh viên');
      return;
    }

    if (editingStudentId !== null) {
      const updatedStudents = students.map((student) =>
        student.id === editingStudentId ? { ...student, ...studentData } : student
      );
      setStudents(updatedStudents);
    } else {
      const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        ...studentData
      };
      setStudents([...students, newStudent]);
    }

    closeModal();
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
      const updatedList = students.filter((student) => student.id !== id);
      setStudents(updatedList);
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={handleBack} style={styles.backButton}>
        ← Quay lại
      </button>

      <h2 style={styles.title}>Quản lý sinh viên</h2>

      <button onClick={openAddModal} style={styles.addButton}>
        Thêm sinh viên
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Tên sinh viên</th>
            <th style={styles.th}>Mã sinh viên</th>
            <th style={styles.th}>Phòng</th>
            <th style={styles.th}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td style={styles.td}>{student.id}</td>
              <td style={styles.td}>{student.name}</td>
              <td style={styles.td}>{student.studentId}</td>
              <td style={styles.td}>{student.room}</td>
              <td style={styles.td}>
                <button
                  onClick={() => openEditModal(student)}
                  style={styles.editButton}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteStudent(student.id)}
                  style={styles.deleteButton}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>{editingStudentId !== null ? 'Sửa sinh viên' : 'Thêm sinh viên mới'}</h3>

            <input
              type="text"
              placeholder="Tên sinh viên"
              value={studentData.name}
              onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Mã sinh viên"
              value={studentData.studentId}
              onChange={(e) => setStudentData({ ...studentData, studentId: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Phòng"
              value={studentData.room}
              onChange={(e) => setStudentData({ ...studentData, room: e.target.value })}
              style={styles.input}
            />

            <div style={styles.modalButtons}>
              <button onClick={handleSaveStudent} style={styles.saveButton}>
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

export default ManageStudents;

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  backButton: {
    marginBottom: '15px',
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '20px',
    borderRadius: '4px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left'
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px'
  },
  editButton: {
    backgroundColor: '#FFA500',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginRight: '8px'
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    boxSizing: 'border-box'
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  saveButton: {
    backgroundColor: 'green',
    color: 'white',
    padding: '8px 16px',
    marginRight: '10px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px'
  },
  cancelButton: {
    backgroundColor: 'gray',
    color: 'white',
    padding: '8px 16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px'
  }
};
