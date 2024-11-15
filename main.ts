import { findAndExec } from "./utils/findAndExec.ts";
import { findConfig } from "./utils/findConfig.ts";

export const server = ({ port }: { port: number }) => {
  return Deno.serve({ port: port }, async (req) => {
    const config = await findConfig();
    const method = req.method;
    const { pathname, search } = new URL(req.url);

    if (!config) {
      console.log("Error reading file");
      console.log(
        "Please make sure that the config file exists and is properly formatted"
      );
      return new Response("Internal Server Error", { status: 500 });
    }

    const response = new Response();

    for (const [key, value] of Object.entries(config.cors)) {
      if (typeof value === "string") {
        response.headers.set(key, value);
      } else {
        response.headers.set(key, value.join(","));
      }
    }

    return findAndExec({
      pathname,
      method,
      config,
      req,
      params: new URLSearchParams(search),
    });
  });
};

server({ port: 8000 });
