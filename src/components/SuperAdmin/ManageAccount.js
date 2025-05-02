import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  resetPassword
} from '../../api/accounts';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Refresh as RefreshIcon } from '@mui/icons-material';

const ManageAccounts = ({ onLogout }) => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [accountData, setAccountData] = useState({
    username: '',
    email: '',
    role: '',
    password: '',
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const data = await getAccounts();
      console.log('Fetched accounts:', data);
      if (Array.isArray(data)) {
        setAccounts(data);
      } else {
        console.error('Received data is not an array:', data);
        setError('Dữ liệu không hợp lệ');
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError('Không thể tải danh sách tài khoản');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      try {
        setLoading(true);
        const response = await deleteAccount(id);
        if (response) {
          setSuccess('Xóa tài khoản thành công');
          await fetchAccounts(); // Refresh danh sách sau khi xóa
        } else {
          throw new Error('Không thể xóa tài khoản');
        }
      } catch (err) {
        console.error('Lỗi khi xóa tài khoản:', err);
        setError(err.message || 'Không thể xóa tài khoản');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResetPassword = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn đặt lại mật khẩu cho tài khoản này?')) {
      try {
        setLoading(true);
        const response = await resetPassword(id);
        if (response) {
          setSuccess('Đặt lại mật khẩu thành công');
        } else {
          throw new Error('Không thể đặt lại mật khẩu');
        }
      } catch (err) {
        console.error('Lỗi khi đặt lại mật khẩu:', err);
        setError(err.message || 'Không thể đặt lại mật khẩu');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = (account) => {
    setEditingAccount(account.id);
    setAccountData({
      username: account.username,
      email: account.email,
      role: account.role,
      password: '', // Không hiển thị mật khẩu cũ
    });
    setIsEditModalOpen(true);
  };

  const handleSaveAccount = async () => {
    // Validate dữ liệu
    if (!accountData.username || !accountData.email || !accountData.role) {
      setError('Vui lòng nhập đầy đủ thông tin tài khoản');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(accountData.email)) {
      setError('Email không hợp lệ');
      return;
    }

    // Validate password khi tạo mới
    if (!editingAccount && !accountData.password) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }

    try {
      setLoading(true);
      if (editingAccount) {
        // Khi cập nhật, chỉ gửi các trường cần thiết
        const updateData = {
          username: accountData.username,
          email: accountData.email,
          role: accountData.role,
        };
        const response = await updateAccount(editingAccount, updateData);
        if (response) {
          setSuccess('Cập nhật tài khoản thành công');
          await fetchAccounts();
        }
      } else {
        // Khi tạo mới, gửi tất cả thông tin bao gồm mật khẩu
        const createData = {
          username: accountData.username,
          email: accountData.email,
          role: accountData.role,
          password: accountData.password,
        };
        console.log('Creating account with data:', createData);
        const response = await createAccount(createData);
        console.log('Create account response:', response);
        if (response) {
          setSuccess('Tạo tài khoản thành công');
          await fetchAccounts();
        }
      }
      setIsEditModalOpen(false);
      setEditingAccount(null);
      setAccountData({ username: '', email: '', role: '', password: '' });
    } catch (err) {
      console.error('Error saving account:', err);
      setError(err.message || 'Không thể lưu tài khoản');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/superadmin/dashboard');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBack}
        sx={{ mb: 2 }}
      >
        ← Quay lại Dashboard
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <h2>Quản lý tài khoản</h2>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setEditingAccount(null);
            setAccountData({ username: '', email: '', role: '', password: '' });
            setIsEditModalOpen(true);
          }}
        >
          + Thêm tài khoản
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên đăng nhập</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.username}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>
                  {account.role === 'superadmin' ? 'Super Admin' :
                   account.role === 'admin' ? 'Admin' : 'Sinh viên'}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(account)}
                    title="Sửa"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="warning"
                    onClick={() => handleResetPassword(account.id)}
                    title="Đặt lại mật khẩu"
                  >
                    <RefreshIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteAccount(account.id)}
                    title="Xóa"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingAccount(null);
          setAccountData({ username: '', email: '', role: '', password: '' });
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingAccount ? 'Sửa thông tin tài khoản' : 'Thêm tài khoản mới'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Tên đăng nhập"
            value={accountData.username}
            onChange={(e) => setAccountData({ ...accountData, username: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={accountData.email}
            onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
            margin="normal"
            required
          />
          {!editingAccount && (
            <TextField
              fullWidth
              label="Mật khẩu"
              type="password"
              value={accountData.password}
              onChange={(e) => setAccountData({ ...accountData, password: e.target.value })}
              margin="normal"
              required
            />
          )}
          <FormControl fullWidth margin="normal">
            <InputLabel>Vai trò</InputLabel>
            <Select
              value={accountData.role}
              onChange={(e) => setAccountData({ ...accountData, role: e.target.value })}
              label="Vai trò"
              required
            >
              <MenuItem value="superadmin">Super Admin</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="student">Sinh viên</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              setIsEditModalOpen(false);
              setEditingAccount(null);
              setAccountData({ username: '', email: '', role: '', password: '' });
            }}
          >
            Hủy
          </Button>
          <Button 
            onClick={handleSaveAccount} 
            variant="contained" 
            color="primary"
            disabled={loading}
          >
            {editingAccount ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageAccounts;
