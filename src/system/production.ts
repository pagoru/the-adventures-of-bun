import * as PIXI from "libs/pixi.mjs";

export const production = () => {
  const load = () => {
    // @ts-ignore Ignore this
    PIXI.Assets.load = async (data) => data;
    // @ts-ignore
    fetch = async (data) => ({ json: async () => data });
  };

  return {
    load,
  };
};
