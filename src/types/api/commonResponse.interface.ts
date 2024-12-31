export interface CommonResponse<T extends any = any> {
  code: number;
  msg: string;
  data: T;
}
