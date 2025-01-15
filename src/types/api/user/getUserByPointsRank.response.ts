import { UserInfo } from "@/redux/user/userSlice";

export type UserPointsRankInfo = Pick<UserInfo, "id" | "name" | "points" | "avatar">
export type GetUserByPointsRankResponse = UserPointsRankInfo[];