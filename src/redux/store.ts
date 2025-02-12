import { configureStore } from "@reduxjs/toolkit";
import user, { UserState } from "./user/userSlice";
import type, { TypeState } from "./type/typeSlice";
import interview from "./interview/interviewSlice";

export interface StoreSlices{
  user: UserState;
  type: TypeState;
  interview: any;
}

export default configureStore<StoreSlices>({
  reducer: {
    user,
    type,
    interview
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
