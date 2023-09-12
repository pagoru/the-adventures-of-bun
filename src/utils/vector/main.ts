import { Vector2d, Vector3d } from "libs/types";
import { isometricUtils } from "./isometric.utils";
import { blockUtils } from "./block.utils";
import { chunkUtils } from "utils/vector/chunk.utils";

export const vectorUtils = () => {
  const isometric = isometricUtils();
  const block = blockUtils();
  const chunk = chunkUtils();

  const isVector2dEqual = (vec1: Vector2d, vec2: Vector2d): boolean =>
    vec1.x === vec2.x && vec1.y === vec2.y;

  const isVector3dEqual = (vec1: Vector3d, vec2: Vector3d): boolean =>
    isVector2dEqual(vec1, vec2) && vec1.z === vec2.z;

  return {
    isometric,
    block,
    chunk,
    isVector2dEqual,
    isVector3dEqual,
  };
};
