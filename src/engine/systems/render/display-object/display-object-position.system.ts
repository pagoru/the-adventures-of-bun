import { SystemFunction } from "libs/darker-engine";
import { Component, Engine } from "engine";
import { Utils } from "utils";

export const displayObjectPositionSystem: SystemFunction<
  Component
> = async () => {
  const onAdd = async (id: number) => {
    const entity = Engine.getEntity(id);
    const { vector2d } = entity.getComponent(Component.DISPLAY_OBJECT_POSITION);
    if (!vector2d) return;

    const currentDisplayObject = Utils.render.getContainer(id);
    currentDisplayObject.position.set(vector2d.x, vector2d.y);
  };

  const onUpdate = (id: number) => onAdd(id);

  return {
    components: [Component.DISPLAY_OBJECT, Component.DISPLAY_OBJECT_POSITION],
    onAdd,
    onUpdate,
  };
};
