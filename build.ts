import { build } from "deno_web_serve";
import { load } from "deno/dotenv/mod.ts";

const env = await load();
Object.keys(env).forEach((key) => Deno.env.set(key, env[key]));

await build({
  indexFileName: "main.ts",
  minify: true,
  bundleAssets: true,
  envs: [],
});
