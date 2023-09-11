import { EntityTypeFunction } from "libs/darker-engine";
import {
  Component,
  ComponentTypeMap,
  DisplayObjectComponent,
  Engine,
  Entity,
  GraphicsComponent,
  GraphicsLineComponent,
} from "engine";

type Props = GraphicsComponent & GraphicsLineComponent & DisplayObjectComponent;

export const graphicsLineEntity: EntityTypeFunction<
  Entity,
  Component,
  ComponentTypeMap,
  Props
> = ({ childOf, width, endPoint, startPoint, color }) => ({
  id: Engine.getUID(),
  type: Entity.GRAPHICS,
  data: {
    [Component.DISPLAY_OBJECT]: {
      childOf,
    },
    [Component.GRAPHICS]: {
      color,
    },
    [Component.GRAPHICS_LINE]: {
      width,
      endPoint,
      startPoint,
    },
  },
  components: [
    Component.DISPLAY_OBJECT,
    Component.GRAPHICS,
    Component.GRAPHICS_LINE,
  ],
});
