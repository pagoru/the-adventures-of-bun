import { SpriteSheet } from "libs/enums";

export type SpriteComponent = {
  spriteSheet: SpriteSheet | string;
  texture: string;
};
