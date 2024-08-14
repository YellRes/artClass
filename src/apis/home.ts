// 测试course接口
import { request } from "@/utils/request";

// 登录
export const getImages = async (params) =>{
  return request({
    url: "/images",
    method: "POST",
    data: params
  })};
