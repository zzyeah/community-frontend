import React, { useState } from "react";
import { UserRankInfo } from "./ScoreRank";
import styles from "@/styles/ScoreItem.module.css";
import { Avatar } from "antd";
import classnames from "classnames";

export interface ScoreItemProps {
  rankInfo: UserRankInfo;
  rank: number;
}

function ScoreItem(props: ScoreItemProps) {
  const [classNameCollection] = useState({
    iconfont: true,
    "icon-jiangbei": true,
  });

  function Rank({ rank }: { rank: number }) {
    switch (rank) {
      case 1:
        return (
          <div
            style={{
              color: "#ffda23",
              fontSize: "22px",
            }}
            className={classnames(classNameCollection)}
          ></div>
        );
      case 2:
        return (
          <div
            style={{
              color: "#c5c5c5",
              fontSize: "22px",
            }}
            className={classnames(classNameCollection)}
          ></div>
        );
      case 3:
        return (
          <div
            style={{
              color: "#cd9a62",
              fontSize: "22px",
            }}
            className={classnames(classNameCollection)}
          ></div>
        );
      default:
        return <div className={styles.rank}>{rank}</div>;
    }
  }

  return (
    <div className={styles.container}>
      {/* 名次,头像,昵称 */}
      <div className={styles.left}>
        <Rank rank={props.rank} />
        <div className={styles.avatar}>
          <Avatar src={props.rankInfo.avatar} size={"small"} />
        </div>
        <div className={styles.nickname}>{props.rankInfo.name}</div>
      </div>
      {/* 积分 */}
      <div className={styles.right}>{props.rankInfo.points}</div>
    </div>
  );
}

export default ScoreItem;
