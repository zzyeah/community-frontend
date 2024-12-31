export interface IBaseInfo {
    loginId: string;
    captcha: string;
  }
  
  export interface LoginInfo extends IBaseInfo {
    loginPwd: string;
    remember: boolean;
  }
  
  export interface RegisterInfo extends IBaseInfo {
    nickname: string;
  }
  