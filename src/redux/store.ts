import { configureStore } from "@reduxjs/toolkit";
import user from "./user/userSlice";
import type from "./type/typeSlice";

export default configureStore({
  reducer: {
    user,
    type,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
