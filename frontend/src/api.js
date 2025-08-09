import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // FastAPI backend URL

// Security Enhancement: Store the token in-memory to prevent XSS attacks
// from accessing it via localStorage. The token will be lost on page refresh,
// requiring the user to log in again. This is a security trade-off for
// enhanced protection against token theft.
let inMemoryToken = null;

// Create an axios instance to apply interceptors
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Use an interceptor to automatically add the Authorization header
// to every request if a token exists. This centralizes the logic.
axiosInstance.interceptors.request.use(
  (config) => {
    if (inMemoryToken) {
      config.headers['Authorization'] = `Bearer ${inMemoryToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Signup
export const signup = async (userData) => {
  const response = await axiosInstance.post(`/auth/signup`, userData);
  return response.data;
};

// Login
export const login = async (userData) => {
  const response = await axiosInstance.post(`/auth/login`, userData);
  // Store token in the in-memory variable instead of localStorage
  inMemoryToken = response.data.access_token;
  return response.data;
};

// Logout function to clear the in-memory token
export const logout = () => {
    inMemoryToken = null;
    // Example: Redirect user after logout
    // window.location.href = '/login';
};

// Upload Image
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  // The Authorization header is now added automatically by the interceptor
  const response = await axiosInstance.post(`/images/upload-image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Analyze Image
export const analyzeImage = async (imagePath) => {
  // The Authorization header is now added automatically by the interceptor
  const response = await axiosInstance.get(`/analysis/${imagePath}`);
  return response.data;
};
