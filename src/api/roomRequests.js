import axios from 'axios';
import { API_ENDPOINTS } from './config';

export const createRoomRequest = async (data) => {
    try {
        const response = await axios.post(API_ENDPOINTS.ROOM_REQUESTS, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getRoomRequests = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.ROOM_REQUESTS);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateRoomRequest = async (id, data) => {
    try {
        const response = await axios.put(`${API_ENDPOINTS.ROOM_REQUESTS}/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteRoomRequest = async (id) => {
    try {
        const response = await axios.delete(`${API_ENDPOINTS.ROOM_REQUESTS}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}; 