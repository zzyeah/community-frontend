import React, { useEffect, useState } from "react";
import styles from "@/styles/IssueItem.module.css";
import { formatDate, FormDatePart } from "@/utils/tools";
import { useDispatch, useSelector } from "react-redux";
import { Tag } from "antd";
import { getUserById } from "@/api/user";
import { IssueList } from "@/types/api/issue/getIssueByPage.response";
import { getTypeList, TypeState } from "@/redux/type/typeSlice";
import { UserInfo } from "@/redux/user/userSlice";

export interface IssueItemProps {
  issueInfo: IssueList;
}

/**
 * 问答项
 */
function IssueItem(props) {
  const dispatch = useDispatch();
  const { typeList } = useSelector<{ type: TypeState }, TypeState>(
    (state) => state.type
  );
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const colorArr = [
    "#108ee9",
    "#2db7f5",
    "#f50",
    "green",
    "#87d068",
    "blue",
    "red",
    "purple",
  ];

  useEffect(() => {
    if (!typeList.length) {
      dispatch<any>(getTypeList());
    }

    async function fetchData() {
      const { data } = await getUserById(props.issueInfo.userId);
      setUserInfo(data);
    }

    fetchData();
  }, [dispatch, props.issueInfo.userId, typeList.length]);

  return (
    <div className={styles.container}>
      {/* 问答数 */}
      <div className={styles.issueNum}>
        <div>{props.issueInfo.commentNumber}</div>
        <div>回答</div>
      </div>
      {/* 浏览数 */}
      <div className={styles.issueNum}>
        <div>{props.issueInfo.scanNumber}</div>
        <div>浏览</div>
      </div>
      {/* 问题内容 */}
      <div className={styles.issueContainer}>
        <div className={styles.top}>{props.issueInfo.issueTitle}</div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <Tag
              color={
                colorArr[
                  typeList.findIndex(
                    (type) => type.id === props.issueInfo.typeId
                  ) % colorArr.length
                ]
              }
            >
              {props.issueInfo.type.typeName}
            </Tag>
          </div>
          <div className={styles.right}>
            <Tag color="volcano">{userInfo?.name}</Tag>
            <span>
              {formatDate(props.issueInfo.issueDate, FormDatePart.year)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueItem;
