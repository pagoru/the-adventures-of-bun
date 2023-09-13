import { Block } from "libs/enums";
import { Vector2d } from "libs/types";

export const BLOCK_SIZE_XZ = 4;
export const BLOCK_SIZE_Y = 1;

export const BLOCK_PIVOT_MAP: Record<Block, Vector2d> = {
  [Block.GRASS]: {
    x: 0,
    y: 1,
  },
  [Block.DIRT]: {
    x: 0,
    y: 0,
  },

  [Block.S_DIRT]: {
    x: 0,
    y: -4,
  },
  [Block.S_GRASS]: {
    x: 0,
    y: -3,
  },

  [Block.XS_WATER]: {
    x: 0,
    y: -7,
  },
};
