import { ReqHandler } from "../types.ts";

export const get: ReqHandler = ({ params }) => {
  console.log(params);
  return new Response("GET request");
};
