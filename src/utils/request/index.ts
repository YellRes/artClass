import { request as taroRequest } from "@tarojs/taro";
import { handleResponse } from "./response";
import type { requestType, ResponseType } from "./type";

export const request = <T>(options: requestType) => {
  const { url, data, method = "GET" } = options;

  let contentType = "application/json";
  // if (method === "POST") {
  //   contentType = "application/x-www-form-urlencoded";
  // }

  return new Promise<T>((res, rej) => {
    taroRequest({
      url: "/artClass" + url,
      data,
      method,
      mode: "cors",
      header: {
        "content-type": contentType,
      },
      success: (
        result: Taro.request.SuccessCallbackResult<ResponseType<T>>
      ) => {
        res(handleResponse(result));
      },
      fail: (error) => {
        rej(error);
      },
    });
  });
};
