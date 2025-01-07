import axios from "axios";
import {
  requestTokenErrorInterceptor,
  requestTokenInterceptor,
  responseTokenErrorInterceptor,
  responseTokenInterceptor,
} from "./interceptors/token.interceptor";

const service = axios.create({
  timeout: 5000,
  method: "GET",
});

// request Interceptors
service.interceptors.request.use(
  requestTokenInterceptor,
  requestTokenErrorInterceptor
);

// response Interceptors
service.interceptors.response.use(
  responseTokenInterceptor,
  responseTokenErrorInterceptor
);

export default service;
