import { GetIssueByPageRequest } from "@/types/api/issue/getIssueByPage.request";
import apiCall from "../request";
import { GetIssueByPageResponse } from "@/types/api/issue/getIssueByPage.response";
import { CommonResponse } from "@/types/api/common/common.response";

/**
 * 分页获取问答
 */
export function getIssueByPage(
  params: GetIssueByPageRequest
): Promise<CommonResponse<GetIssueByPageResponse>> {
  return apiCall({
    url: "/api/issue",
    params: {
      ...params,
    },
  });
}
