import { editUser } from "@/api/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  id: string;
  loginId: string; // 账号
  name: string; // 昵称
  avatar: string; // 头像
  permission?: number; // 暂时不需要权限
  mail?: string; // 邮箱
  qq?: string; // QQ
  wechat?: string; // 微信号
  intro?: string; // 个人介绍
  registerDate: number; // 注册时间
  lastLoginDate: number; // 上次登录事件
  points: number; // 积分
  enabled: number; // 是否可用
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
export const updateUserInfoAsync = createAsyncThunk(
  `${UserName}/editUser`,
  async (payload: { userId: string; newInfo: Partial<UserInfo> }) => {
    const { newInfo, userId } = payload;
    const result = await editUser(userId, newInfo);
    return result.data;
  }
);

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
    // 更新用户信息
    updateUserInfo: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserInfoAsync.fulfilled, (state, { payload }) => {
      console.log(state);
      console.log(payload);
      state.userInfo = payload;
    });
  },
});

export const {
  initUserInfo,
  changeLoginStatus,
  clearUserInfo,
  updateUserInfo,
} = userSlice.actions;
export default userSlice.reducer;
