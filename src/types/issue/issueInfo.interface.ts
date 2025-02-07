import { UserInfo } from "@/redux/user/userSlice";

export interface IssueInfo {
  id: string;
  issueTitle: string; // 问题标题
  issueContent: string; // 问题描述
  issuePic: string; // 问题图片
  scanNumber: number; //	问题浏览量
  commentNumber: number; //	评论数
  issueStatus: boolean; //	问题状态
  issueDate: string; //	问题时间
  user: UserInfo;
  userId: string; //	用户 id
  typeId: string; //  所属分类
}
