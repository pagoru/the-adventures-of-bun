import { SystemFunction } from "libs/darker-engine";
import {
  animatedSpriteSystem,
  blockSystem,
  cameraSystem,
  chunkSystem,
  Component,
  containerSystem,
  displayObjectAddPivotSystem,
  displayObjectAlphaSystem,
  displayObjectBlockPositionSystem,
  displayObjectCenterSystem,
  displayObjectChunkPositionSystem,
  displayObjectEventModeSystem,
  displayObjectFiltersSystem,
  displayObjectHitBoxSystem,
  displayObjectIsometricPivotSystem,
  displayObjectIsometricPositionSystem,
  displayObjectMaskSystem,
  displayObjectPivotSystem,
  displayObjectPositionSystem,
  displayObjectSortChildrenSystem,
  displayObjectSystem,
  displayObjectTintSystem,
  displayObjectVisibleSystem,
  displayObjectZIndexSystem,
  graphicsLineSystem,
  graphicsPolygonSystem,
  particleContainerSystem,
  splashSystem,
  spriteSystem,
  stageSystem,
  textSystem,
  worldSystem,
} from "engine";
import { sandboxSystem } from "./sandbox.system";

export const getSystems = (): SystemFunction<Component>[] => [
  /** PIXI.JS **/
  containerSystem,
  spriteSystem,
  particleContainerSystem,
  animatedSpriteSystem,
  // graphics
  graphicsLineSystem,
  graphicsPolygonSystem,

  // The last one from pixi.js renders
  displayObjectSystem,
  // needs the above
  displayObjectPositionSystem,
  displayObjectPivotSystem,
  displayObjectVisibleSystem,
  displayObjectAlphaSystem,
  displayObjectZIndexSystem,
  displayObjectSortChildrenSystem,
  displayObjectMaskSystem,
  displayObjectFiltersSystem,
  displayObjectHitBoxSystem,
  displayObjectCenterSystem,
  displayObjectAddPivotSystem,
  displayObjectTintSystem,
  displayObjectEventModeSystem,
  displayObjectIsometricPositionSystem,
  displayObjectIsometricPivotSystem,
  displayObjectBlockPositionSystem,
  displayObjectChunkPositionSystem,

  /** ENGINE **/
  textSystem,

  cameraSystem,
  stageSystem,
  splashSystem,

  blockSystem,
  chunkSystem,
  worldSystem,
  // The last one
  sandboxSystem,
];
