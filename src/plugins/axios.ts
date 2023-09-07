

import axios from "axios";

axios.defaults.withCredentials = true
const _axios = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",    
    withCredentials: true, credentials: 'include'}
  ,
});



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
  config.withCredentials = true;
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
