import { getType } from "@/api/type";
import { TypeInfo } from "@/types/type/typeInfo.interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum TypeId {
  All = "all",
}

export interface TypeState {
  typeList: TypeInfo[];
  issueTypeId: TypeId | string;
  bookTypeId: TypeId | string;
}

export interface TypeCaseReducers {
  updateIssueTypeId(state: TypeState, actions: PayloadAction<string>): void;
  updateBookTypeId(state: TypeState, actions: PayloadAction<string>): void;
  [caseName: string]: any;
}

export const TypeName = "type";

export const getTypeList = createAsyncThunk("type/getTypeList", async () => {
  const response = await getType();
  return response.data;
});

const typeSlice = createSlice<
  TypeState,
  TypeCaseReducers,
  typeof TypeName,
  any
>({
  name: TypeName,
  initialState: {
    typeList: [],
    issueTypeId: TypeId.All,
    bookTypeId: TypeId.All,
  },
  reducers: {
    updateIssueTypeId(state, { payload }) {
      state.issueTypeId = payload;
    },
    updateBookTypeId(state, { payload }) {
      state.bookTypeId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTypeList.fulfilled, (state, { payload }) => {
      state.typeList = payload;
    });
  },
});
export const { updateBookTypeId, updateIssueTypeId } = typeSlice.actions;
export default typeSlice.reducer;
