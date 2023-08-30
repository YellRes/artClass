export type ResponseType<T> = {
  message: string;
  status: 0;
  data: T;
};

export type requestType = {
  url: string;
  data: any;
  method: "GET" | "POST";
};
