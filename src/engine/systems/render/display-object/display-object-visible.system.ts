import { SystemFunction } from "libs/darker-engine";
import { Component, Engine } from "engine";
import { Utils } from "utils";

export const displayObjectVisibleSystem: SystemFunction<
  Component
> = async () => {
  const onAdd = async (id: number) => {
    const entity = Engine.getEntity(id);
    const { visible } = entity.getComponent(Component.DISPLAY_OBJECT_VISIBLE);
    if (visible === undefined) return;

    const currentDisplayObject = Utils.render.getContainer(id);
    currentDisplayObject.visible = visible;
  };

  const onUpdate = (id: number) => onAdd(id);

  return {
    components: [Component.DISPLAY_OBJECT, Component.DISPLAY_OBJECT_VISIBLE],
    onAdd,
    onUpdate,
  };
};
