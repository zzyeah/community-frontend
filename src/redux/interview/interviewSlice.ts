import { getInterviewTitle } from "@/api/interview/interviews.api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getInterviewTitleAsync = createAsyncThunk(
  "interview/getInterviewTitle",
  async () => {
    const response = await getInterviewTitle();
    return response.data;
  }
);

export interface InterviewState {
  interviewTitleList: any[];
}

export interface InterviewCaseReducers {
  initInterviewTitleList(
    state: InterviewState,
    actions: PayloadAction<any[]>
  ): void;
  [caseName: string]: any;
}

export const InterviewName = "interview";

const InterviewSlice = createSlice<
  InterviewState,
  InterviewCaseReducers,
  typeof InterviewName,
  any
>({
  name: "interview",
  initialState: {
    interviewTitleList: [],
  },
  reducers: {
    initInterviewTitleList(state, action) {
      state.interviewTitleList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInterviewTitleAsync.fulfilled, (state, { payload }) => {
      state.interviewTitleList = payload;
    });
  },
});
export const { initInterviewTitleList } = InterviewSlice.actions;
export default InterviewSlice.reducer;
