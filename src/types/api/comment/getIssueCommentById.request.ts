import {
  IQueryByPageRequest,
  QueryByPageRequest,
} from "../common/queryByPage.request";

export interface IGetIssueCommentByIdRequest extends IQueryByPageRequest {}

export class GetIssueCommentByIdRequest
  extends QueryByPageRequest
  implements IGetIssueCommentByIdRequest {}
