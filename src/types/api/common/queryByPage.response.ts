export interface IQueryByPageResponse<T = any> {
  count: number;
  data: T[];
  limit: number;
  page: number;
  totalPage: number;
}

export class QueryByPageResponse<T> implements IQueryByPageResponse {
  count: number;
  data: T[];
  limit: number;
  page: number;
  totalPage: number;
}
