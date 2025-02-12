import { getUserByPointsRank } from "@/api/user/user.api";
import React, { useEffect, useState } from "react";
import ScoreItem from "./ScoreItem";
import { UserPointsRankInfo } from "@/types/api/user/getUserByPointsRank.response";
import { Card } from "antd";
import { useLogin } from "@/hook/useLogin";

export type UserRankInfo = UserPointsRankInfo;

function ScoreRank() {
  // 用户排名信息
  const [userRankInfo, setUserRankInfo] = useState<UserRankInfo[]>([]);
  const { isLogin, userInfo } = useLogin();

  useEffect(() => {
    async function fetchData() {
      const { data } = await getUserByPointsRank();
      setUserRankInfo(data);
    }
    fetchData();
  }, [isLogin, userInfo?.points]);

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
