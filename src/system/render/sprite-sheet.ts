import * as PIXI from "libs/pixi.mjs";
import { Texture } from "libs/pixi.mjs";

export const spriteSheet = () => {
  let spriteSheet: Record<string, PIXI.Spritesheet> = {};

  const SPRITE_LIST = ["sprite-sheet", "font"];

  const load = async () => {
    for await (const spriteName of SPRITE_LIST) {
      const texture = await Texture.fromURL(`./assets/${spriteName}.png`);
      const sheet = await (
        await fetch(`./assets/${spriteName}.json`)
      ).json();

      console.info(`Loading ${spriteName}!`);
      spriteSheet[spriteName] = new PIXI.Spritesheet(texture, sheet);
      await spriteSheet[spriteName].parse();
    }
  };

  const get = async (spriteName = "sprite-sheet"): PIXI.Spritesheet =>
    spriteSheet[spriteName];

  return {
    load,
    get,
  };
};
