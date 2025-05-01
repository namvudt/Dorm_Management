import api from './config';

export const getRooms = async () => {
  try {
    const response = await api.get('/rooms');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể lấy danh sách phòng');
  }
};

export const getRoomById = async (id) => {
  try {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể lấy thông tin phòng');
  }
};

export const addRoom = async (room) => {
  try {
    const response = await api.post('/rooms', room);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể thêm phòng mới');
  }
};

export const updateRoom = async (id, room) => {
  try {
    const response = await api.put(`/rooms/${id}`, room);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể cập nhật thông tin phòng');
  }
};

export const deleteRoom = async (id) => {
  try {
    const response = await api.delete(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể xóa phòng');
  }
};

export const getAvailableRooms = async () => {
  try {
    const response = await api.get('/rooms/available');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể lấy danh sách phòng trống');
  }
};
