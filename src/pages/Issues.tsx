import React, { useEffect, useState } from "react";
import styles from "@styles/Issue.module.css";
import PageHeader from "@/components/PageHeader";
import { IQueryByPageRequest } from "@/types/api/common/queryByPage.request";
import { getIssueByPage } from "@/api/issue";
import { GetIssueByPageRequest } from "@/types/api/issue/getIssueByPage.request";
import { IssueList } from "@/types/api/issue/getIssueByPage.response";
import IssueItem from "@/components/IssueItem";
import { Pagination } from "antd";
import AddIssueBtn from "@/components/AddIssueBtn";
import Recommend from "@/components/Recommend";
import ScoreRank from "@/components/ScoreRank";
import TypeSelect from "@/components/TypeSelect";
import { useTypes } from "@/hook/useTypes";
import { TypeId } from "@/redux/type/typeSlice";

export interface IssuesProps {}

export interface IssueQueryByPageRequest extends IQueryByPageRequest {
  total: number;
}

function Issues(props: IssuesProps) {
  /**
   * 状态列表
   */
  const [issueInfo, setIssueInfo] = useState<IssueList[]>([]);
  const { issueTypeId } = useTypes();

  /**
   * 分页信息
   */
  const [pageInfo, setPageInfo] = useState<IssueQueryByPageRequest>({
    page: 1,
    limit: 15,
    // limit: 1,
    total: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const request = new GetIssueByPageRequest();
      request.page = pageInfo.page;
      request.limit = pageInfo.limit;
      request.issueStatus = true;

      if (issueTypeId !== TypeId.All) {
        request.typeId = issueTypeId;
        // 如果按分类进行查询，需要将当前页改为第一页
        request.page = 1;
      }

      const result = await getIssueByPage(request);
      const { data } = result;
      setIssueInfo(data.data);
      setPageInfo({
        page: data.page,
        limit: data.limit,
        total: data.count,
      });
    }
    fetchData();
  }, [pageInfo.page, pageInfo.limit, issueTypeId]);

  function handlePageChange(page: number, pageSize: number) {
    setPageInfo({
      ...pageInfo,
      page,
      limit: pageSize,
    });
  }

  function IssueList() {
    return issueInfo.map((issue) => {
      return <IssueItem key={issue.id} issueInfo={issue} />;
    });
  }

  function IssuePagination() {
    if (issueInfo?.length > 0) {
      return (
        <div className="paginationContainer">
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            total={pageInfo.total}
            pageSize={pageInfo.limit}
            current={pageInfo.page}
            onChange={handlePageChange}
            // pageSizeOptions={[5, 10, 15]}
            // showSizeChanger
          />
        </div>
      );
    } else {
      return <div className={styles.noIssue}>有问题，就来 coder station</div>;
    }
  }

  return (
    <div className={styles.container}>
      <PageHeader title="问答列表">
        <TypeSelect />
      </PageHeader>
      {/* 内容区域 */}
      <div className={styles.issueContainer}>
        {/* 左边区域 */}
        <div className={styles.leftSide}>
          <IssueList />
          <IssuePagination />
        </div>
        {/* 右边区域 */}
        <div className={styles.rightSide}>
          <AddIssueBtn />
          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <Recommend />
          </div>
          <ScoreRank />
        </div>
      </div>
    </div>
  );
}

export default Issues;
