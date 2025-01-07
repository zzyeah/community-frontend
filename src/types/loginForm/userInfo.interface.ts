export interface IBaseInfo {
  loginId: string;
  captcha: string;
}

export interface UserLoginInfoBase extends IBaseInfo {
  loginPwd: string;
}

export interface UserLoginInfo extends UserLoginInfoBase {
  remember: boolean;
}

export interface UserRegisterInfo extends IBaseInfo {
  nickname: string;
}
