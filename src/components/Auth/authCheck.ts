import { atom, selector } from "recoil";

export const userState = atom({
  key: "userState",
  default: null,
});

export const isLoggedInState = selector({
  key: "isLoggedInState",
  get: ({ get }) => {
    const user = get(userState);
    return user !== null;
  },
});
