import {
  AnimatedSpriteComponent,
  BlockComponent,
  CameraComponent,
  ChunkComponent,
  ContainerComponent,
  DisplayObjectAlphaComponent,
  DisplayObjectBlockPositionComponent,
  DisplayObjectBoundsComponent,
  DisplayObjectBoundsInteractiveComponent,
  DisplayObjectChunkPositionComponent,
  DisplayObjectClickBoxComponent,
  DisplayObjectComponent,
  DisplayObjectEventModeComponent,
  DisplayObjectFiltersComponent,
  DisplayObjectIsometricPivotComponent,
  DisplayObjectIsometricPositionComponent,
  DisplayObjectMaskComponent,
  DisplayObjectPivotComponent,
  DisplayObjectPositionComponent,
  DisplayObjectSelectedComponent,
  DisplayObjectSortChildrenComponent,
  DisplayObjectTintComponent,
  DisplayObjectVisibleComponent,
  DisplayObjectZIndexComponent,
  GraphicsComponent,
  GraphicsLineComponent,
  GraphicsPolygonComponent,
  ParticleContainerComponent,
  SpriteComponent,
  TextComponent,
} from "engine";

export enum Component {
  /**************** PIXI.JS ****************/
  DISPLAY_OBJECT,
  CONTAINER,
  SPRITE,
  PARTICLE_CONTAINER,
  ANIMATED_SPRITE,

  GRAPHICS,
  GRAPHICS_POLYGON,
  GRAPHICS_LINE,

  DISPLAY_OBJECT_BOUNDS,
  DISPLAY_OBJECT_POSITION,
  DISPLAY_OBJECT_PIVOT,
  DISPLAY_OBJECT_ADD_PIVOT,
  DISPLAY_OBJECT_VISIBLE,
  DISPLAY_OBJECT_ALPHA,
  DISPLAY_OBJECT_ZINDEX,
  DISPLAY_OBJECT_SORT_CHILDREN,
  DISPLAY_OBJECT_MASK,
  DISPLAY_OBJECT_FILTERS,
  DISPLAY_OBJECT_CLICK_BOX,
  DISPLAY_OBJECT_SELECTED,
  DISPLAY_OBJECT_CENTER,
  DISPLAY_OBJECT_TINT,
  DISPLAY_OBJECT_EVENT_MODE,
  DISPLAY_OBJECT_ISOMETRIC_POSITION,
  DISPLAY_OBJECT_ISOMETRIC_PIVOT,
  DISPLAY_OBJECT_BOUNDS_INTERACTIVE,
  DISPLAY_OBJECT_BLOCK_POSITION,
  DISPLAY_OBJECT_CHUNK_POSITION,

  /**************** ENGINE ****************/
  TEXT,

  CAMERA,
  STAGE,
  UI_STAGE,

  BLOCK,
  CHUNK,
}

export type ComponentTypeMap = {
  /**************** PIXI.JS ****************/
  [Component.DISPLAY_OBJECT]: DisplayObjectComponent;
  [Component.CONTAINER]: ContainerComponent;
  [Component.SPRITE]: SpriteComponent;
  [Component.PARTICLE_CONTAINER]: ParticleContainerComponent;
  [Component.ANIMATED_SPRITE]: AnimatedSpriteComponent;

  [Component.GRAPHICS]: GraphicsComponent;
  [Component.GRAPHICS_POLYGON]: GraphicsPolygonComponent;
  [Component.GRAPHICS_LINE]: GraphicsLineComponent;

  [Component.DISPLAY_OBJECT_BOUNDS]: DisplayObjectBoundsComponent;
  [Component.DISPLAY_OBJECT_POSITION]: DisplayObjectPositionComponent;
  [Component.DISPLAY_OBJECT_PIVOT]: DisplayObjectPivotComponent;
  [Component.DISPLAY_OBJECT_ADD_PIVOT]: DisplayObjectPivotComponent;
  [Component.DISPLAY_OBJECT_VISIBLE]: DisplayObjectVisibleComponent;
  [Component.DISPLAY_OBJECT_ALPHA]: DisplayObjectAlphaComponent;
  [Component.DISPLAY_OBJECT_ZINDEX]: DisplayObjectZIndexComponent;
  [Component.DISPLAY_OBJECT_SORT_CHILDREN]: DisplayObjectSortChildrenComponent;
  [Component.DISPLAY_OBJECT_MASK]: DisplayObjectMaskComponent;
  [Component.DISPLAY_OBJECT_FILTERS]: DisplayObjectFiltersComponent;
  [Component.DISPLAY_OBJECT_CLICK_BOX]: DisplayObjectClickBoxComponent;
  [Component.DISPLAY_OBJECT_SELECTED]: DisplayObjectSelectedComponent;
  [Component.DISPLAY_OBJECT_CENTER]: {};
  [Component.DISPLAY_OBJECT_TINT]: DisplayObjectTintComponent;
  [Component.DISPLAY_OBJECT_EVENT_MODE]: DisplayObjectEventModeComponent;
  [Component.DISPLAY_OBJECT_ISOMETRIC_POSITION]:
    DisplayObjectIsometricPositionComponent;
  [Component.DISPLAY_OBJECT_ISOMETRIC_PIVOT]:
    DisplayObjectIsometricPivotComponent;
  [Component.DISPLAY_OBJECT_BOUNDS_INTERACTIVE]:
    DisplayObjectBoundsInteractiveComponent;
  [Component.DISPLAY_OBJECT_BLOCK_POSITION]:
    DisplayObjectBlockPositionComponent;
  [Component.DISPLAY_OBJECT_CHUNK_POSITION]:
    DisplayObjectChunkPositionComponent;

  /**************** ENGINE ****************/
  [Component.TEXT]: TextComponent;

  [Component.CAMERA]: CameraComponent;
  [Component.STAGE]: {};
  [Component.UI_STAGE]: {};

  [Component.BLOCK]: BlockComponent;
  [Component.CHUNK]: ChunkComponent;
};
