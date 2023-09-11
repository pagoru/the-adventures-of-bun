import { EntityTypeFunction } from "libs/darker-engine";
import {
  Component,
  ComponentTypeMap,
  DisplayObjectComponent,
  Engine,
  Entity,
  SpriteComponent,
} from "engine";

type Props = SpriteComponent & DisplayObjectComponent;

export const spriteEntity: EntityTypeFunction<
  Entity,
  Component,
  ComponentTypeMap,
  Props
> = ({ childOf, ...spriteProps }) => ({
  id: Engine.getUID(),
  type: Entity.SPRITE,
  data: {
    [Component.DISPLAY_OBJECT]: {
      childOf,
    },
    [Component.SPRITE]: spriteProps,
  },
  components: [Component.DISPLAY_OBJECT, Component.SPRITE],
});
