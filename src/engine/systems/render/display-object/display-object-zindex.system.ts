import { SystemFunction } from "libs/darker-engine";
import { Component, Engine } from "engine";
import { Utils } from "utils";

export const displayObjectZIndexSystem: SystemFunction<
  Component
> = async () => {
  const onAdd = async (id: number) => {
    const entity = Engine.getEntity(id);
    const { zIndex } = entity.getComponent(Component.DISPLAY_OBJECT_ZINDEX);
    if (zIndex === undefined) return;

    const currentDisplayObject = Utils.render.getContainer(id);
    currentDisplayObject.zIndex = zIndex;
  };

  const onUpdate = (id: number) => onAdd(id);

  return {
    components: [Component.DISPLAY_OBJECT, Component.DISPLAY_OBJECT_ZINDEX],
    onAdd,
    onUpdate,
  };
};
