import axios from 'axios';

export const getRooms = async () => {
  const response = await axios.get('/api/rooms');
  return response.data;
};

export const getStudents = async () => {
  const response = await axios.get('/api/students');
  return response.data;
};
