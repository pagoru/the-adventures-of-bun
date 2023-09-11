import { EntityTypeFunction } from "libs/darker-engine";
import {
  Component,
  ComponentTypeMap,
  DisplayObjectComponent,
  Engine,
  Entity,
  ParticleContainerComponent,
} from "engine";

type Props = ParticleContainerComponent & DisplayObjectComponent;

export const particleContainerEntity: EntityTypeFunction<
  Entity,
  Component,
  ComponentTypeMap,
  Props
> = ({ childOf, maxSize } = {}) => ({
  id: Engine.getUID(),
  type: Entity.PARTICLE_CONTAINER,
  data: {
    [Component.DISPLAY_OBJECT]: {
      childOf,
    },
    [Component.PARTICLE_CONTAINER]: {
      maxSize,
    },
  },
  components: [Component.DISPLAY_OBJECT, Component.PARTICLE_CONTAINER],
});
