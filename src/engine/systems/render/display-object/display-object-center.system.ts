import { SystemFunction } from "libs/darker-engine";
import { Component, Engine } from "engine";

export const displayObjectCenterSystem: SystemFunction<
  Component
> = async () => {
  const onAdd = async (entityId: number) => {
    const entity = Engine.getEntity(entityId);
    const {
      bounds: { width, height },
    } = entity.getComponent(Component.DISPLAY_OBJECT_BOUNDS);

    await entity.updateComponent(Component.DISPLAY_OBJECT_PIVOT, {
      vector2d: {
        x: Math.round(width / 2),
        y: Math.round(height / 2),
      },
    });
  };

  const onUpdate = async (entityId: number, component: Component) => {
    if (component !== Component.DISPLAY_OBJECT_BOUNDS) return;
    await onAdd(entityId);
  };

  return {
    components: [
      Component.DISPLAY_OBJECT,
      Component.DISPLAY_OBJECT_BOUNDS,
      Component.DISPLAY_OBJECT_CENTER,
    ],
    onAdd,
    onUpdate,
  };
};
