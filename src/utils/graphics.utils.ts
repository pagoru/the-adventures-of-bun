import * as PIXI from "libs/pixi.mjs";
import { Size2d } from "libs/types";

/**
 * @deprecated Use polygonUtils instead
 */
export const graphicsUtils = () => {
  const getGraphics = (
    polygon: number[],
    color: number,
    graphics: PIXI.Graphics = new PIXI.Graphics(),
  ): PIXI.Graphics => {
    graphics.beginFill(color);
    graphics.drawPolygon(polygon);
    graphics.endFill();
    return graphics;
  };
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
  const getGraphicsTile = (
    { width, height }: Size2d,
    color: number,
    graphics: PIXI.Graphics = new PIXI.Graphics(),
  ): PIXI.Graphics => {
    const xMargin = -1;
    const yMargin = 0;

    // Edge AB
    const polA = xMargin;
    const polB = yMargin;

    // Edge CD
    const polC = width * 2 + xMargin;
    const polD = -width + yMargin;

    // Edge EF
    const polE = width * 2 + height * 2 + xMargin;
    const polF = -width + height + yMargin;

    // Edge GH
    const polG = height * 2 + xMargin;
    const polH = height + yMargin;

    return getGraphics(
      [polA, polB, polC, polD, polE, polF, polG, polH],
      color,
      graphics,
    );
  };

  return {
    getGraphics,
    getGraphicsTile,
  };
};
