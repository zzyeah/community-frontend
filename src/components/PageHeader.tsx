import React from "react";
import styles from "@styles/PageHeader.module.css";

export interface PageHeaderProps {
  title: string;
  children?: JSX.Element;
}

function PageHeader(props: PageHeaderProps) {
  const { title, children } = props;
  return (
    <div className={styles.row}>
      <div className={styles.pageHeader}>{title}</div>
      {/* 分类选择 */}
      {children}
    </div>
  );
}

export default PageHeader;
