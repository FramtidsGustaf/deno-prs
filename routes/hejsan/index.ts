import { ReqHandler } from "../../types.ts";

export const get: ReqHandler = () => {
  return new Response("Hello from Hejsan");
};
