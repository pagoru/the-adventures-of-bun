import * as PIXI from "libs/pixi.mjs";
import { rgbSplitFilterFragment, vertex } from "./fragments";

type Offset = [number, number];

/**
 * An RGB Split Filter.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/rgb.png)
 *
 * @class
 * @extends PIXI.Filter
 * @see {@link https://www.npmjs.com/package/@pixi/filter-rgb-split|@pixi/filter-rgb-split}
 * @see {@link https://www.npmjs.com/package/pixi-filters|pixi-filters}
 */
export class RgbSplitFilter extends PIXI.Filter {
  /**
   * @param {PIXI.Point | number[]} [red=[-10,0]] - Red channel offset
   * @param {PIXI.Point | number[]} [green=[0, 10]] - Green channel offset
   * @param {PIXI.Point | number[]} [blue=[0, 0]] - Blue channel offset
   */
  constructor(
    red: Offset = [-10, 0],
    green: Offset = [0, 10],
    blue: Offset = [0, 0],
  ) {
    super(vertex, rgbSplitFilterFragment);
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  /**
   * Red channel offset.
   *
   * @member {PIXI.Point | number[]}
   */
  get red(): Offset {
    return this.uniforms.red;
  }
  set red(value: Offset) {
    this.uniforms.red = value;
  }

  /**
   * Green channel offset.
   *
   * @member {PIXI.Point | number[]}
   */
  get green(): Offset {
    return this.uniforms.green;
  }
  set green(value: Offset) {
    this.uniforms.green = value;
  }

  /**
   * Blue offset.
   *
   * @member {PIXI.Point | number[]}
   */
  get blue(): Offset {
    return this.uniforms.blue;
  }
  set blue(value: Offset) {
    this.uniforms.blue = value;
  }
}
