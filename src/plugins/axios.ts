import axios from "axios";
import { getToken } from "@/utils/jwt";

const _axios = axios.create({
  baseURL: "http://api.kdanish.com/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

_axios.interceptors.request.use(
  function (config) {
    const token = getToken();

    if (token) {
      config.headers["Authorization"] = token;
    } else {
      delete config.headers["Authorization"];
    }

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
