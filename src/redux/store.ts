import { configureStore } from "@reduxjs/toolkit";
import user, { UserState } from "./user/userSlice";
import type, { TypeState } from "./type/typeSlice";

export interface StoreSlices{
  user: UserState;
  type: TypeState;
}

export default configureStore<StoreSlices>({
  reducer: {
    user,
    type,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
