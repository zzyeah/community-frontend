import axios from "axios";

const service = axios.create({
  timeout: 5000,
  method: "GET",
}) ;

// request Interceptors
service.interceptors.request.use(
  (config) => {
    // 放置token
    return config;
  },
  (err) => {
    console.log(`请求拦截出错，错误信息： ${err}`);
  }
);

// response Interceptors
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    console.log(`响应拦截出错，错误信息： ${err}`);
  }
);

export default service;