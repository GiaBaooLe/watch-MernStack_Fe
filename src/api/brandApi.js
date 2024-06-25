// brandApi.js
import axiosClient from './axiosClient';

const brandApi = {
  getAllBrand(params) {
    const url = '/api/brands';
    return axiosClient.get(url, { params });
  },
  addBrand(data) {
    const url = '/api/brands';
    return axiosClient.post(url, data);
  },
  updateBrand(data) {
    const url = `/api/brands/${data.id}`;
    return axiosClient.put(url, data);
  },
  deleteBrand(id) {
    const url = `/api/brands/${id}`;
    return axiosClient.delete(url);
  }
};

export default brandApi;
