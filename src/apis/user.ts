import { request } from "@/utils/request";

// 登录
export const getAllUsersRequest = async () =>{
  return request({
    url: "/users/",
    method: "GET",
    data: ""
  })};

// 课时
export const getCourses = async (params) => {
    return request<any>({
        url: '/course',
        method: 'GET',
        data: {username: params}
    })
}
