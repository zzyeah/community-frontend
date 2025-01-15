import {
  IQueryByPageRequest,
  QueryByPageRequest,
} from "../common/queryByPage.request";

export interface IGetIssueByPageRequest extends IQueryByPageRequest {
  issueStatus: boolean;
}

export class GetIssueByPageRequest
  extends QueryByPageRequest
  implements IGetIssueByPageRequest
{
  public issueStatus: boolean;
}
