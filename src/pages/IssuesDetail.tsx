import { getIssueById } from "@/api/issue";
import { IssueInfo } from "@/types/issue/issueInfo.interface";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "@/styles/IssueDetail.module.css";
import PageHeader from "@/components/PageHeader";
import Recommend from "@/components/Recommend";
import ScoreRank from "@/components/ScoreRank";
import { UserInfo } from "@/redux/user/userSlice";
import { Avatar } from "antd";
import { formatDate } from "@/utils/tools";
import Discuss from "@/components/Discuss";
import { useLogin } from "@/hook/useLogin";
import { CommentTypes } from "@/types/comment/commentTypes.enum";

function IssuesDetail() {
  const { issueId } = useParams();
  const [issueInfo, setIssueInfo] = useState<IssueInfo>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>(null);
  const { isLogin } = useLogin();
  useEffect(() => {
    async function fetchData() {
      const { data: issueInfo } = await getIssueById(issueId);
      setIssueInfo(issueInfo);
      setUserInfo(issueInfo.user);
    }
    fetchData();
  }, [issueId, isLogin]);

  return (
    <div className={styles.container}>
      <PageHeader title="问题详情" />
      <div className={styles.detailContainer}>
        <div className={styles.leftSide}>
          {/* 问答详情 */}
          <div className={styles.question}>
            {/* 标题 */}
            <h1>{issueInfo?.issueTitle}</h1>
            {/* 提问人信息：头像、昵称、提问时间 */}
            <div className={styles.questioner}>
              <Avatar size={"small"} src={userInfo?.avatar} />
              <span className={styles.user}>{userInfo?.name}</span>
              <span>发布于：{formatDate(issueInfo?.issueDate)}</span>
            </div>
            {/* 问题详情 */}
            <div className={styles.content}>
              <div
                dangerouslySetInnerHTML={{ __html: issueInfo?.issueContent }}
              ></div>
            </div>
          </div>
          {/* 评论 */}
          <Discuss commentType={CommentTypes.Issue} targetId={issueId} issueInfo={issueInfo}/>
        </div>
        <div className={styles.rightSide}>
          <div style={{ marginBottom: 20 }}>
            <Recommend />
          </div>
          <div style={{ marginBottom: 20 }}>
            <ScoreRank />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssuesDetail;
