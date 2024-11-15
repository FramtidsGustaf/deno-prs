import { Config, ReqHandler } from "../types.ts";

export const findAndExec = async ({
  pathname,
  method,
  config,
  req,
  params,
}: {
  method: string;
  pathname: string;
  config: Config;
  req: Request;
  params: URLSearchParams;
}) => {
  // This handles preflight requests
  if (method === "OPTIONS") {
    return new Response("OK");
  }

  if (pathname[pathname.length - 1] !== "/") pathname += "/";

  const routesPath = config.server.routesPath;
  const modulePath = `${Deno.cwd()}${routesPath}${pathname}index.ts`;

  try {
    const module = await import(`file://${modulePath}`);
    const handler = module[method.toLowerCase()] as ReqHandler;

    if (!handler) {
      return new Response("Method Not Allowed", { status: 405 });
    }

    return handler({ req, params });
  } catch (error) {
    console.log(error);
    return new Response("Not Found", { status: 404 });
  }
};
