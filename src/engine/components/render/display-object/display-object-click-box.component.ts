import { Vector2d } from "libs/types";

export type DisplayObjectClickBoxComponent = {
  clickBoxPolygon?: number[];
  visualClickBox?: boolean;
  removeCurrentSelections?: boolean;
  repeatedClick?: boolean;
  targetEntityId?: number;
  pivot?: Vector2d;
};
