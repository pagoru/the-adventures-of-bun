import { AnimationStatus, AnimationVelocity, SpriteSheet } from "libs/enums";

export type AnimatedSpriteComponent = {
  spritesheet: SpriteSheet | string;
  animation: string;

  animationStatus?: AnimationStatus;
  animationSpeed?: AnimationVelocity;
};
