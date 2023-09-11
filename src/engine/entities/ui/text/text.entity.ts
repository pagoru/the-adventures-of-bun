import { EntityTypeFunction } from "libs/darker-engine";
import {
  Component,
  ComponentTypeMap,
  ContainerComponent,
  DisplayObjectComponent,
  Engine,
  Entity,
  TextComponent,
} from "engine";

type Props = ContainerComponent & DisplayObjectComponent & TextComponent;

export const textEntity: EntityTypeFunction<
  Entity,
  Component,
  ComponentTypeMap,
  Props
> = ({ childOf, ...textProps }) => ({
  id: Engine.getUID(),
  type: Entity.TEXT,
  data: {
    [Component.DISPLAY_OBJECT]: {
      childOf,
    },
    [Component.TEXT]: {
      ...textProps,
      color: textProps.color || [0x000000, 1],
      backgroundColor: textProps.backgroundColor,
      backgroundPadding: textProps.backgroundPadding || 0,
    },
  },
  components: [
    Component.DISPLAY_OBJECT,
    Component.CONTAINER,
    Component.TEXT,
  ],
});
