// 测试course接口
import { request } from "@/utils/request";

// 登录
export const createUserCourse = async (params) =>{
  return request({
    url: "/course/create",
    method: "POST",
    data: params
  })};
