import { EntityTypeFunction } from "libs/darker-engine";
import {
  AnimatedSpriteComponent,
  Component,
  ComponentTypeMap,
  DisplayObjectComponent,
  Engine,
  Entity,
} from "engine";

type Props = AnimatedSpriteComponent & DisplayObjectComponent;

export const animatedSpriteEntity: EntityTypeFunction<
  Entity,
  Component,
  ComponentTypeMap,
  Props
> = ({ spritesheet, animation, animationStatus, animationSpeed, childOf }) => ({
  id: Engine.getUID(),
  type: Entity.ANIMATED_SPRITE,
  data: {
    [Component.DISPLAY_OBJECT]: {
      childOf,
    },
    [Component.ANIMATED_SPRITE]: {
      spritesheet,
      animation,
      animationStatus: animationStatus,
      animationSpeed,
    },
  },
  components: [Component.DISPLAY_OBJECT, Component.ANIMATED_SPRITE],
});
