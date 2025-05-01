import api from './config';

export const getAccounts = async () => {
  try {
    const response = await api.get('/accounts');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể lấy danh sách tài khoản');
  }
};

export const getAccountById = async (id) => {
  try {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể lấy thông tin tài khoản');
  }
};

export const createAccount = async (account) => {
  try {
    const response = await api.post('/accounts', account);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể tạo tài khoản mới');
  }
};

export const updateAccount = async (id, account) => {
  try {
    const response = await api.put(`/accounts/${id}`, account);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể cập nhật thông tin tài khoản');
  }
};

export const deleteAccount = async (id) => {
  try {
    const response = await api.delete(`/accounts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể xóa tài khoản');
  }
};

export const changePassword = async (id, passwords) => {
  try {
    const response = await api.post(`/accounts/${id}/change-password`, passwords);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể thay đổi mật khẩu');
  }
};

export const resetPassword = async (id) => {
  try {
    const response = await api.post(`/accounts/${id}/reset-password`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể đặt lại mật khẩu');
  }
};
