export interface IUserCheckPwdRequest {
  id: string;
  loginPwd: string;
}

export class UserCheckPwdRequest implements IUserCheckPwdRequest {
  id: string;
  loginPwd: string;

  constructor(id: string, loginPwd: string) {
    this.id = id;
    this.loginPwd = loginPwd;
  }
}
