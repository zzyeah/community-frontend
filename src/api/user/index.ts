import apiCall from "../request";
import { CommonResponse } from "@/types/api/commonResponse.interface";
import { IUserRegisterRequest } from "@/types/api/user/userRegister.request";

export function getCaptcha(): Promise<string> {
  return apiCall({
    url: "/res/captcha",
  });
}

export function userIsExist(loginId: string): Promise<CommonResponse<boolean>> {
  return apiCall({
    url: `/api/user/userIsExist/${loginId}`,
  });
}

export function register(registerInfo: IUserRegisterRequest): Promise<CommonResponse<string>> {
  return apiCall({
    url: "/api/user",
    method: "POST",
    data: registerInfo,
  });
}