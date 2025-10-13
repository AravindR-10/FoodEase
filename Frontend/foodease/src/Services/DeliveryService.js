import axiosInstance from './AxiosConfig';

const API_BASE = '/delivery';

const getDeliveriesByPartner = async (partnerId) => {
  const response = await axiosInstance.get(`${API_BASE}/partner/${partnerId}`);
  return response.data;
};

export default {
  getDeliveriesByPartner,
};
