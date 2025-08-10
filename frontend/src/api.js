import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // FastAPI backend URL

//  Secure In-Memory Token Storage 
// Storing JWTs in a variable provides better protection against XSS attacks
// compared to localStorage. An attacker with an XSS vulnerability cannot directly
// access this variable's scope to steal the token.
// Note: This token will be lost on page refresh, which is a security trade-off.
// For persistence, a backend-driven approach with HttpOnly cookies is recommended.
let inMemoryToken = null;

const setAuthToken = (token) => {
  inMemoryToken = token;
};

const getAuthToken = () => {
  return inMemoryToken;
};

// Logout function to clear the in-memory token
export const logout = () => {
  inMemoryToken = null;
  // If the backend supports it, you might want to call a logout endpoint here
  // to invalidate the token on the server side.
};

// Signup
export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
};

// Login
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  // Securely store the token in memory instead of localStorage
  if (response.data.access_token) {
    setAuthToken(response.data.access_token);
  }
  return response.data;
};

// Upload Image
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_URL}/images/upload-image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Retrieve token from secure in-memory storage
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  return response.data;
};

// Analyze Image
export const analyzeImage = async (imagePath) => {
  const response = await axios.get(`${API_URL}/analysis/${imagePath}`, {
    headers: {
      // Retrieve token from secure in-memory storage
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  return response.data;
};