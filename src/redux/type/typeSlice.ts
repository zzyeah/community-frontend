import { getType } from "@/api/type";
import { TypeInfo } from "@/types/type/typeInfo.interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface TypeState {
  typeList: TypeInfo[];
}

export interface TypeCaseReducers {
  [caseName: string]: any;
}

export const TypeName = "type";

export const getTypeList = createAsyncThunk(
  "type/getTypeList",
  async () => {
    const response = await getType();
    return response.data;
  }
);

const typeSlice = createSlice<
  TypeState,
  TypeCaseReducers,
  typeof TypeName,
  any
>({
  name: TypeName,
  initialState: {
    typeList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTypeList.fulfilled, (state, {payload}) => {
      state.typeList = payload;
    });
  },
});

export default typeSlice.reducer;
