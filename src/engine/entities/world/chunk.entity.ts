import { EntityTypeFunction } from "libs/darker-engine";
import {
  ChunkComponent,
  Component,
  ComponentTypeMap,
  DisplayObjectChunkPositionComponent,
  DisplayObjectComponent,
  Engine,
  Entity,
} from "engine";
import { CHUNK_SIZE } from "libs/consts";

type Props =
  & DisplayObjectComponent
  & ChunkComponent
  & DisplayObjectChunkPositionComponent;

export const chunkEntity: EntityTypeFunction<
  Entity,
  Component,
  ComponentTypeMap,
  Props
> = ({ childOf, vector3d }) => ({
  id: Engine.getUID(),
  type: Entity.BLOCK,
  data: {
    [Component.DISPLAY_OBJECT]: {
      childOf,
    },
    [Component.PARTICLE_CONTAINER]: {
      maxSize: CHUNK_SIZE * CHUNK_SIZE * (CHUNK_SIZE * 4),
    },
    [Component.DISPLAY_OBJECT_CHUNK_POSITION]: {
      vector3d,
    },
    [Component.CHUNK]: {},
  },
  components: [
    Component.DISPLAY_OBJECT,
    Component.PARTICLE_CONTAINER,

    Component.DISPLAY_OBJECT_CHUNK_POSITION,
    Component.CHUNK,
  ],
});
