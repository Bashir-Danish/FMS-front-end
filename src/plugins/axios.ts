import axios from "axios";

const _axios = axios.create({
  baseURL: "https://api.kdanish.com/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
  headers: {
    withCredentials: true,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    credentials: "include",
  },
});

_axios.interceptors.request.use(
  function (config) {
    config.withCredentials = true;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default _axios;
