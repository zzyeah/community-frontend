import {
  UserLoginInfo,
  UserLoginInfoBase,
} from "@/types/loginForm/userInfo.interface";

export interface IUserLoginRequest extends UserLoginInfoBase {
  remember: number;
}

export class UserLoginRequest implements IUserLoginRequest {
  loginId: string;
  loginPwd: string;
  captcha: string;
  remember: number;

  constructor({ loginId, loginPwd, captcha, remember }: UserLoginInfo) {
    this.loginId = loginId;
    this.loginPwd = loginPwd;
    this.captcha = captcha;
    this.remember = remember ? 7 : 1;
  }
}
