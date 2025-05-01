import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { getAvailableRooms } from '../../api/rooms';
import { createRoomRequest } from '../../api/roomRequests';

const ViewRooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await getAvailableRooms();
      setRooms(data);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách phòng');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmRequest = async () => {
    try {
      setLoading(true);
      await createRoomRequest(selectedRoom.id);
      setSuccess('Đã gửi yêu cầu đăng ký phòng thành công');
      setIsConfirmDialogOpen(false);
      fetchRooms();
    } catch (err) {
      setError('Không thể gửi yêu cầu đăng ký phòng');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/student/dashboard');
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

      <Typography variant="h4" sx={{ mb: 3 }}>
        Danh sách phòng trống
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Phòng {room.room_number}
                </Typography>
                <Typography color="textSecondary">
                  Sức chứa: {room.capacity} người
                </Typography>
                <Typography color="textSecondary">
                  Giới tính: {room.gender}
                </Typography>
                <Typography color="textSecondary">
                  Giá phòng: {room.price.toLocaleString()} VNĐ/tháng
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleRoomSelect(room)}
                >
                  Đăng ký
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
      >
        <DialogTitle>Xác nhận đăng ký phòng</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn đăng ký phòng {selectedRoom?.room_number}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmDialogOpen(false)}>Hủy</Button>
          <Button onClick={handleConfirmRequest} color="primary" variant="contained">
            Xác nhận
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

export default ViewRooms;
