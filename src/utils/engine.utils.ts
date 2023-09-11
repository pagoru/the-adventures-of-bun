import { Component, Engine, EntityT } from "engine";

export const engineUtils = () => {
  const getChildEntities = (entityId: number): EntityT[] =>
    Engine.getEntityListByComponents(Component.DISPLAY_OBJECT).filter(
      (entity) =>
        entity.getComponent(Component.DISPLAY_OBJECT).childOf === entityId,
    );

  return {
    getChildEntities,
  };
};
