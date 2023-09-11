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

export const uiStageEntity: EntityTypeFunction<
  Entity,
  Component,
  ComponentTypeMap,
  Props
> = ({ childOf }) => {
  const _containerEntity = containerEntity({ childOf });
  return {
    id: Engine.getUID(),
    type: Entity.UI_STAGE,
    data: {
      ..._containerEntity.data,
    },
    components: [..._containerEntity.components, Component.UI_STAGE],
  };
};
