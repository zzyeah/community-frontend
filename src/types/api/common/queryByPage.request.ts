export interface IQueryByPageRequest {
  /**
   * 分类id，默认-1
   */
  typeId?: string;
  /**
   * 查询关键字，默认空字符串
   */
  keyword?: string;
  /**
   * 页容量，默认10
   */
  limit?: number;
  /**
   * 页码，默认1
   */
  page?: number;
}

export class QueryByPageRequest implements QueryByPageRequest {
  public typeId?: string;
  public keyword?: string;
  public limit?: number;
  public page?: number;
}
