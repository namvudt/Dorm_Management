import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const Home = () => (
  <Box textAlign="center" mt={5}>
    <Typography variant="h4">Hệ thống quản lý ký túc xá</Typography>
    <Box mt={3}>
      <Button variant="contained" color="primary" component={Link} to="/dashboard">
        Truy cập Dashboard
      </Button>
    </Box>
  </Box>
);

export default Home;
