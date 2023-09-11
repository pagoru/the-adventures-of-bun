import { Size2d } from "libs/types";

export const polygonUtils = () => {
  /**
   * Edges:
   *
   *       CD (x)
   *      /\
   *     /  \
   * AB /    \
   *    \    /  EF (x) + (y)
   *     \  /
   *      \/
   *      GH (y)
   */
  const getTilePolygon = ({ width, height }: Size2d): number[] => {
    // DON'T TOUCH THIS FUCKING ASSHOLE, THIS FIXES THE PIXEL PERFECT ON GRAPHICS
    // IF YOU WANT TO CHECK IF IT WORKS, TAKE A PICTURE AND CHECK IT ON ASEPRITE
    const xMargin = -2;
    const yMargin = 0;

    // Edge AB
    const polA = xMargin;
    const polB = yMargin;

    // Edge CD
    const polC = -width * 2 + xMargin;
    const polD = width + yMargin;

    // Edge EF
    const polE = -width * 2 + height * 2 + xMargin;
    const polF = width + height + yMargin;

    // Edge GH
    const polG = height * 2 + xMargin;
    const polH = height + yMargin;

    return [polA, polB, polC, polD, polE, polF, polG, polH];
  };

  const getRectanglePolygon = ({ width, height }: Size2d): number[] => [
    0,
    0,
    //,
    width,
    0,
    //
    width,
    height,
    //
    0,
    height,
  ];

  return {
    getTilePolygon,
    getRectanglePolygon,
  };
};
