import apiCall from "../request";

/**
 * 获取所有的类型
 */
export function getType() {
  return apiCall({
    url: "/api/type",
  });
}
