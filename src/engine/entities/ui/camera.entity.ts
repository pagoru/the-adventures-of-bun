import { EntityTypeFunction } from "libs/darker-engine";
import { Component, ComponentTypeMap, Engine, Entity } from "engine";

type Props = {};

export const cameraEntity: EntityTypeFunction<
  Entity,
  Component,
  ComponentTypeMap,
  Props
> = (props = {}) => ({
  id: Engine.getUID(),
  type: Entity.CAMERA,
  data: {
    [Component.CAMERA]: {},
  },
  components: [Component.DISPLAY_OBJECT, Component.CONTAINER, Component.CAMERA],
});
