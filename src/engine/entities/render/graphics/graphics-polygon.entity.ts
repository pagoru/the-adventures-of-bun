import { EntityTypeFunction } from "libs/darker-engine";
import {
  Component,
  ComponentTypeMap,
  DisplayObjectComponent,
  Engine,
  Entity,
  GraphicsComponent,
  GraphicsPolygonComponent,
} from "engine";

type Props =
  & GraphicsComponent
  & GraphicsPolygonComponent
  & DisplayObjectComponent;

export const graphicsPolygonEntity: EntityTypeFunction<
  Entity,
  Component,
  ComponentTypeMap,
  Props
> = ({ childOf, polygon, color }) => ({
  id: Engine.getUID(),
  type: Entity.GRAPHICS,
  data: {
    [Component.DISPLAY_OBJECT]: {
      childOf,
    },
    [Component.GRAPHICS]: {
      color,
    },
    [Component.GRAPHICS_POLYGON]: {
      polygon,
    },
  },
  components: [
    Component.DISPLAY_OBJECT,
    Component.GRAPHICS,
    Component.GRAPHICS_POLYGON,
  ],
});
