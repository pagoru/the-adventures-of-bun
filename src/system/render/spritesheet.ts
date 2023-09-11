import * as PIXI from "libs/pixi.mjs";
import { Texture } from "libs/pixi.mjs";

export const spritesheet = () => {
  const spriteSheetMap: Record<string, PIXI.Spritesheet> = {} as Record<
    string,
    PIXI.Spritesheet
  >;

  const load = async (name: string) => {
    const texture = await Texture.fromURL(`./assets/${name}.png`);
    const sheet = await (
      await fetch(`./assets/${name}.json`)
    ).json();

    console.info(`Loading spriteSheet '${name}'`);
    const spriteSheet = new PIXI.Spritesheet(texture, sheet);
    await spriteSheet.parse();
    spriteSheetMap[name] = spriteSheet;
  };

  const set = (
    name: string,
    spriteSheet: PIXI.Spritesheet,
  ) => (spriteSheetMap[name] = spriteSheet);

  const get = async (name: string): PIXI.Spritesheet => spriteSheetMap[name];

  return {
    get,
    set,
  };
};
