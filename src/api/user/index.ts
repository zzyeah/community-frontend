import { UserInfo } from "@/redux/user/userSlice";
import apiCall from "../request";
import { IUserLoginRequest } from "@/types/api/user/userLogin.request";
import { IUserRegisterRequest } from "@/types/api/user/userRegister.request";
import { IWhoamiResponse } from "@/types/api/user/whoami.response";
import { CommonResponse } from "@/types/api/common/common.response";
import { GetUserByPointsRankResponse } from "@/types/api/user/getUserByPointsRank.response";

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

export function register(
  registerInfo: IUserRegisterRequest
): Promise<CommonResponse<UserInfo>> {
  return apiCall({
    url: "/api/user",
    method: "POST",
    data: registerInfo,
  });
}

export function login(
  loginInfo: IUserLoginRequest
): Promise<CommonResponse<UserInfo>> {
  return apiCall({
    url: "/api/user/login",
    method: "POST",
    data: loginInfo,
  });
}

export function getUserById(id: string): Promise<CommonResponse<UserInfo>> {
  return apiCall({
    url: `/api/user/${id}`,
  });
}

export function getInfo(): Promise<CommonResponse<IWhoamiResponse>> {
  return apiCall({
    url: "/api/user/whoami",
  });
}

/**
 * 获取积分前十的用户
 */
export function getUserByPointsRank(): Promise<
  CommonResponse<GetUserByPointsRankResponse>
> {
  return apiCall({
    url: "/api/user/pointsRank",
  });
}
