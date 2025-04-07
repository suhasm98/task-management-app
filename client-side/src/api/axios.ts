import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // change this to your backend URL
  withCredentials: true,
});

// Add token to every request (if exists)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
