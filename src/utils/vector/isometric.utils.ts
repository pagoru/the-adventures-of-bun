import { Vector2d, Vector3d } from "libs/types";

export const isometricUtils = () => {
  const getVector3dFromVector2d = ({ x, y }: Vector2d): Vector3d => ({
    x: Math.round(-x / 2 - (-x / 2 - y) / 2),
    y: 0,
    z: Math.round((y + x / 2) / 2),
  });

  const getVector2dFromVector3d = ({ x, y, z }: Vector3d): Vector2d => ({
    x: (z - x) * 2,
    y: z + x - y * 2,
  });

  const getZIndex = ({ x, y, z }: Vector3d) => x + z + y;

  const add = (vector3dA: Vector3d, vector3dB: Vector3d) => ({
    x: vector3dA.x + vector3dB.x,
    y: vector3dA.y + vector3dB.y,
    z: vector3dA.z + vector3dB.z,
  });

  return {
    getVector3dFromVector2d,
    getVector2dFromVector3d,
    getZIndex,
    add,
  };
};
