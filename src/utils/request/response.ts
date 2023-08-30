// import Taro from "@tarojs/taro";
// import { SuccessCallbackResult } from "@tarojs";
import { showToast } from "@tarojs/taro";
import type { ResponseType } from "./type.d.ts";

export const handleResponse = <T>(
  response: Taro.request.SuccessCallbackResult<ResponseType<T>>
) => {
  const { status } = response.data;

  if (status === 0) {
    return response.data.data;
  } else {
    showToast({
      title: response.data.message,
      icon: "none",
      duration: 2000,
    });
  }
};
