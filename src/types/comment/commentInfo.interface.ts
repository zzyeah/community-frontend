import { CommentTypes } from "./commentTypes.enum";

export interface CommentInfo {
  userId: string;
  issueId?: string;
  bookId?: string;
  typeId: string;
  commentContent: string; // 对应评论
  commentDate: string; // 评论日期
  commentType: CommentTypes; // 评论类型
}
