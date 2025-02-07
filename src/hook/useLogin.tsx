import { StoreSlices } from "@/redux/store";
import { UserState } from "@/redux/user/userSlice";
import { useSelector } from "react-redux";

export function useLogin(): UserState {
  const loginInfo = useSelector<StoreSlices, UserState>((state) => state.user);
  return { ...loginInfo };
}
