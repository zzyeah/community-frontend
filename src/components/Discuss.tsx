import { useEffect, useRef, useState } from "react";
import { Button, Form, List, message, Pagination, Tooltip } from "antd";
import { updateUserInfoAsync, UserInfo } from "@/redux/user/userSlice";
import ZyEditor from "./ZyEditor";
import { Editor } from "@toast-ui/react-editor";
import ZyComment from "./ZyComment";
import { useLogin } from "@/hook/useLogin";
import { addComment, getIssueCommentById } from "@/api/comment/comment.api";
import { getUserById } from "@/api/user/user.api";
import { GetIssueCommentByIdResponse } from "@/types/api/comment/getIssueCommentById.response";
import { CommentInfo } from "@/types/comment/commentInfo.interface";
import { formatDate, FormDatePart } from "@/utils/tools";
import ZyAvatar from "./ZyAvatar";
import { useForm } from "antd/es/form/Form";
import { AddCommentRequest } from "@/types/api/comment/addComment.request";
import { CommentTypes } from "@/types/comment/commentTypes.enum";
import { IssueInfo } from "@/types/issue/issueInfo.interface";
import { updateIssue } from "@/api/issue/issue.api";
import { useDispatch } from "react-redux";
import styles from "../styles/Discuss.module.css";

export interface DiscussProps {
  commentType: CommentTypes;
  targetId: string;
  issueInfo?: IssueInfo;
  bookInfo?: IssueInfo;
}

export interface DiscussComment extends CommentInfo {
  userInfo?: UserInfo;
}

/**
 * 评论组件
 */
function Discuss(props: DiscussProps) {
  const { commentType, targetId, issueInfo, bookInfo } = props;
  const { isLogin, userInfo } = useLogin();
  const editorRef = useRef<Editor>(null);
  const [commentForm] = useForm();
  const [discussComments, setDiscussComments] = useState<DiscussComment[]>();
  const [refresh, setRefresh] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    page: 1, // 当前是第一页
    limit: 10, // 每一页显示 10 条数据
    total: 0, // 数据的总条数
  });
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCommentList() {
      let data: GetIssueCommentByIdResponse;
      switch (commentType) {
        case CommentTypes.Issue:
          // Issue Part
          const result = await getIssueCommentById(targetId);
          data = result.data;
          break;
        case CommentTypes.Book:
          // Book Part
          break;
      }
      const commentArr = data.data;
      for (const comment of commentArr) {
        const { userId } = comment;
        const result = await getUserById(userId);
        (comment as DiscussComment).userInfo = result.data;
      }
      setDiscussComments(commentArr);
      setPageInfo({
        page: data.page,
        limit: data.limit,
        total: data.count,
      });
    }

    if (targetId) fetchCommentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetId, isLogin, refresh]);

  function handlePageChange(page: number, pageSize: number) {
    setPageInfo({
      ...pageInfo,
      page,
      limit: pageSize,
    });
  }

  // 根据登陆状态进行头像处理
  function CommentAvatar() {
    return <ZyAvatar src={userInfo?.avatar} />;
  }

  function CommentList() {
    if (!discussComments?.length) return null;
    return (
      <List
        header="当前评论"
        dataSource={discussComments}
        renderItem={(dc, i) => {
          if (!isLogin)
            return <ZyComment content="登录后可查看当前问答评论"></ZyComment>;
          return (
            <li>
              <ZyComment
                avatar={<ZyAvatar src={dc?.userInfo?.avatar} />}
                content={
                  <div
                    dangerouslySetInnerHTML={{ __html: dc?.commentContent }}
                  ></div>
                }
                datetime={
                  <Tooltip
                    title={formatDate(dc.commentDate, FormDatePart.year)}
                  >
                    {formatDate(dc.commentDate, FormDatePart.year)}
                  </Tooltip>
                }
              ></ZyComment>
            </li>
          );
        }}
      />
    );
  }

  function Paginations() {
    if (!discussComments?.length) {
      return (
        <div
          style={{
            fontWeight: "200",
            textAlign: "center",
            margin: "50px",
          }}
        >
          暂无评论
        </div>
      );
    }

    return (
      <div className={styles.paginationContainer}>
        <Pagination
          showQuickJumper
          defaultCurrent={1}
          total={pageInfo.total}
          pageSize={pageInfo.limit}
          current={pageInfo.page}
          onChange={handlePageChange}
        ></Pagination>
      </div>
    );
  }

  function onSubmitComment() {
    let newComment = null;
    const editorInstance = editorRef.current.getInstance();
    switch (commentType) {
      case CommentTypes.Issue:
        newComment = editorInstance.getMarkdown();
        if (newComment !== "") newComment = editorInstance.getHTML();
        break;
      case CommentTypes.Book:
        newComment = editorInstance.getHTML();
        break;
    }
    if (!newComment) {
      message.warning("请输入评论内容");
      return;
    }

    // commit
    // console.log(value);

    const request = new AddCommentRequest();
    let dataInfo: IssueInfo;
    switch (commentType) {
      case CommentTypes.Issue:
        request.issueId = targetId;
        dataInfo = issueInfo;
        break;
      case CommentTypes.Book:
        request.bookId = targetId;
        dataInfo = bookInfo;
        break;
    }
    request.commentContent = newComment;
    request.commentType = commentType;
    request.userId = userInfo.id;
    request.typeId = dataInfo.typeId;
    addComment(request);
    message.success("评论成功");
    setRefresh(!refresh);
    editorRef.current.getInstance().reset();

    // 更新积分计算
    updateIssue(targetId, {
      commentNumber: issueInfo
        ? ++issueInfo.commentNumber
        : ++bookInfo.commentNumber,
    });
    // 更新该问题评论树
    dispatch<any>(
      updateUserInfoAsync({
        userId: userInfo.id,
        newInfo: { points: userInfo.points + 4 },
      })
    );
  }

  return (
    <>
      {/* 评论框 */}
      <ZyComment
        avatar={<CommentAvatar />}
        content={
          <Form form={commentForm} onFinish={onSubmitComment}>
            <Form.Item>
              <ZyEditor ref={editorRef} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                disabled={isLogin ? false : true}
                htmlType="submit"
              >
                添加评论
              </Button>
            </Form.Item>
          </Form>
        }
      />
      {/* 评论列表 */}
      <CommentList />
      {/* 分页 */}
      <Paginations />
    </>
  );
}

export default Discuss;
