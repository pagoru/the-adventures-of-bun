import { SystemFunction } from "libs/darker-engine";
import { Component, Engine } from "engine";

export const blockSystem: SystemFunction<Component> = async () => {
  const onAdd = async (entityId: number) => {
    const entity = Engine.getEntity(entityId);

    const { bounds } = entity.getComponent(Component.DISPLAY_OBJECT_BOUNDS);

    await entity.updateComponent(Component.DISPLAY_OBJECT_ADD_PIVOT, {
      vector2d: {
        x: bounds.width / 2,
        y: bounds.height,
      },
    });
  };

  return {
    components: [
      Component.DISPLAY_OBJECT,
      Component.SPRITE,
      Component.BLOCK,
      Component.DISPLAY_OBJECT_BLOCK_POSITION,
    ],
    onAdd,
  };
};
