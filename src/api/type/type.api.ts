import { TypeInfo } from "@/types/type/typeInfo.interface";
import apiCall from "../request";
import { CommonResponse } from "@/types/api/common/common.response";

/**
 * 获取所有的类型
 */
export function getType(): Promise<CommonResponse<TypeInfo[]>> {
  return apiCall({
    url: "/api/type",
  });
}
