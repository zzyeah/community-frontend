import { Local_Authorization } from "@/types/localStorage/keys.constant";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// request Interceptors
export function requestTokenInterceptor(
  config: InternalAxiosRequestConfig<any>
) {
  const authorization = localStorage.getItem(Local_Authorization);
  if (authorization) {
    config.headers.set("authorization", `Bearer ${authorization}`);
  }
  // 放置token
  return config;
}

export function requestTokenErrorInterceptor(err: any) {
  console.log(`请求拦截出错，错误信息： ${err}`);
}

export function responseTokenInterceptor(response: AxiosResponse<any, any>) {
  const authorization = response.headers["authorization"];
  if (authorization) {
    localStorage.setItem(Local_Authorization, authorization);
  }

  return response.data;
}

export function responseTokenErrorInterceptor(err: any) {
  console.log(`响应拦截出错，错误信息： ${err}`);
}
