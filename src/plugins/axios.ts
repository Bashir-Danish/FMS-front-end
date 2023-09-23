import axios from "axios";

import { getToken } from "@/utils/jwt";

const token = getToken();
if (token) {
  axios.defaults.headers.common["Authorization"] = getToken();
} else {
  axios.defaults.headers.common["Authorization"] = "";
}

const _axios = axios.create({
  baseURL: "http://api.kdanish.com/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
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
