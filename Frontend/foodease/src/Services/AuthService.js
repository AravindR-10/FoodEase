import axiosInstance from "./AxiosConfig";

const AuthService = {
  login: async (email, password) => {
    return axiosInstance.post('/auth/login', { email, password });
  },

  register: async (userData) => {
    return axiosInstance.post('/auth/register', userData);
  },

  getCurrentUserRole: () => localStorage.getItem('userRole'),

  getCurrentUserId: () => localStorage.getItem('userId'),

  getToken: () => localStorage.getItem('jwtToken'),

  logout: () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  },
};

export default AuthService;