import { atom, selector } from "recoil";
import { getStorageSync } from "@tarojs/taro";

export const userState = atom<Record<string, any> | null>({
  key: "userState",
  default: getStorageSync("token") || null,
});

export const isLoggedInState = selector({
  key: "isLoggedInState",
  get: ({ get }) => {
    const user = get(userState);
    return user !== null;
  },
});
