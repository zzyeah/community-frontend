import { UserRegisterInfo } from "@/types/loginForm/userInfo.interface";

export interface IUserRegisterRequest {
  loginId: string;
  loginPwd: string;
  name: string;
  captcha: string;
  avatar?: string;
}

export class UserRegisterRequest implements IUserRegisterRequest {
  public loginId: string;
  public loginPwd: string;
  public name: string;
  public captcha: string;
  public avatar?: string;
  constructor(registerInfo: UserRegisterInfo) {
    this.loginId = registerInfo.loginId;
    this.loginPwd = "123456";
    this.name = registerInfo.nickname;
    this.captcha = registerInfo.captcha;
    this.avatar = null;
  }
}
