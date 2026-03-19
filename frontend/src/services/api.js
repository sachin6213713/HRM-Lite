import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const employeeService = {
    getAll: () => api.get('/employees'),
    add: (employee) => api.post('/employees', employee),
    delete: (id) => api.delete(`/employees/${id}`),
};

export const attendanceService = {
    mark: (data) => api.post('/attendance', data),
    getByEmployee: (employeeId) => api.get(`/attendance/${employeeId}`),
    getStats: () => api.get('/attendance/stats'),
};

export default api;
