import axiosClient from './axiosClient';

const memberApi = {
  getAllAccounts: (params) => {
    const url = '/api/members/accounts';
    return axiosClient.get(url, { params });
  },
  login: async (data) => {
    const url = '/api/members/auth';
    const response = await axiosClient.post(url, data);
    const userData = response.data;
    if (userData && userData.token) {
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
    }
    return response; 
  },
  register: async (data) => {
    const url = '/api/members/register';
    const response = await axiosClient.post(url, data);
    return response; 
  },
  getProfile: () => {
    const url = '/api/members/profile';
    return axiosClient.get(url);
  },
  updateProfile: (data) => {
    const url = '/api/members/profile';
    return axiosClient.put(url, data);
  },
  changePassword: (data) => {
    const url = '/api/members/profile/change-password';
    return axiosClient.put(url, data);
  },
};

export default memberApi;
