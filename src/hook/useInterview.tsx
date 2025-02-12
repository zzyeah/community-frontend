import { InterviewState } from "@/redux/interview/interviewSlice";
import { StoreSlices } from "@/redux/store";
import { useSelector } from "react-redux";

export function useInterview() {
  const interviewInfo = useSelector<StoreSlices, InterviewState>(
    (state) => state.interview
  );
  return { ...interviewInfo };
}
