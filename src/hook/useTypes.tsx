import { StoreSlices } from "@/redux/store";
import { TypeState } from "@/redux/type/typeSlice";
import { useSelector } from "react-redux";

export function useTypes(): TypeState {
  const typeInfo = useSelector<StoreSlices, TypeState>((state) => state.type);
  return { ...typeInfo };
}
