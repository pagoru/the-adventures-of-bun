import { Vector3d } from "libs/types";
import { BLOCK_SIZE_XZ, BLOCK_SIZE_Y, CHUNK_SIZE } from "libs/consts";

export const chunkUtils = () => {
  const getVector3dFromChunkVector3d = ({ x, z, y }: Vector3d): Vector3d => ({
    x: BLOCK_SIZE_XZ * CHUNK_SIZE * x,
    y: (BLOCK_SIZE_Y * 4) * CHUNK_SIZE * y,
    z: BLOCK_SIZE_XZ * CHUNK_SIZE * z,
  });

  return {
    getVector3dFromChunkVector3d,
  };
};
