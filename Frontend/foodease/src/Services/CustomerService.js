import axiosInstance from "./AxiosConfig";

const API_BASE = '/customer';

  const getAllRestaurants = async () => {
    const response = await axiosInstance.get(`${API_BASE}/restaurants`);
    return response.data;
  };

  const getRestaurantById = async (id) => {
    const response = await axiosInstance.get(`${API_BASE}/${id}`);
    return response.data;
  };

  const getMenuItemsByRestaurant = async (restaurantId) => {
    const response = await axiosInstance.get(`${API_BASE}/restaurants/${restaurantId}/menu`);
    return response.data;
  };

  const placeOrder = async (orderDTO) => {
    const response = await axiosInstance.post(`${API_BASE}/orders/place`, orderDTO);
    return response.data;
  };

  const getOrdersByCustomer = async (customerId) => {
    const response = await axiosInstance.get(`${API_BASE}/orders/${customerId}`);
    return response.data;
  };

  const getOrderDetails = async (orderId) => {
    const response = await axiosInstance.get(`${API_BASE}/orders/details/${orderId}`);
    return response.data;
  };

  const makePayment = async (paymentDTO) => {
    const response = await axiosInstance.post(`${API_BASE}/payments`, paymentDTO);
    return response.data;
  };

  const getPaymentByOrder = async (orderId) => {
    const response = await axiosInstance.get(`${API_BASE}/payments/${orderId}`);
    return response.data;
  };

  const getDeliveryStatus = async (orderId) => {
    const response = await axiosInstance.get(`${API_BASE}/delivery-status/${orderId}`);
    return response.data;
  };

export default {

    getAllRestaurants,
    getRestaurantById,
    getMenuItemsByRestaurant,
    placeOrder,
    getOrdersByCustomer,
    getOrderDetails,
    makePayment,
    getPaymentByOrder,
    getDeliveryStatus

};