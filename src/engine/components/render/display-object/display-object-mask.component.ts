import { SpriteSheet } from "libs/enums";
import { Vector2d } from "libs/types";

export type DisplayObjectMaskComponent = {
  pivot?: Vector2d;
  visible?: boolean;
} & (DisplayObjectMaskSpriteComponent | DisplayObjectMaskPolygonComponent);

type DisplayObjectMaskSpriteComponent = {
  type: "sprite";
  spriteSheet: SpriteSheet | string;
  spriteName: string;
};

type DisplayObjectMaskPolygonComponent = {
  type: "polygon";
  polygon: number[];
};
