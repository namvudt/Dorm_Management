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

const ManageAccounts = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [accountData, setAccountData] = useState({
    name: '',
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
      setAccounts(data);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách tài khoản');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      try {
        setLoading(true);
        await deleteAccount(id);
        setSuccess('Xóa tài khoản thành công');
        fetchAccounts();
      } catch (err) {
        setError('Không thể xóa tài khoản');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResetPassword = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn đặt lại mật khẩu cho tài khoản này?')) {
      try {
        setLoading(true);
        await resetPassword(id);
        setSuccess('Đặt lại mật khẩu thành công');
      } catch (err) {
        setError('Không thể đặt lại mật khẩu');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = (account) => {
    setEditingAccount(account.id);
    setAccountData({
      name: account.name,
      email: account.email,
      role: account.role,
      password: '',
    });
    setIsEditModalOpen(true);
  };

  const handleSaveAccount = async () => {
    if (!accountData.name || !accountData.email || !accountData.role) {
      setError('Vui lòng nhập đầy đủ thông tin tài khoản');
      return;
    }

    try {
      setLoading(true);
      if (editingAccount) {
        await updateAccount(editingAccount, accountData);
        setSuccess('Cập nhật tài khoản thành công');
      } else {
        await createAccount(accountData);
        setSuccess('Tạo tài khoản thành công');
      }
      fetchAccounts();
      setIsEditModalOpen(false);
      setEditingAccount(null);
    } catch (err) {
      setError('Không thể lưu tài khoản');
      console.error(err);
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
            setAccountData({ name: '', email: '', role: '', password: '' });
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
              <TableCell>Họ tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.role}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(account)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="warning"
                    onClick={() => handleResetPassword(account.id)}
                  >
                    <RefreshIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteAccount(account.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DialogTitle>
          {editingAccount ? 'Sửa thông tin tài khoản' : 'Thêm tài khoản mới'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Họ tên"
            value={accountData.name}
            onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={accountData.email}
            onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            value={accountData.password}
            onChange={(e) => setAccountData({ ...accountData, password: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Vai trò</InputLabel>
            <Select
              value={accountData.role}
              onChange={(e) => setAccountData({ ...accountData, role: e.target.value })}
              label="Vai trò"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditModalOpen(false)}>Hủy</Button>
          <Button onClick={handleSaveAccount} variant="contained" color="primary">
            Lưu
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
