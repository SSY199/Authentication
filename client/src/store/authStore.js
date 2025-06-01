import { create } from 'zustand';
import axios from 'axios';

const API_URL = "http://localhost:3000/api/auth";
axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name
      });
      set({ user: response.data.user, isAuthenticated: true, loading: false, error: null });
      
    } catch (error) {
      console.error('Signup error:', error);
      set({ error: error.response?.data?.message || 'Signup failed', loading: false });
      throw error;
    }
  },
  verifyEmail: async (code) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({ user: response.data.user, isAuthenticated: true, loading: false, error: null });
      return response.data; // Return user data for further processing if needed
    } catch (error) {
      console.error('Email verification error:', error);
      set({ error: error.response?.data?.message || 'Email verification failed', loading: false });
      throw error;
    }
  },
login: async (email, password) => {
  set({ loading: true, error: null });
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    set({ user: response.data.user, isAuthenticated: true, loading: false, error: null });
  } catch (error) {
    console.error('Login error:', error);
    set({ error: error.response?.data?.message || 'Login failed', loading: false });
    throw error;
  }
},
logout: async () => {
  set({ loading: true, error: null });
  try {
    await axios.post(`${API_URL}/logout`);
    set({ user: null, isAuthenticated: false, loading: false, error: null });
  } catch (error) {
    console.error('Logout error:', error);
    set({ error: error.response?.data?.message || 'Logout failed', loading: false });
    throw error;
  }
},     
  checkAuth: async () => {
    //await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay for better UX
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false, error: null });
    } catch (error) {
      console.error('Check auth error:', error);
      set({ error: null, isCheckingAuth: false, isAuthenticated: false, user: null });
    }
  },
  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      set({ message: response.data.message , loading: false, error: null });
      return response.data; // Return success message for further processing if needed
       
    } catch (error) {
      console.error('Forgot password error:', error);
      set({ error: error.response?.data?.message || 'Forgot password failed', loading: false });
      throw error;
    }
  },
  resetPassword: async (token, newPassword) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password: newPassword });
      set({ user: response.data.user, message: response.data.message, isAuthenticated: true, loading: false, error: null });
      return response.data; // Return user data for further processing if needed
    } catch (error) {
      console.error('Reset password error:', error);
      set({ error: error.response?.data?.message || 'Reset password failed', loading: false });
      throw error;
    }
  }
}));