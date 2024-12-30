import { AxiosResponse } from "axios";
import apiCall from "../request";

export function getCaptcha(): Promise<AxiosResponse<any, any>['data']>  {
  return apiCall({
    url: "/res/captcha",
  });
}
