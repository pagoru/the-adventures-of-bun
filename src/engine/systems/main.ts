import { SystemFunction } from "libs/darker-engine";
import {
  animatedSpriteSystem,
  cameraSystem,
  Component,
  containerSystem,
  displayObjectAddPivotSystem,
  displayObjectAlphaSystem,
  displayObjectCenterSystem,
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
  spriteSystem,
  stageSystem,
  textSystem,
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

  /** ENGINE **/
  textSystem,

  cameraSystem,
  stageSystem,

  // The last one
  sandboxSystem,
];
