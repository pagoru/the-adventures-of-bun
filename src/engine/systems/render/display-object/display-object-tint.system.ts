import { SystemFunction } from "libs/darker-engine";
import { Component, Engine } from "engine";
import { Utils } from "utils";

export const displayObjectTintSystem: SystemFunction<Component> = async () => {
  const onAdd = async (id: number) => {
    const entity = Engine.getEntity(id);
    const { color } = entity.getComponent(Component.DISPLAY_OBJECT_TINT);
    if (color === undefined) return;

    const currentDisplayObject = Utils.render.getContainer(id);
    if (currentDisplayObject.tint) currentDisplayObject.tint = color;
  };

  const onUpdate = (id: number) => onAdd(id);

  return {
    components: [Component.DISPLAY_OBJECT, Component.DISPLAY_OBJECT_ZINDEX],
    onAdd,
    onUpdate,
  };
};
