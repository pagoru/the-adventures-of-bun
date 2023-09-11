import { EntityTypeFunction } from "libs/darker-engine";
import { Component, ComponentTypeMap, Engine, Entity } from "engine";

type Props = {};

export const _Entity: EntityTypeFunction<
  Entity,
  Component,
  ComponentTypeMap,
  Props
> = () => ({
  id: Engine.getUID(),
  type: Entity.OBJECT,
  data: {},
  components: [],
});
