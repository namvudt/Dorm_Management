import api from './config';

export const getStudents = async () => {
  try {
    const response = await api.get('/students');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể lấy danh sách sinh viên');
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể lấy thông tin sinh viên');
  }
};

export const addStudent = async (student) => {
  try {
    const response = await api.post('/students', student);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể thêm sinh viên mới');
  }
};

export const updateStudent = async (id, student) => {
  try {
    const response = await api.put(`/students/${id}`, student);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể cập nhật thông tin sinh viên');
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể xóa sinh viên');
  }
};

export const getStudentProfile = async () => {
  try {
    const response = await api.get('/students/profile');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể lấy thông tin cá nhân');
  }
};

export const updateStudentProfile = async (profile) => {
  try {
    const response = await api.put('/students/profile', profile);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể cập nhật thông tin cá nhân');
  }
};
