import React from "react";
import styles from "../styles/RecommendItem.module.css";

export interface RecommendItemProps {
  recommendInfo: {
    num: number;
    title: string;
    href: string;
  };
}
function RecommendItem(props) {
  return (
    <a
      className={styles.container}
      href={props.recommendInfo.href}
      target="_blank"
      rel="noreferrer"
    >
      <div className={styles.leftSide}>{props.recommendInfo.num}</div>
      <div className={styles.rightSide}>{props.recommendInfo.title}</div>
    </a>
  );
}

export default RecommendItem;
