import { IssueList } from "@/types/api/issue/getIssueByPage.response";
import React from "react";
import IssueItem from "./IssueItem";

export interface SearchResultItemProps {
  info: IssueList;
}

/**
 * search result item
 * book or issue
 */
function SearchResultItem(props: SearchResultItemProps) {
  const { info } = props;
  return (
    <div>
      {info.issueTitle ? <IssueItem issueInfo={info} /> : <>bookItem</>}
    </div>
  );
}

export default SearchResultItem;
