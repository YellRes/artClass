import { request } from "@/utils/request";

interface IUserParams {
  name: string;
  password: string;
}

// 登录
export const loginRequest = (params: IUserParams) =>
  request({
    url: "/login",
    method: "POST",
    data: params,
  });

// 注册
export const registerRequest = (params: any) => request(params);
