import { EntityTypeFunction } from "libs/darker-engine";
import {
  Component,
  ComponentTypeMap,
  ContainerComponent,
  DisplayObjectComponent,
  Engine,
  Entity,
} from "engine";

type Props = ContainerComponent & DisplayObjectComponent;

export const containerEntity: EntityTypeFunction<
  Entity,
  Component,
  ComponentTypeMap,
  Props
> = ({ childOf } = {}) => ({
  id: Engine.getUID(),
  type: Entity.CONTAINER,
  data: {
    [Component.DISPLAY_OBJECT]: {
      childOf,
    },
  },
  components: [Component.DISPLAY_OBJECT, Component.CONTAINER],
});
