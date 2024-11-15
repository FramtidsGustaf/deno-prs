export interface Config {
  cors: {
    origin: string;
    methods: string[];
    headers: string[];
  };
  server: {
    routesPath: string;
  };
}

interface Data {
  [key: string]: string | number | boolean | Data;
}

interface ReqHandlerParams {
  req: Request;
  params: URLSearchParams;
  data?: Data;
}

export type ReqHandler = (params: ReqHandlerParams) => Response;
