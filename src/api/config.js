import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const API_ENDPOINTS = {
    AUTH: `${API_BASE_URL}/auth`,
    ACCOUNTS: `${API_BASE_URL}/accounts`,
    ROOMS: `${API_BASE_URL}/rooms`,
    ROOM_REQUESTS: `${API_BASE_URL}/room-requests`
};

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 seconds timeout
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log('Current token:', token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request config:', config);
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response;
    },
    (error) => {
        console.error('Response interceptor error:', error);
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user');
            window.location.href = '/login';
        } else if (error.code === 'ECONNABORTED') {
            console.error('Request timeout');
            return Promise.reject(new Error('Request timeout. Please try again.'));
        } else if (!error.response) {
            console.error('Network error');
            return Promise.reject(new Error('Network error. Please check your connection.'));
        }
        return Promise.reject(error);
    }
);

export default api; 