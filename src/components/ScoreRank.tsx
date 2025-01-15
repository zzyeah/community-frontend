import { getUserByPointsRank } from "@/api/user";
import React, { useEffect, useState } from "react";
import ScoreItem from "./ScoreItem";
import { UserPointsRankInfo } from "@/types/api/user/getUserByPointsRank.response";
import { Card } from "antd";

export type UserRankInfo = UserPointsRankInfo;

function ScoreRank() {
  // 用户排名信息
  const [userRankInfo, setUserRankInfo] = useState<UserRankInfo[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getUserByPointsRank();
      setUserRankInfo(data);
    }
    fetchData();
  }, []);

  function UserPointsRank() {
    return userRankInfo.map((rankInfo, index) => {
      return (
        <ScoreItem rankInfo={rankInfo} rank={index + 1} key={rankInfo.id} />
      );
    });
  }

  return (
    <Card title="积分排行榜">
      <UserPointsRank />
    </Card>
  );
}

export default ScoreRank;
