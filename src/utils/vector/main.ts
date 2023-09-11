import { Vector2d, Vector3d } from "libs/types";
import { isometricUtils } from "./isometric.utils";

export const vectorUtils = () => {
  const isometric = isometricUtils();

  const isVector2dEqual = (vec1: Vector2d, vec2: Vector2d): boolean =>
    vec1.x === vec2.x && vec1.y === vec2.y;

  const isVector3dEqual = (vec1: Vector3d, vec2: Vector3d): boolean =>
    isVector2dEqual(vec1, vec2) && vec1.z === vec2.z;

  return {
    isometric,
    isVector2dEqual,
    isVector3dEqual,
  };
};
