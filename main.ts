import { webServe } from "deno_web_serve";
import { load } from "deno/dotenv/mod.ts";

const env = await load();
Object.keys(env).forEach((key) => Deno.env.set(key, env[key]));

await webServe({
  port: 8080,
  indexFileName: "main.ts",
  minify: false,
  openBrowser: false,
  externals: [],
  bundleAssets: false,
  envs: ["ENVIRONMENT"],
});
