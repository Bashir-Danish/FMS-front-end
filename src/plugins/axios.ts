

import axios from "axios";
import {getToken} from '@/utils/jwt'


const _axios = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",    
  },
});

const token = getToken();
if (token) {
  _axios.defaults.headers.common["Authorization"] = token;
} else {
  _axios.defaults.headers.common["Authorization"] = "";
}

// _axios.interceptors.request.use(
//   (config) => {
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


// _axios.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     // if (error.response?.status === 401) {
//     // } else if (error.response?.status === 404) {
//     // }
//     return Promise.reject(error);
//   }
// );


_axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {

  return Promise.reject(error);
});


_axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  
  return Promise.reject(error);
});
export default _axios;
