import api from './client';

// Products API
export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Auth API
export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  register: (data) =>
    api.post('/auth/register', data),
  logout: () =>
    api.post('/auth/logout'),
  profile: () =>
    api.get('/auth/profile'),
};

// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

// Analytics API
export const analyticsAPI = {
  getStats: () => api.get('/analytics/stats'),
  getRevenue: () => api.get('/analytics/revenue'),
};
