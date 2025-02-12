import { GetIssueByPageRequest } from "@/types/api/issue/getIssueByPage.request";
import apiCall from "../request";
import { GetIssueByPageResponse } from "@/types/api/issue/getIssueByPage.response";
import { CommonResponse } from "@/types/api/common/common.response";
import { AddIssueRequest } from "@/types/api/addIssue/addIssue.request";
import { IssueInfo } from "@/types/issue/issueInfo.interface";

/**
 * 分页获取问答
 */
export function getIssueByPage(
  params: GetIssueByPageRequest
): Promise<CommonResponse<GetIssueByPageResponse>> {
  return apiCall({
    url: "/api/issue",
    params,
  });
}

/**
 * 新增问答
 */
export function addIssue(newIssue: AddIssueRequest) {
  return apiCall({
    url: "/api/issue",
    method: "POST",
    data: newIssue,
  });
}

/**
 * 根据 id 获取问答题的详情
 */
export function getIssueById(
  issueId: string
): Promise<CommonResponse<IssueInfo>> {
  return apiCall({
    url: `/api/issue/${issueId}`,
  });
}

/**
 * 更新问答
 */
export function updateIssue(issueId: string, newIssueInfo: Partial<IssueInfo>) {
  return apiCall({
    url: `/api/issue/${issueId}`,
    method: "PATCH",
    data: newIssueInfo,
  });
}
