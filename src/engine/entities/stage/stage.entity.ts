import { EntityTypeFunction } from "libs/darker-engine";
import {
  Component,
  ComponentTypeMap,
  containerEntity,
  Engine,
  Entity,
} from "engine";

type Props = {
  childOf: number;
};

export const stageEntity: EntityTypeFunction<
  Entity,
  Component,
  ComponentTypeMap,
  Props
> = ({ childOf }) => {
  const _containerEntity = containerEntity({ childOf });
  return {
    id: Engine.getUID(),
    type: Entity.STAGE,
    data: {
      ..._containerEntity.data,
      [Component.DISPLAY_OBJECT_ISOMETRIC_POSITION]: {
        vector3d: {
          x: 0,
          y: 0,
          z: 0,
        },
        ignoreZIndex: true,
      },
      [Component.DISPLAY_OBJECT_SORT_CHILDREN]: {
        sortChildren: true,
      },
    },
    components: [
      ..._containerEntity.components,
      Component.STAGE,
      Component.DISPLAY_OBJECT_ISOMETRIC_POSITION,
      Component.DISPLAY_OBJECT_SORT_CHILDREN,
    ],
  };
};
