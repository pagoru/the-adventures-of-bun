import { SystemFunction } from "libs/darker-engine";
import { Component, Engine } from "engine";
import { BLOCK_PIVOT_MAP } from "libs/consts";

export const blockSystem: SystemFunction<Component> = async () => {
  const onAdd = async (entityId: number) => {
    const entity = Engine.getEntity(entityId);

    const { type } = entity.getComponent(Component.BLOCK);
    const { bounds } = entity.getComponent(Component.DISPLAY_OBJECT_BOUNDS);

    const blockPivot = BLOCK_PIVOT_MAP[type];
    const { vector2d } = entity.getComponent(Component.DISPLAY_OBJECT_POSITION);

    await entity.updateComponent(Component.DISPLAY_OBJECT_POSITION, {
      vector2d: {
        x: vector2d.x - (bounds.width / 2) + (blockPivot?.x || 0),
        y: vector2d.y - (blockPivot?.y || 0),
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
