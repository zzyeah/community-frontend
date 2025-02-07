import { IssueInfo } from "@/types/issue/issueInfo.interface";
import { TypeInfo } from "@/types/type/typeInfo.interface";

export interface IssueList extends IssueInfo {
  type: TypeInfo;
}

export interface GetIssueByPageResponse {
  data: IssueList[];
  count: number;
  totalPage: number;
  page: number;
  limit: number;
}
