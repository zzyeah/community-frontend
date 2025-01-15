import React from "react";
import styles from "@styles/PageHeader.module.css";

export interface PageHeaderProps {
  title: string;
}

function PageHeader(props: PageHeaderProps) {
  return (
    <div className={styles.row}>
      <div className={styles.pageHeader}>{props.title}</div>
      {/* 分类选择 */}
    </div>
  );
}

export default PageHeader;
