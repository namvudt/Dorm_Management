import api from './config';

export const getAccounts = async () => {
  try {
    console.log('Calling getAccounts API...');
    const response = await api.get('/accounts/');
    console.log('getAccounts response:', response);
    return response.data;
  } catch (error) {
    console.error('getAccounts error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data?.detail || 'Không thể lấy danh sách tài khoản');
    }
    throw new Error('Lỗi kết nối đến server');
  }
};

export const getAccountById = async (id) => {
  try {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Không thể lấy thông tin tài khoản');
  }
};

export const createAccount = async (account) => {
  try {
    console.log('Calling createAccount API with data:', account);
    const response = await api.post('/accounts/', {
      username: account.username,
      email: account.email,
      password: account.password,
      role: account.role
    });
    console.log('createAccount response:', response);
    return response.data;
  } catch (error) {
    console.error('createAccount error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data?.detail || 'Không thể tạo tài khoản mới');
    }
    throw new Error('Lỗi kết nối đến server');
  }
};

export const updateAccount = async (id, account) => {
  try {
    console.log('Calling updateAccount API for id:', id, 'with data:', account);
    const response = await api.put(`/accounts/${id}`, {
      username: account.username,
      email: account.email,
      role: account.role
    });
    console.log('updateAccount response:', response);
    return response.data;
  } catch (error) {
    console.error('updateAccount error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data?.detail || 'Không thể cập nhật thông tin tài khoản');
    }
    throw new Error('Lỗi kết nối đến server');
  }
};

export const deleteAccount = async (id) => {
  try {
    console.log('Calling deleteAccount API for id:', id);
    const response = await api.delete(`/accounts/${id}`);
    console.log('deleteAccount response:', response);
    return response.data;
  } catch (error) {
    console.error('deleteAccount error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data?.detail || 'Không thể xóa tài khoản');
    }
    throw new Error('Lỗi kết nối đến server');
  }
};

export const changePassword = async (id, passwords) => {
  try {
    const response = await api.post(`/accounts/${id}/change-password`, passwords);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Không thể thay đổi mật khẩu');
  }
};

export const resetPassword = async (id) => {
  try {
    console.log('Calling resetPassword API for id:', id);
    const response = await api.post(`/accounts/${id}/reset-password`);
    console.log('resetPassword response:', response);
    return response.data;
  } catch (error) {
    console.error('resetPassword error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data?.detail || 'Không thể đặt lại mật khẩu');
    }
    throw new Error('Lỗi kết nối đến server');
  }
};
