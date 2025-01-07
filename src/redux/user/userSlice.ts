import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  id: number;
  enabled: number;
  name: string;
  avatar: string;
  loginId: string;
}

export interface UserState {
  isLogin: boolean;
  userInfo?: UserInfo;
}

export interface UserCaseReducers {
  initUserInfo: (state: UserState, action: PayloadAction<UserInfo>) => void;
  changeLoginStatus: (state: UserState, action: PayloadAction<boolean>) => void;
  clearUserInfo: (state: UserState) => void;
  [caseName: string]: any;
}

export const UserName = "user";

const userSlice = createSlice<
  UserState,
  UserCaseReducers,
  typeof UserName,
  any
>({
  name: UserName,
  initialState: {
    isLogin: false,
    userInfo: null,
  },
  reducers: {
    // 初始化用户信息
    initUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    // 修改用户登录状态
    changeLoginStatus: (state, { payload }) => {
      state.isLogin = payload;
    },
    // 清除用户信息
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
  },
});

export const { initUserInfo, changeLoginStatus, clearUserInfo } =
  userSlice.actions;
export default userSlice.reducer;
