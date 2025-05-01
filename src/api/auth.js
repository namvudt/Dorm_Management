// src/api/auth.js

import api from './config';

export const loginApi = async (username, password) => {
  try {
    const response = await api.post('/auth/login', {
      username: username,
      password: password
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data);
    throw new Error(error.response?.data?.detail || 'Đăng nhập thất bại');
  }
};

export const logoutApi = async () => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const changePasswordApi = async (currentPassword, newPassword) => {
  try {
    const response = await api.post('/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword
    });
    return response.data;
  } catch (error) {
    console.error('Change password error:', error.response?.data);
    throw new Error(error.response?.data?.detail || 'Đổi mật khẩu thất bại');
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Không thể lấy thông tin người dùng');
  }
};
