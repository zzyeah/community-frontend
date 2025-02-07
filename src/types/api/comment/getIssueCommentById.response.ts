import { CommentInfo } from "@/types/comment/commentInfo.interface";
import { QueryByPageResponse } from "../common/queryByPage.response";

export interface IGetIssueCommentByIdResponse
  extends QueryByPageResponse<CommentInfo> {}

export class GetIssueCommentByIdResponse
  extends QueryByPageResponse<CommentInfo>
  implements IGetIssueCommentByIdResponse {}
