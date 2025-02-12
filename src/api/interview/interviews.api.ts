import { CommonResponse } from "@/types/api/common/common.response";
import apiCall from "../request";
import { InterviewItem } from "@/types/interview/interviewItem.interface";

export const InterviewApiPath = "/api/interview";

export function getInterviewTitle() {
  return apiCall({
    url: `${InterviewApiPath}/interviewTitle`,
  });
}

export function getInterviewById(id: string): Promise<CommonResponse<InterviewItem>> {
  return apiCall({
    url: `${InterviewApiPath}/${id}`,
  });
}
