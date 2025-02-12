import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "@/styles/SearchPage.module.css";
import PageHeader from "@/components/PageHeader";
import AddIssueBtn from "@/components/AddIssueBtn";
import Recommend from "@/components/Recommend";
import ScoreRank from "@/components/ScoreRank";
import { IQueryByPageRequest } from "@/types/api/common/queryByPage.request";
import { IQueryByPageResponse } from "@/types/api/common/queryByPage.response";
import { GetIssueByPageRequest } from "@/types/api/issue/getIssueByPage.request";
import { getIssueByPage } from "@/api/issue/issue.api";
import { SearchOptions } from "@/types/common/searchOptions.enum";
import { IssueList } from "@/types/api/issue/getIssueByPage.response";
import SearchResultItem from "@/components/SearchResultItem";

export interface searchPageLocationState {
  value: string;
  searchOption: SearchOptions;
}

function SearchPage() {
  const location = useLocation();
  const state: searchPageLocationState = location.state;
  const [searchResult, setSearchResult] = useState<IssueList[]>([]);
  const [pageInfo, setPageInfo] = useState<
    IQueryByPageRequest | IQueryByPageResponse
  >({
    page: 1,
    limit: 10,
    totalPage: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const { value, searchOption } = state;
      const request = new GetIssueByPageRequest();
      request.page = pageInfo.page;
      request.limit = pageInfo.limit;
      request.issueStatus = true;

      switch (searchOption) {
        case SearchOptions.Book:
          break;
        case SearchOptions.Issue:
          request.keyword = value;
          const result = await getIssueByPage(request);
          console.log(result);
          const { data } = result;
          // 更新搜索结果
          setSearchResult(data.data);
          // 更新分页信息
          setPageInfo({
            page: data.page,
            limit: data.limit,
            totalPage: data.totalPage,
          });
          break;
      }
    }
    if (state) {
      fetchData();
    }
  }, [pageInfo.limit, pageInfo.page, state]);

  function LeftSide() {
    return searchResult.map((result) => (
      <SearchResultItem info={result} key={result.id} />
    ));
  }

  return (
    <div className="container">
      <PageHeader title="搜索结果" />
      <div className={styles.searchPageContainer}>
        {/* left */}
        <div className={styles.leftSide}>
          <LeftSide />
        </div>
        {/* right */}
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

export default SearchPage;
