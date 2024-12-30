import { createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

export interface UserState {
  isLogin: boolean;
  userInfo: UserInfo;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: {},
  },
  reducers: {
    initUserInfo() {},
  },
});

export const { initUserInfo } = userSlice.actions;
export default userSlice.reducer;