import axios from 'axios';

const baseUrl = 'https://5fc9346b2af77700165ae514.mockapi.io';

axios.interceptors.request.use(
  request => {
    return request;
  },
  async error => {
    return await Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    return await Promise.reject(error);
  },
);

const API = {
  get: async (endpoint: string, params?: object, headers?: object) => {
    const response = await axios.get(endpoint, {
      headers,
      params,
    });

    if (response.data) {
      return response.data;
    } else {
      return false;
    }
  },
  getProducts: async () => {
    return await API.get(`${baseUrl}/products`);
  },
};

export default API;
