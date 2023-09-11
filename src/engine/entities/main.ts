import { EntityType, SimpleEntityType } from "libs/darker-engine";
import { Component, ComponentTypeMap } from "engine/components";

export type EntityT = EntityType<Entity, Component, ComponentTypeMap>;
export type SimpleEntityT = SimpleEntityType<
  Entity,
  Component,
  ComponentTypeMap
>;

export enum Entity {
  CONTAINER,
  SPRITE,
  PARTICLE_CONTAINER,
  ANIMATED_SPRITE,
  GRAPHICS,

  TEXT,
  TEXT_INPUT,

  CAMERA,
  STAGE,
  UI_STAGE,

  WORLD,
  CHUNK,
  OBJECT,
}
