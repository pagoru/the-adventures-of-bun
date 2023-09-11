import { SystemFunction } from "libs/darker-engine";
import { Component, Engine } from "engine";
import { Utils } from "utils";

export const displayObjectAlphaSystem: SystemFunction<Component> = async () => {
  const onAdd = async (id: number) => {
    const entity = Engine.getEntity(id);
    const { alpha } = entity.getComponent(Component.DISPLAY_OBJECT_ALPHA);
    if (alpha === undefined) return;

    const currentDisplayObject = Utils.render.getContainer(id);
    currentDisplayObject.alpha = alpha;
  };

  const onUpdate = async (id: number, component: Component) => {
    if (component !== Component.DISPLAY_OBJECT_ALPHA) return;
    await onAdd(id);
  };

  return {
    components: [Component.DISPLAY_OBJECT, Component.DISPLAY_OBJECT_ALPHA],
    onAdd,
    onUpdate,
  };
};
