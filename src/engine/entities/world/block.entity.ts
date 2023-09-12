import { EntityTypeFunction } from "libs/darker-engine";
import {
  BlockComponent,
  Component,
  ComponentTypeMap,
  DisplayObjectBlockPositionComponent,
  DisplayObjectComponent,
  Engine,
  Entity,
} from "engine";
import { Block } from "libs/enums";

type Props =
  & DisplayObjectComponent
  & BlockComponent
  & DisplayObjectBlockPositionComponent;

export const blockEntity: EntityTypeFunction<
  Entity,
  Component,
  ComponentTypeMap,
  Props
> = ({ childOf, type, vector3d }) => {
  let texture = Block[type].toLowerCase();
  if (texture.includes("_")) {
    const [preBlock, postBlock] = texture.split("_");
    texture = `${preBlock}_block_${postBlock}`;
  } else {
    texture = `block_${texture}`;
  }

  return {
    id: Engine.getUID(),
    type: Entity.BLOCK,
    data: {
      [Component.DISPLAY_OBJECT]: {
        childOf,
      },
      [Component.SPRITE]: {
        texture,
      },
      [Component.DISPLAY_OBJECT_BLOCK_POSITION]: {
        vector3d,
      },
      [Component.BLOCK]: {
        type,
      },
    },
    components: [
      Component.DISPLAY_OBJECT,
      Component.SPRITE,

      Component.DISPLAY_OBJECT_BLOCK_POSITION,
      Component.BLOCK,
    ],
  };
};
