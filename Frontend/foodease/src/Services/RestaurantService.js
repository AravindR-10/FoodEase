import axiosInstance from "./AxiosConfig";

const API_BASE = '/restaurant';

// Restaurant Endpoints
const createRestaurant = async (restaurantData) => {
  const response = await axiosInstance.post(`${API_BASE}`, restaurantData);
  return response.data;
};

const updateRestaurant = async (id, restaurantData) => {
  const response = await axiosInstance.put(`${API_BASE}/${id}`, restaurantData);
  return response.data;
};

const deleteRestaurant = async (id) => {
  const response = await axiosInstance.delete(`${API_BASE}/${id}`);
  return response.data;
};

const getRestaurantById = async (id) => {
  const response = await axiosInstance.get(`${API_BASE}/${id}`);
  return response.data;
};

const getRestaurantsByOwner = async (ownerId) => {
  const response = await axiosInstance.get(`${API_BASE}/owner/${ownerId}`);
  return response.data;
};

// Menu Item Endpoints
const addMenuItem = async (restaurantId, menuItemData) => {
  const response = await axiosInstance.post(`${API_BASE}/${restaurantId}/menu`, menuItemData);
  return response.data;
};

const updateMenuItem = async (menuItemId, menuItemData) => {
  const response = await axiosInstance.put(`${API_BASE}/menu/${menuItemId}`, menuItemData);
  return response.data;
};

const deleteMenuItem = async (menuItemId) => {
  const response = await axiosInstance.delete(`${API_BASE}/menu/${menuItemId}`);
  return response.data;
};

const getMenuItemsByRestaurant = async (restaurantId) => {
  const response = await axiosInstance.get(`${API_BASE}/${restaurantId}/menu`);
  return response.data;
};

const getMenuItemById = async (menuItemId) => {
  const response = await axiosInstance.get(`${API_BASE}/menu/${menuItemId}`);
  return response.data;
};

// Order Endpoints
const getOrdersByRestaurant = async (restaurantId) => {
  const response = await axiosInstance.get(`${API_BASE}/orders/${restaurantId}`);
  return response.data;
};

const getOrderDetails = async (orderId) => {
  const response = await axiosInstance.get(`${API_BASE}/orders/details/${orderId}`);
  return response.data;
};

// Delivery Endpoint
const createDelivery = async (deliveryData) => {
  const response = await axiosInstance.post(`${API_BASE}/delivery`, deliveryData);
  return response.data;
};

export default {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantById,
  getRestaurantsByOwner,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItemsByRestaurant,
  getMenuItemById,
  getOrdersByRestaurant,
  getOrderDetails,
  createDelivery,
};