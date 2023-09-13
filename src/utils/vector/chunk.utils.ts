import { Vector2d, Vector3d } from "libs/types";
import { BLOCK_SIZE_XZ, CHUNK_SIZE } from "libs/consts";

export const chunkUtils = () => {
  const getVector3dFromChunkVector2d = ({ x, y }: Vector2d): Vector3d => ({
    x: BLOCK_SIZE_XZ * CHUNK_SIZE * x,
    y: 0,
    z: BLOCK_SIZE_XZ * CHUNK_SIZE * y,
  });

  return {
    getVector3dFromChunkVector2d,
  };
};
