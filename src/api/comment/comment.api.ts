import apiCall from "../request";
import { GetIssueCommentByIdResponse } from "@/types/api/comment/getIssueCommentById.response";
import { CommonResponse } from "@/types/api/common/common.response";
import { AddCommentRequest } from "@/types/api/comment/addComment.request";

export function getIssueCommentById(
  id: string,
): Promise<CommonResponse<GetIssueCommentByIdResponse>> {
  return apiCall({
    url: `/api/comment/issuecomment/${id}`,
  });
}

/**
 * 提交评论
 */
export function addComment(newComment: AddCommentRequest) {
  return apiCall({
    method: 'POST',
    url: "/api/comment",
    data: newComment,
  });
}
