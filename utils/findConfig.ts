import { parse } from "jsr:@std/toml/parse";
import { Config } from "../types.ts";

export const findConfig = async () => {
  try {
    const configFile = await Deno.readTextFile(Deno.cwd() + "/config.toml");
    return parse(configFile) as unknown as Config;
  } catch (error) {
    console.log(error);
    return null;
  }
};
