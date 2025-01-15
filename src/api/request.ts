import axios from "axios";
import {
  requestTokenErrorInterceptor,
  requestTokenInterceptor,
  responseTokenErrorInterceptor,
  responseTokenInterceptor,
} from "./interceptors/token.interceptor";

const apiCall = axios.create({
  timeout: 5000,
  method: "GET",
});

// request Interceptors
apiCall.interceptors.request.use(
  requestTokenInterceptor,
  requestTokenErrorInterceptor
);

// response Interceptors
apiCall.interceptors.response.use(
  responseTokenInterceptor,
  responseTokenErrorInterceptor
);

export default apiCall;
