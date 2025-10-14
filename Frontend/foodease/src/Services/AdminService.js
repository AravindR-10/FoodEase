import axiosInstance from './AxiosConfig';

const API_BASE = '/admin';

const getAdminStats = async () => {
  const response = await axiosInstance.get(`${API_BASE}/stats`);
  return response.data;
};

const getAllUsers = async () => {
  const response = await axiosInstance.get(`${API_BASE}/users`);
  return response.data;
};

const getUsersByRole = async (role) => {
  const response = await axiosInstance.get(`${API_BASE}/users/role/${role}`);
  return response.data;
};

const getAllRestaurants = async () => {
  const response = await axiosInstance.get(`${API_BASE}/restaurants`);
  return response.data;
};

const getAllDeliveries = async () => {
  const response = await axiosInstance.get(`${API_BASE}/deliveries`);
  return response.data;
};

export default {
  getAdminStats,
  getAllUsers,
  getUsersByRole,
  getAllRestaurants,
  getAllDeliveries,
};