// import type { } from ''
import { request as taroRequest } from "@tarojs/taro";
import { handleResponse } from "./response";
import type { requestType } from "./type";

export const request = (options: requestType) => {
  const { url, data, method = "GET" } = options;

  let contentType = "application/json";
  if (method === "POST") {
    contentType = "application/x-www-form-urlencoded";
  }
  return new Promise((res, rej) => {
    taroRequest({
      url,
      data,
      header: {
        "content-type": contentType,
      },
      success: (result) => {
        res(handleResponse(result));
      },
      fail: (error) => {
        rej(error);
      },
    });
  });
};
