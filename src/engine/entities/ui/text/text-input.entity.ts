import { EntityTypeFunction } from "libs/darker-engine";
import {
  Component,
  ComponentTypeMap,
  ContainerComponent,
  DisplayObjectComponent,
  Engine,
  Entity,
  TextComponent,
  textEntity,
  TextInputComponent,
} from "engine";

type Props =
  & ContainerComponent
  & DisplayObjectComponent
  & TextComponent
  & TextInputComponent;

export const textInputEntity: EntityTypeFunction<
  Entity,
  Component,
  ComponentTypeMap,
  Props
> = ({ cursorIndex, cursorColor, maxLength, ...textProps }) => {
  const textObject = textEntity(textProps);
  return {
    id: Engine.getUID(),
    type: Entity.TEXT_INPUT,
    data: {
      ...textObject.data,
      [Component.TEXT_INPUT]: {
        cursorIndex,
        cursorColor,
        maxLength,
      },
    },
    components: [...textObject.components, Component.TEXT_INPUT],
  };
};
