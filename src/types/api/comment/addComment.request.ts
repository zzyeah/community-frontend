import { CommentInfo } from "@/types/comment/commentInfo.interface";
import { CommentTypes } from "@/types/comment/commentTypes.enum";

export type IAddCommentRequest = Omit<CommentInfo, "commentDate">;

export class AddCommentRequest implements IAddCommentRequest {
  userId: string;
  issueId?: string;
  bookId?: string;
  typeId: string;
  commentContent: string;
  commentType: CommentTypes
}
