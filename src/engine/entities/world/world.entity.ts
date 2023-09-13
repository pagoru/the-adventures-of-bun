import { EntityTypeFunction } from "libs/darker-engine";
import {
  Component,
  ComponentTypeMap,
  DisplayObjectComponent,
  Engine,
  Entity,
  WorldComponent,
} from "engine";

type Props = DisplayObjectComponent & WorldComponent;

export const worldEntity: EntityTypeFunction<
  Entity,
  Component,
  ComponentTypeMap,
  Props
> = ({
  childOf,
  chunks,
}) => ({
  id: Engine.getUID(),
  type: Entity.WORLD,
  data: {
    [Component.DISPLAY_OBJECT]: {
      childOf,
    },
    [Component.CONTAINER]: {},

    [Component.WORLD]: {
      chunks,
    },
  },
  components: [
    Component.DISPLAY_OBJECT,
    Component.CONTAINER,

    Component.WORLD,
  ],
});
