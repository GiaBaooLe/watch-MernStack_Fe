import axiosClient from './axiosClient';

const watchApi = {
  getAllWatch(params) {
    const url = '/api/watches';
    return axiosClient.get(url, { params });
  },
  getDetailWatch(id) {
    const url = `/api/watches/${id}`;
    return axiosClient.get(url);
  },
  addWatch(data) {
    const url = '/api/watches';
    return axiosClient.post(url, data);
  },
  updateWatch(data) {
    const url = `/api/watches/${data.id}`;
    return axiosClient.put(url, data);
  },
  deleteWatch(id) {
    const url = `/api/watches/${id}`;
    return axiosClient.delete(url);
  },
  addComment(watchId, data) {
    const url = `/api/watches/${watchId}/comments`;
    return axiosClient.post(url, data);
  }
};

export default watchApi;
