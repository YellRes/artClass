import { request } from "@/utils/request";

interface IUserParams {
  name: string;
  password: string;
}

interface LoginResponse {
  status: number;
  name: string;
  token: string;
  nickname: string;
  email: string;
}

// 登录
export const loginRequest = (params: IUserParams) =>
  request<LoginResponse>({
    url: "/login",
    method: "POST",
    data: params,
  });

// 注册
export const registerRequest = (params: any) => request({
    url: '/register',
    method: 'POST',
    data: params
});
