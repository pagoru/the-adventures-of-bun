import { Vector3d } from "libs/types";
import { BLOCK_SIZE_XZ, BLOCK_SIZE_Y } from "libs/consts";

export const blockUtils = () => {
  const getVector3dFromBlockVector3d = ({ x, z, y }: Vector3d): Vector3d => ({
    x: BLOCK_SIZE_XZ * x,
    y: BLOCK_SIZE_Y * y,
    z: BLOCK_SIZE_XZ * z,
  });

  return {
    getVector3dFromBlockVector3d,
  };
};
