import axios from 'axios';

const API = axios.create({
  // In production (Vercel), requests go to /api and are rewritten to the backend
  // In development, Vite's proxy handles /api -> localhost:5000
  baseURL: '/api',
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
