import { SystemFunction } from "libs/darker-engine";
import { Component, Engine } from "engine";
import { Utils } from "utils";

export const displayObjectAddPivotSystem: SystemFunction<
  Component
> = async () => {
  const onAdd = async (id: number) => {
    const entity = Engine.getEntity(id);
    const { vector2d } = entity.getComponent(
      Component.DISPLAY_OBJECT_ADD_PIVOT,
    );
    if (!vector2d) return;

    const currentDisplayObject = Utils.render.getContainer(id);
    currentDisplayObject.pivot.x += vector2d.x;
    currentDisplayObject.pivot.y += vector2d.y;
  };

  const onUpdate = (id: number) => onAdd(id);

  return {
    components: [Component.DISPLAY_OBJECT, Component.DISPLAY_OBJECT_ADD_PIVOT],
    onAdd,
    onUpdate,
  };
};
